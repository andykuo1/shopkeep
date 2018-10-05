import Eventable from 'util/Eventable.js';
import { guid } from 'util/MathHelper.js';

class Container
{
  constructor(width=1, height=1)
  {
    this.name = "";
    this._width = width;
    this._height = height;

    this._slots = new Array(width * height);
    this._slotCapacity = Infinity;
    this._editable = true;

    this.registerEvent("update");
    this.registerEvent("slot");

    this.id = guid();
  }

  setName(name)
  {
    this.name = name;
    return this;
  }

  setEditable(editable)
  {
    this._editable = editable;
    return this;
  }

  setSlotCapacity(value)
  {
    this._slotCapacity = value;
    return this;
  }

  onContainerUpdate()
  {
    this.emit("update", this);
  }

  onContainerSlot(slotIndex, equippedItemStack)
  {
    this.emit("slot", this, slotIndex, equippedItemStack);
  }

  clear()
  {
    for(let i = 0, length = this._slots.length; i < length; ++i)
    {
      this._slots[i] = undefined;
    }

    this.onContainerUpdate();
  }

  addItemStack(itemStack)
  {
    if (itemStack.getStackSize() <= 0) return null;

    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();
    const containerWidth = this._width;
    const containerHeight = this._height;

    let slot = undefined, slotItemStack;
    let index, flag;
    for(let y = 0, height = containerHeight - itemHeight + 1; y < height; ++y)
    {
      for(let x = 0, width = containerWidth - itemWidth + 1; x < width; ++x)
      {
        index = x + y * containerWidth;

        flag = true;
        for(let j = 0; j < itemHeight; ++j)
        {
          for(let i = 0; i < itemWidth; ++i)
          {
            slot = this._slots[index + (i + j * containerWidth)];

            if (typeof slot == 'object')
            {
              //If successfully merged the entire item stack...
              if (slot.getItemStack().merge(itemStack, this._slotCapacity))
              {
                this.onContainerUpdate();
                if (itemStack.isEmpty()) return null;
              }
              else
              {
                flag = false;
              }
            }
          }
        }

        //If found enough empty space...
        if (flag)
        {
          const result = itemStack.overflow(this._slotCapacity);
          this.addSlot(index, itemStack);
          return result;
        }
      }
    }

    return itemStack;
  }

  putItemStack(itemStack, slotIndex=0, replace=false)
  {
    if (itemStack.getStackSize() <= 0) return null;

    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();

    //Make sure is within capacity before allowing replace...
    if (itemStack.getStackSize() > this._slotCapacity)
    {
      replace = false;
    }

    const containerWidth = this._width;
    const containerHeight = this._height;
    let slotX = slotIndex % containerWidth;
    let slotY = Math.floor(slotIndex / containerWidth);

    //Check if already out of bounds
    if (slotX + itemWidth > containerWidth)
    {
      const prev = slotX;
      slotX = containerWidth - itemWidth;
      slotIndex -= prev - slotX;
      if (slotX < 0) return itemStack;
    }

    //Check if already out of bounds
    if (slotY + itemHeight > containerHeight)
    {
      const prev = slotY;
      slotY = containerHeight - itemHeight;
      slotIndex -= (prev - slotY) * containerWidth;
      if (slotY < 0) return itemStack;
    }

    //Check if empty or replaceable...
    let replacedSlot = undefined;
    let slot = undefined;
    let index;
    for(let y = 0; y < itemHeight; ++y)
    {
      for(let x = 0; x < itemWidth; ++x)
      {
        index = slotIndex + (x + y * containerWidth);
        slot = this._slots[index];
        if (typeof slot == 'object')
        {
          //If found similar item to merge...
          const slotStack = slot.getItemStack();
          if (slotStack.merge(itemStack, this._slotCapacity))
          {
            this.onContainerUpdate();
            return itemStack.isEmpty() ? null : itemStack;
          }
          //If cannot merge, try replace...
          else if (replace)
          {
            //If have not yet attempted to replace anything...
            if (replacedSlot == undefined)
            {
              replacedSlot = slot;
            }
            //If trying to replace more than 1 itemstack...
            else if (replacedSlot !== slot)
            {
              return itemStack;
            }
          }
          //If cannot merge nor replace, give up...
          else
          {
            return itemStack;
          }
        }
      }
    }

    //Can put into container...
    let result = null;
    //Is replacing...
    if (typeof replacedSlot == 'object')
    {
      result = replacedSlot.getItemStack();
      this.removeSlot(replacedSlot.getRootIndex());
    }
    this.addSlot(slotIndex, itemStack);
    return result;
  }

  removeItemStack(slotIndex, amount=Infinity)
  {
    if (slotIndex >= 0 && slotIndex < this.getSize() && amount > 0)
    {
      const slot = this._slots[slotIndex];
      if (typeof slot == 'object')
      {
        const itemStack = slot.getItemStack();

        //Try splitting...
        if (itemStack.getStackSize() > amount)
        {
          const result = itemStack.copy();
          result.setStackSize(amount);
          itemStack.setStackSize(itemStack.getStackSize() - amount);
          this.onContainerUpdate();
          return result;
        }

        //Remove itemstack from container...
        this.removeSlot(slotIndex);
        return itemStack;
      }
      else
      {
        return null;
      }
    }
    return null;
  }

  getItemStack(slotIndex)
  {
    if (slotIndex >= 0 && slotIndex < this._slots.length)
    {
      const slot = this._slots[slotIndex];
      return typeof slot == 'object' ? slot.getItemStack() : null;
    }
    return null;
  }

  hasItem(item)
  {
    let slot, slotItem;
    for(let i = 0, length = this._slots.length; i < length; ++i)
    {
      slot = this._slots[i];
      if (typeof slot == 'object')
      {
        slotItem = slot.getItemStack().getItem();
        if (slotItem === item)
        {
          return true;
        }
        else
        {
          //Skip over self-indices
          i += slotItem.getWidth();
        }
      }
    }
    return false;
  }

  addSlot(slotIndex, itemStack, fill=true)
  {
    if (slotIndex < 0 || slotIndex >= this._slots.length) throw new Error("Cannot add slot out of bounds");

    const slot = new ItemSlot(slotIndex, itemStack);

    if (fill)
    {
      const containerWidth = this._width;
      const itemWidth = itemStack.getItem().getWidth();
      const itemHeight = itemStack.getItem().getHeight();

      let index;
      for(let y = 0; y < itemHeight; ++y)
      {
        for(let x = 0; x < itemWidth; ++x)
        {
          index = slotIndex + (x + y * containerWidth);
          this._slots[index] = slot;
        }
      }
    }
    else
    {
      this._slots[slotIndex] = slot;
    }

    this.onContainerUpdate();

    return slot;
  }

  removeSlot(slotIndex, clear=true)
  {
    if (slotIndex < 0 || slotIndex >= this._slots.length) throw new Error("Cannot remove slot out of bounds");

    const slot = this._slots[slotIndex];
    if (typeof slot == 'object')
    {
      if (clear)
      {
        const containerWidth = this._width;
        const itemStack = slot.getItemStack();
        const rootIndex = slot.getRootIndex();

        const itemWidth = itemStack.getItem().getWidth();
        const itemHeight = itemStack.getItem().getHeight();

        let index;
        for(let y = 0; y < itemHeight; ++y)
        {
          for(let x = 0; x < itemWidth; ++x)
          {
            index = rootIndex + (x + y * containerWidth);
            this._slots[index] = undefined;
          }
        }
      }
      else
      {
        this._slots[slotIndex] = undefined;
      }

      this.onContainerUpdate();

      return slot;
    }

    return null;
  }

  getSlotsWithItem(item, minAmount=1, dst=[])
  {
    let slot, itemStack;
    for(let i = 0, length = this._slots.length; i < length; ++i)
    {
      slot = this._slots[i];
      if (typeof slot == 'object')
      {
        itemStack = slot.getItemStack();
        if (itemStack.getItem() === item && itemStack.getStackSize() >= minAmount)
        {
          dst.push(slot);
        }
      }
    }
    return dst;
  }

  getSlotByIndex(slotIndex)
  {
    if (slotIndex >= 0 && slotIndex < this.getSize())
    {
      return this._slots[slotIndex];
    }
    return null;
  }

  isSlotEmpty(slotIndex)
  {
    return typeof this._slots[slotIndex] != 'object';
  }

  getSlots()
  {
    return this._slots;
  }

  getName()
  {
    return this.name;
  }

  isEditable()
  {
    return this._editable;
  }

  getSlotCapacity()
  {
    return this._slotCapacity;
  }

  getWidth()
  {
    return this._width;
  }

  getHeight()
  {
    return this._height;
  }

  getSize()
  {
    return this._slots.length;
  }
}
Eventable.mixin(Container);

class ItemSlot
{
  constructor(rootIndex, itemStack)
  {
    this._index = rootIndex;
    this._itemStack = itemStack;
  }

  getRootIndex()
  {
    return this._index;
  }

  getItemStack()
  {
    return this._itemStack;
  }
}

export default Container;
