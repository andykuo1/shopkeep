class Container
{
  constructor(name, width, height)
  {
    this._name = name;
    this._width = width;
    this._height = height;

    this._slots = new Array(this._width * this._height);
    this._slotsOnly = new Set();

    this._canPlace = true;
    this._canExtract = true;

    this._capacity = Infinity;
  }

  setEditable(canPlace, canExtract=canPlace)
  {
    this._canPlace = canPlace;
    this._canExtract = canExtract;
    return this;
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
  }

  onCursorInteract(cursor, slotIndex)
  {
    const itemStack = cursor.getEquippedItemStack();

    //Is holding something...
    if (itemStack)
    {
      if (!this._canPlace) return false;

      return this.onCursorPlace(cursor, slotIndex, itemStack);
    }
    //Is holding nothing...
    else
    {
      if (!this._canExtract) return false;
      const slot = this._slots[slotIndex];

      if (typeof slot == 'object')
      {
        return this.onCursorExtract(cursor, slotIndex);
      }
    }

    return false;
  }

  onCursorPlace(cursor, slotIndex, itemStack)
  {
    const slot = this._slots[slotIndex];

    //Interacting with some slot...
    if (typeof slot == 'object')
    {
      //Try merging/replacing?
      const prevStackSize = itemStack.getStackSize();
      const result = this.addItemStack(itemStack, slotIndex, true, true, false);
      if (result)
      {
        cursor.setEquippedItemStack(result);
      }
      else
      {
        cursor.removeEquippedItemStack();
      }

      return result != itemStack || prevStackSize != result.getStackSize();
    }
    else
    {
      //Put it down.
      const prevStackSize = itemStack.getStackSize();
      const result = this.addItemStack(itemStack, slotIndex, false, true, true);
      if (result)
      {
        cursor.setEquippedItemStack(result);
      }
      else
      {
        cursor.removeEquippedItemStack();
      }

      return result != itemStack || prevStackSize != result.getStackSize();
    }
  }

  onCursorExtract(cursor, slotIndex)
  {
    //Pick it up.
    let result = this.getItemStack(slotIndex);

    if (cursor.isPrecisionMode())
    {
      const newStackSize = result.getStackSize() - 1;
      if (newStackSize <= 0)
      {
        this.removeSlot(slotIndex);
      }
      else
      {
        result.setStackSize(newStackSize);

        result = result.copy();
        result.setStackSize(1);
      }
    }
    else
    {
      this.removeSlot(slotIndex);
    }

    cursor.setEquippedItemStack(result);
    return true;
  }

  addItemStack(itemStack, slotIndex=-1, replace=false, merge=false, autofill=true)
  {
    //Ignore empty itemstacks
    if (itemStack.isEmpty()) return null;

    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();
    const containerWidth = this._width;
    const containerHeight = this._height;

    if (slotIndex < 0)
    {
      //Prioritize merging first!
      if (!autofill) throw new Error("Must provide valid slot index; enable autofill for automatic placement");

      //If allowed...
      if (merge)
      {
        itemStack = this.tryMergeItemStack(itemStack);
        if (!itemStack) return null;
      }
    }
    else
    {
      //Prioritize slotIndex first!
      itemStack = this.tryPlaceItemStack(itemStack, slotIndex, replace, merge);
      if (!itemStack) return null;
    }

    //Try autofill the item if able to
    if (autofill)
    {
      itemStack = this.tryFillItemStack(itemStack, false);
      if (!itemStack) return null;
    }

    return itemStack;
  }

  tryMergeItemStack(itemStack)
  {
    for(const slot of this._slotsOnly)
    {
      if (slot.getItemStack().merge(itemStack, this._capacity) && itemStack.isEmpty())
      {
        return null;
      }
    }
    return itemStack;
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
    if (slotIndex < 0) return itemStack;

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
          if (merge && slot.getItemStack().merge(itemStack, this._capacity))
          {
            return itemStack.isEmpty() ? null : itemStack;
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
              return itemStack;
            }

            //Skip the current item
            x += slot.getWidth() - 1;
          }
          //If not replacing or trying to replace more than 1 itemstack...
          else
          {
            //Just give up :(
            return itemStack;
          }
        }
      }
    }

    //Should only get here if itemstack can be put down at slot index
    //(either by replacement or placement)
    let result = null;
    if (typeof willReplace == 'object')
    {
      result = willReplace.move(slotIndex, itemStack);
    }
    else
    {
      this.addSlot(slotIndex, itemStack);
    }
    return result;
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
      if ((i / containerHeight) + itemHeight > containerHeight) continue;

      slot = this._slots[i];

      //Found collision...
      if (typeof slot == 'object')
      {
        //Try merging both itemstacks...
        if (merge && slot.getItemStack().merge(itemStack, this._capacity))
        {
          //If completely merged, we done it! Success!
          if (itemStack.isEmpty()) return null;

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
        return null;
      }
      else
      {
        //Skip the non-empty space
        i += itemWidth - 1;
      }
    }

    return itemStack;
  }

  putItemStack(itemStack, slotIndex=0, replace=true)
  {
    if (slotIndex < 0) throw new Error("Cannot autofill itemstack for putItemStack(); use addItemStack() instead");
    return this.addItemStack(itemStack, slotIndex, replace, false);
  }

  getItemStack(slotIndex=0)
  {
    const slot = this._slots[slotIndex];
    return typeof slot == 'object' ? slot.getItemStack() : null;
  }

  addSlot(slotIndex, itemStack)
  {
    const result = new ContainerSlot(this, slotIndex);
    result.setItemStack(itemStack);
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

  isEditable()
  {
    return this._canPlace && this._canExtract;
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

  getName()
  {
    return this._name;
  }
}

export default Container;

export class ContainerSlot
{
  constructor(parent, index)
  {
    this._parent = parent;
    this._index = index;

    this._itemStack = null;
    this._width = 0;
    this._height = 0;
  }

  clear()
  {
    if (!this._itemStack) return;

    //Remove from the container's slots
    const container = this._parent;
    const containerWidth = container._width;
    const item = this._itemStack.getItem();
    const w = this._width;
    const h = this._height;
    const i = this._index;

    for(let y = 0; y < h; ++y)
    {
      for(let x = 0; x < w; ++x)
      {
        container._slots[i + (x + y * containerWidth)] = undefined;
      }
    }

    //Reset values
    this._itemStack = null;
    this._width = 0;
    this._height = 0;
  }

  //Assumes slot index is within bounds of the container
  //Returns the itemstack before move/replace
  move(slotIndex, newItemStack=null)
  {
    const itemStack = this._itemStack;
    if (itemStack)
    {
      //Clear from previous position in the container's slots
      this.clear();
    }

    //Move to new index
    this._index = slotIndex;

    //Set to new position in the container's slots
    this.setItemStack(newItemStack || itemStack);
    return itemStack;
  }

  setItemStack(itemStack)
  {
    const prev = this._itemStack;

    if (!itemStack)
    {
      this.clear();
      return prev;
    }

    const container = this._parent;
    const containerWidth = container._width;
    const i = this._index;

    const item = itemStack.getItem();
    const w = item.getWidth();
    const h = item.getHeight();

    const mw = Math.max(w, this._width);
    const mh = Math.max(h, this._height);

    //Add to the container's slots
    let result;
    for(let y = 0; y < mh; ++y)
    {
      for(let x = 0; x < mw; ++x)
      {
        result = x < w && y < h ? this : undefined;
        container._slots[i + (x + y * containerWidth)] = result;
      }
    }

    this._itemStack = itemStack;
    this._width = w;
    this._height = h;
    return prev;
  }

  getItemStack()
  {
    return this._itemStack;
  }

  getRootIndex()
  {
    return this._index;
  }

  getWidth()
  {
    return this._width;
  }

  getHeight()
  {
    return this._height;
  }

  getContainer()
  {
    return this._parent;
  }
}
