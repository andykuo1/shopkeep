import { guid } from 'util/MathHelper.js';

class ItemStack
{
  constructor(item, stackSize=1, metadata=0)
  {
    this._id = guid();

    //The item in the stack
    this._item = item;

    //Number of items in the stack
    this._stackSize = stackSize;

    //Used by other item logic, ie durability
    this._metadata = metadata;

    //Used by other item logic, ie color
    //this._variance = 0;
    //4 bits for Hue
    //4 bits for saturation
    //4 bits for Lightness
    //4 bits for quality

    //The quality of the items in the stack
    //this._quality = 0;

    //16-bits
    //0000 0000 0000 0000
  }

  setStackSize(stackSize)
  {
    this._stackSize = stackSize;
    return this;
  }

  setMetadata(metadata)
  {
    this._metadata = metadata;
    return this;
  }

  setItem(item)
  {
    this._item = item;
    return this;
  }

  setQuality(quality)
  {
    this._quality = quality;
    return this;
  }

  join(itemStack, capacity=Infinity, allowPartial=true)
  {
    const item = this.getItem();
    const otherItem = itemStack.getItem();

    if (item !== otherItem) return false;
    if (!item.canStackWith(this, itemStack)) return false;

    const maxSize = Math.min(item.getMaxStackSize(), capacity);
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
      else if (allowPartial)
      {
        this.setStackSize(maxSize);
        itemStack.setStackSize(remaining);
        return true;
      }
      //Could not fit partial...
      else
      {
        return false;
      }
    }
    else
    {
      //No more room to join...
      return false;
    }
  }


  copy()
  {
    const result = new ItemStack(this._item, this._stackSize, this._metadata);
    return result;
  }

  merge(itemStack, capacity=Infinity, allowPartial=true)
  {
    const item = this.getItem();
    const otherItem = itemStack.getItem();
    if (item !== otherItem) return false;
    if (this._metadata !== itemStack._metadata) return false;

    const maxSize = Math.min(item.getMaxStackSize(), capacity);
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
      else if (allowPartial)
      {
        this.setStackSize(maxSize);
        itemStack.setStackSize(remaining);
        return true;
      }
      //Could not fit partial...
      else
      {
        return false;
      }
    }
    else
    {
      //No more room to merge
      return false;
    }
  }

  overflow(capacity)
  {
    const diffSize = this._stackSize - capacity;

    //Try splitting...
    if (diffSize > 0)
    {
      const result = this.copy();
      result.setStackSize(diffSize);
      this.setStackSize(capacity);
      return result;
    }

    return null;
  }

  split(amount)
  {
    const newStackSize = this._stackSize - amount;
    if (newStackSize > 0)
    {
      const result = this.copy();
      result._stackSize = amount;
      this._stackSize = newStackSize;
      return result;
    }
    else
    {
      const result = this.copy();
      this._stackSize = 0;
      return result;
    }
  }

  getItem()
  {
    return this._item;
  }

  addStackSize(stackSize)
  {
    this._stackSize += stackSize;
  }

  getStackSize()
  {
    return this._stackSize;
  }

  isEmpty()
  {
    return this._stackSize <= 0;
  }

  getMetadata()
  {
    return this._metadata;
  }

  getQuality()
  {
    return this._quality;
  }

  getID()
  {
    return this._id;
  }
}

export default ItemStack;
