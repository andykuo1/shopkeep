import { guid } from 'util/MathHelper.js';

class ItemStack
{
  constructor(item=null, amount=(item == null ? 0 : 1))
  {
    this._id = guid();

    this._item = item;
    this._metadata = [];
    for(; amount > 0; --amount)
    {
      this._metadata.push({});
    }
  }

  setItem(item)
  {
    if (item == null) throw new Error("Cannot set item to null");
    this._item = item;
    return this;
  }

  clear()
  {
    this._item = null;
    this._metadata.length = 0;
  }

  join(itemStack, amount=Infinity, capacity=Infinity, allowPartial=true)
  {
    if (itemStack.isEmpty()) return false;
    if (!this.canStackWith(itemStack)) return false;

    const item = this._item || itemStack._item;
    const maxSize = Math.min(item.getMaxStackSize(), capacity);
    const stackSize = this._metadata.length;
    const otherSize = itemStack._metadata.length;
    amount = Math.min(maxSize - stackSize, amount);

    if (stackSize >= maxSize) return false;
    if (!allowPartial && otherSize < amount) return false;

    for(; amount > 0 && !itemStack.isEmpty(); --amount)
    {
      const itemData = itemStack._metadata.pop();
      this._metadata.push(itemData);
    }

    if (this._item == null) this._item = itemStack._item;
    if (itemStack.isEmpty()) itemStack.clear();
    return true;
  }

  swap(itemStack)
  {
    const item = this._item;
    const metadata = this._metadata;
    this._item = itemStack._item;
    this._metadata = itemStack._metadata;
    itemStack._item = item;
    itemStack._metadata = metadata;
  }

  pop(amount)
  {
    if (this.isEmpty()) return 0;

    const result = Math.min(this._metadata.length, amount);
    for(amount = result; amount > 0; --amount)
    {
      this._metadata.pop();
    }

    if (this._metadata.length <= 0) this.clear();
    return result;
  }

  canStackWith(itemStack)
  {
    const item = this._item;
    const otherItem = itemStack._item;

    if (item == null || otherItem == null) return true;
    if (item !== otherItem) return false;
    else return item.canStackWith(this, itemStack);
  }

  getMetadata()
  {
    return this._metadata.length > 0 ? this._metadata[0] : null;
  }

  getStackSize()
  {
    return this._metadata.length;
  }

  getItem()
  {
    return this._item;
  }

  //This is also true if item is null
  isEmpty()
  {
    return this._metadata.length <= 0;
  }

  getID()
  {
    return this._id;
  }
}

export default ItemStack;
