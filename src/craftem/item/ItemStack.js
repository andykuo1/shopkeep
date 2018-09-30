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
