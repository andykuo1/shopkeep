import { guid } from 'util/MathHelper.js';

class ItemStack
{
  constructor(item, stackSize=1, metadata=0)
  {
    this._id = guid();
    this._item = item;
    this._stackSize = stackSize;
    this._metadata = metadata;
  }

  copy()
  {
    const result = new ItemStack(this._item, this._stackSize, this._metadata);
    return result;
  }

  merge(itemStack)
  {
    const item = this.getItem();
    const otherItem = itemStack.getItem();
    if (item !== otherItem) return false;

    const maxSize = item.getMaxStackSize();
    const stackSize = this._stackSize;
    if (stackSize < maxSize)
    {
      const otherSize = itemStack._stackSize;
      const newStackSize = stackSize + otherSize;
      const remaining = newStackSize - maxSize;

      //If can fit the entire stack...
      if (remaining <= 0)
      {
        this.setStackSize(newStackSize);
        itemStack.setStackSize(0);
        return true;
      }
      //Fit some of it at least...
      else
      {
        this.setStackSize(maxSize);
        itemStack.setStackSize(remaining);
        return true;
      }
    }
    else
    {
      //No more room to merge
      return false;
    }
  }

  setItem(item)
  {
    this._item = item;
  }

  getItem()
  {
    return this._item;
  }

  addStackSize(stackSize)
  {
    this._stackSize += stackSize;
  }

  setStackSize(stackSize)
  {
    this._stackSize = stackSize;
  }

  getStackSize()
  {
    return this._stackSize;
  }

  isEmpty()
  {
    return this._stackSize <= 0;
  }

  setMetadata(metadata)
  {
    this._metadata = metadata;
  }

  getMetadata()
  {
    return this._metadata;
  }

  getID()
  {
    return this._id;
  }
}

export default ItemStack;
