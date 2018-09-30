class Container
{
  constructor(width=1, height=1)
  {
    this._width = width;
    this._height = height;

    this._slots = new Array(width * height);
  }

  clear()
  {
    for(let i = 0, length = this._slots.length; i < length; ++i)
    {
      this._slots[i] = undefined;
    }
  }

  addItemStack(itemStack, slotIndex=0, replace=false)//, autofill=false)
  {
    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();

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
    let replacedSlot = null;
    let slot;
    let index;
    for(let i = 0; i < itemWidth; ++i)
    {
      for(let j = 0; j < itemHeight; ++j)
      {
        index = slotIndex + (i + j * containerWidth);
        slot = this._slots[index];
        if (typeof slot == 'object')
        {
          //If found similar item to merge...
          let slotStack = slot.itemStack;
          if (slotStack.getItem() === item)
          {
            const maxSize = item.getMaxStackSize();
            const slotSize = slotStack.getStackSize();
            if (slotSize < maxSize)
            {
              const stackSize = itemStack.getStackSize();
              const newStackSize = slotSize + stackSize;
              const remaining = newStackSize - maxSize;

              //If can fit the entire stack...
              if (remaining <= 0)
              {
                slotStack.setStackSize(newStackSize);
                itemStack.setStackSize(0);
                return null;
              }
              else
              {
                slotStack.setStackSize(maxSize);
                itemStack.setStackSize(remaining);
                return itemStack;
              }
            }
          }

          if (replace)
          {
            //If have not yet attempted to replace anything...
            if (replacedSlot == null)
            {
              replacedSlot = slot;
            }
            //If trying to replace more than 1 itemstack...
            else if (replacedSlot !== slot)
            {
              return itemStack;
            }
          }
          else
          {
            return itemStack;
          }
        }
      }
    }

    //Can put into container...
    const result = replacedSlot ? this.removeItemStack(replacedSlot.index) : null;
    slot = {itemStack: itemStack, index: slotIndex};

    for(let i = 0; i < itemWidth; ++i)
    {
      for(let j = 0; j < itemHeight; ++j)
      {
        index = slotIndex + (i + j * containerWidth);
        this._slots[index] = slot;
      }
    }

    return result;
  }

  removeItemStack(slotIndex, amount=Infinity)
  {
    if (slotIndex >= 0 && slotIndex < this.getSize() && amount > 0)
    {
      const slot = this._slots[slotIndex];
      if (slot)
      {
        const itemStack = slot.itemStack;

        //Try splitting...
        if (itemStack.getStackSize() > amount)
        {
          const result = itemStack.copy();
          result.setStackSize(amount);
          itemStack.setStackSize(itemStack.getStackSize() - amount);
          return result;
        }

        //Remove itemstack from container...
        const item = itemStack.getItem();
        const itemWidth = item.getWidth();
        const itemHeight = item.getHeight();
        const rootIndex = slot.index;
        const containerWidth = this._width;

        let index;
        for(let i = 0; i < itemWidth; ++i)
        {
          for(let j = 0; j < itemHeight; ++j)
          {
            index = rootIndex + (i + j * containerWidth);
            this._slots[index] = undefined;
          }
        }

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
    if (slotIndex >= 0 && slotIndex < this.getSize())
    {
      const slot = this._slots[slotIndex];
      return slot ? slot.itemStack : null;
    }
    return null;
  }

  getFirstSlotByItem(item, fromIndex=0)
  {
    let slot;
    for(let i = fromIndex, length = this._slots.length; i < length; ++i)
    {
      slot = this._slots[i];
      if (slot && slot.itemStack.getItem() === item)
      {
        return slot;
      }
    }
    return null;
  }

  getSlotByIndex(slotIndex)
  {
    if (slotIndex >= 0 && slotIndex < this.getSize())
    {
      return this._slots[slotIndex];
    }
    return null;
  }

  getSlots()
  {
    return this._slots;
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
    return this._width * this._height;
  }
}

export default Container;
