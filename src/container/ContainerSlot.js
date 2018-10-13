import ItemStack from 'item/ItemStack.js';

class ContainerSlot
{
  constructor(parent, index)
  {
    this._parent = parent;
    this._index = index;

    this._itemStack = new ItemStack();
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
    this._itemStack.clear();
    this._width = 0;
    this._height = 0;
  }

  //Assumes slot index is within bounds of the container
  update(slotIndex=-1)
  {
    if (this._itemStack.isEmpty())
    {
      this.clear();
      return;
    }

    const container = this._parent;
    const containerWidth = container._width;
    let i = this._index;

    const item = this._itemStack.getItem();
    const w = item.getWidth();
    const h = item.getHeight();

    //Move to a different index
    if (slotIndex > 0 && slotIndex != this._index)
    {
      let x, y, width, height;
      for(y = 0, height = this._height; y < height; ++y)
      {
        for(x = 0, width = this._width; x < width; ++x)
        {
          container._slots[i + (x + y * containerWidth)] = undefined;
        }
      }

      i = slotIndex;
      for(y = 0, height = h; y < height; ++y)
      {
        for(x = 0, width = w; x < width; ++x)
        {
          container._slots[i + (x + y * containerWidth)] = this;
        }
      }

      this._index = slotIndex;
    }
    //Expand or shrink existing space
    else
    {
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
    }

    this._width = w;
    this._height = h;
  }

  isEmpty()
  {
    return this._itemStack.isEmpty();
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
