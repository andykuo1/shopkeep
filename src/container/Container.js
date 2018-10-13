import ContainerSlot from './ContainerSlot.js';
import {guid} from 'util/MathHelper.js';

class Container
{
  constructor(width, height)
  {
    this._width = width;
    this._height = height;
    this._id = guid();

    this._slots = new Array(this._width * this._height);
    this._slotsOnly = new Set();

    this._capacity = Infinity;
  }

  setCapacity(capacity)
  {
    this._capacity = capacity;
    return this;
  }

  clear()
  {
    this._slotsOnly.clear();
    for(let i = 0, l = this._slots.length; i < l; ++i)
    {
      this._slots[i] = undefined;
    }

    this.onContainerUpdate();
  }

  onContainerUpdate() {}

  interact(cursor, slotIndex)
  {
    const itemStack = cursor.getEquippedItemStack();
    const slot = this._slots[slotIndex];

    //Pick it up...
    if (typeof slot == 'object')
    {
      if (cursor.isPrecisionMode())
      {
        if (this.removeItemStack(itemStack, slotIndex, Math.ceil(slot.getItemStack().getStackSize() / 2)))
        {
          return true;
        }
      }
      else
      {
        if (this.removeItemStack(itemStack, slotIndex))
        {
          return true;
        }
      }
    }

    if (!itemStack.isEmpty())
    {
      //Try putting down...
      return this.addItemStack(itemStack, slotIndex, true, true, false);
    }

    return false;
  }

  addItemStack(itemStack, slotIndex=-1, replace=false, merge=(slotIndex < 0), autofill=true)
  {
    //Ignore empty itemstacks
    if (itemStack.isEmpty()) return false;

    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();
    const containerWidth = this._width;
    const containerHeight = this._height;

    let result = false;

    if (slotIndex < 0)
    {
      //Prioritize merging first!
      if (!autofill) throw new Error("Must provide valid slot index; enable autofill for automatic placement");

      //If allowed...
      if (merge)
      {
        result |= this.tryMergeItemStack(itemStack);

        this.onContainerUpdate();

        if (itemStack.isEmpty()) return true;
      }
    }
    else
    {
      //Prioritize slotIndex first!
      result |= this.tryPlaceItemStack(itemStack, slotIndex, replace, merge);

      this.onContainerUpdate();

      if (itemStack.isEmpty()) return true;
    }

    //Try autofill the item if able to
    if (autofill)
    {
      result |= this.tryFillItemStack(itemStack, false);

      this.onContainerUpdate();

      if (itemStack.isEmpty()) return true;
    }

    return result;
  }

  tryMergeItemStack(itemStack)
  {
    let result = false;
    for(const slot of this._slotsOnly)
    {
      if (slot.getItemStack().join(itemStack, Infinity, this._capacity))
      {
        result = true;

        if (itemStack.isEmpty()) return true;
      }
    }
    return result;
  }

  tryPlaceItemStack(itemStack, slotIndex, replace=false, merge=true)
  {
    const containerWidth = this._width;

    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();

    //Make sure the itemstack's slot index would be within container bounds
    slotIndex = this.checkBounds(slotIndex, itemWidth, itemHeight);

    //Item dimensions exceeds bounds
    if (slotIndex < 0) return false;

    //Check collision with other slots
    let willReplace = undefined;
    let slot;
    for(let y = 0, h = itemHeight; y < h; ++y)
    {
      for(let x = 0, w = itemWidth; x < w; ++x)
      {
        slot = this._slots[slotIndex + (x + y * containerWidth)];

        //Found collision...
        if (typeof slot == 'object')
        {
          //Try merging both itemstacks...
          if (merge && slot.getItemStack().join(itemStack, Infinity, this._capacity))
          {
            return true;
          }
          //If have not yet attempted to replace anything...
          else if (replace)
          {
            if (willReplace == undefined)
            {
              willReplace = slot;
            }
            else if (willReplace === slot)
            {
              //Do nothing, it's fine.
            }
            else
            {
              //Just give up.
              return false;
            }

            //Skip the current item
            x += slot.getWidth() - 1;
          }
          //If not replacing or trying to replace more than 1 itemstack...
          else
          {
            //Just give up :(
            return false;
          }
        }
      }
    }

    //Should only get here if itemstack can be put down at slot index
    //(either by replacement or placement)
    if (typeof willReplace == 'object')
    {
      itemStack.swap(willReplace.getItemStack());
      willReplace.update(slotIndex);
      return true;
    }
    else
    {
      this.addSlot(slotIndex, itemStack);
      return true;
    }
  }

  tryFillItemStack(itemStack, merge=true)
  {
    const containerWidth = this._width;
    const containerHeight = this._height;

    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();

    let slot;
    for(let i = 0, l = this._slots.length; i < l; ++i)
    {
      //Don't check borders
      if ((i % containerWidth) + itemWidth > containerWidth) continue;
      if (Math.ceil(i / containerHeight) + itemHeight + 1 > containerHeight) continue;

      slot = this._slots[i];

      //Found collision...
      if (typeof slot == 'object')
      {
        //Try merging both itemstacks...
        if (merge && slot.getItemStack().join(itemStack, Infinity, this._capacity))
        {
          //If completely merged, we done it! Success!
          if (itemStack.isEmpty()) return true;

          //Otherwise, just continue...
        }
        else
        {
          //Skip the current item
          i += slot.getWidth() - 1;
        }
      }
      else if (this.isEmptySlot(i, itemWidth, itemHeight))
      {
        //Found empty space! Success!
        this.addSlot(i, itemStack);
        return true;
      }
      else
      {
        //Skip the non-empty space
        i += itemWidth - 1;
      }
    }

    return false;
  }

  removeItemStack(itemStack, slotIndex=-1, amount=Infinity)
  {
    if (slotIndex < 0)
    {
      for(const slot of this._slotsOnly)
      {
        const stackSize = itemStack.getStackSize();
        const slotStack = slot.getItemStack();
        if (itemStack.join(slotStack, amount))
        {
          if (slotStack.isEmpty()) this.removeSlot(slot.getRootIndex());
          amount -= itemStack.getStackSize() - stackSize;
          if (amount <= 0)
          {
            this.onContainerUpdate();

            return true;
          }
        }
      }
      return false;
    }
    else
    {
      const slot = this._slots[slotIndex];
      if (typeof slot == 'object')
      {
        const slotStack = slot.getItemStack();
        if (itemStack.join(slotStack, amount))
        {
          if (slotStack.isEmpty()) this.removeSlot(slotIndex);

          this.onContainerUpdate();

          return true;
        }
      }
      return false;
    }
  }

  getItemStack(slotIndex=0)
  {
    const slot = this._slots[slotIndex];
    return typeof slot == 'object' ? slot.getItemStack() : null;
  }

  addSlot(slotIndex, itemStack)
  {
    const result = new ContainerSlot(this, slotIndex);
    result.getItemStack().join(itemStack);
    result.update();
    this._slotsOnly.add(result);
    return result;
  }

  removeSlot(slotIndex)
  {
    const slot = this._slots[slotIndex];
    if (typeof slot == 'object')
    {
      slot.clear();
      this._slotsOnly.delete(slot);
    }
    return slot;
  }

  getSlot(slotIndex)
  {
    return this._slots[slotIndex];
  }

  checkBounds(slotIndex, width=1, height=1)
  {
    const containerWidth = this._width;
    const containerHeight = this._height;

    let x = slotIndex % containerWidth;
    let y = Math.floor(slotIndex / containerWidth);
    if (x < 0) x = 0;
    if (x + width > containerWidth)
    {
      x = containerWidth - width;
      if (x < 0) return -1;
    }
    if (y < 0) y = 0;
    if (y + height > containerHeight)
    {
      y = containerHeight - height;
      if (y < 0) return -1;
    }

    return x + y * containerWidth;
  }

  isEmptySlot(slotIndex, width=1, height=1)
  {
    const containerWidth = this._width;
    let slot;
    for(let y = 0; y < height; ++y)
    {
      for(let x = 0; x < width; ++x)
      {
        slot = this._slots[slotIndex + (x + y * containerWidth)];
        if (typeof slot == 'object')
        {
          return false;
        }
      }
    }
    return true;
  }

  getSlots()
  {
    return this._slotsOnly;
  }

  getSlotCapacity()
  {
    return this._capacity;
  }

  //Interactible container width
  getWidth()
  {
    return this._width;
  }

  //Interactible container height
  getHeight()
  {
    return this._height;
  }

  getID()
  {
    return this._id;
  }
}

export default Container;
