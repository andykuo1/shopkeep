import Container from './Container.js';

class SlotContainer extends Container
{
  constructor()
  {
    super(1, 1);

    //Override
    this._editable = false;
  }

  //Override
  clear()
  {
    this._slots[0] = undefined;
  }

  //Override
  addItemStack(itemStack)
  {
    return this.putItemStack(itemStack, 0, false);
  }

  //Override
  putItemStack(itemStack, slotIndex=0, replace=false)
  {
    if (itemStack.getStackSize() <= 0) return null;

    const slot = this._slots[0];
    if (typeof slot == 'object')
    {
      if (slot.getItemStack().merge(itemStack) && itemStack.isEmpty())
      {
        return null;
      }
      else if (replace)
      {
        const result = slot.getItemStack();
        this.removeSlot(0, false);
        this.addSlot(0, itemStack, false);
        return result;
      }
      else
      {
        return itemStack;
      }
    }
    else
    {
      this.addSlot(0, itemStack, false);
      return null;
    }
  }

  //Override
  removeItemStack(slotIndex, amount=Infinity)
  {
    return super.removeItemStack(0, amount);
  }

  //Override
  hasItem(item)
  {
    const slot = this._slots[0];
    return typeof slot == 'object' && slot.getItemStack().getItem() === item;
  }

  //Override
  addSlot(slotIndex, itemStack, fill=false)
  {
    if (fill) throw new Error("Cannot fill slot container");
    return super.addSlot(slotIndex, itemStack, false);
  }

  //Override
  removeSlot(slotIndex, clear=false)
  {
    if (clear) throw new Error("Cannot clear slot container");
    return super.removeSlot(slotIndex, false);
  }

  //Override
  getWidth()
  {
    const itemStack = this.getItemStack(0);
    return itemStack ? itemStack.getItem().getWidth() : super.getWidth();
  }

  //Override
  getHeight()
  {
    const itemStack = this.getItemStack(0);
    return itemStack ? itemStack.getItem().getHeight() : super.getHeight();
  }
}

export default SlotContainer;
