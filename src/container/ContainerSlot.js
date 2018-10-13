class ContainerSlot
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

export default ContainerSlot;
