import Container from './Container.js';
import ContainerSlot from './ContainerSlot.js';

class SlotContainer extends Container
{
  constructor(maxItemWidth=Infinity, maxItemHeight=Infinity)
  {
    super(1, 1);

    this._maxItemWidth = maxItemWidth;
    this._maxItemHeight = maxItemHeight;
  }

  //Override
  interact(cursor, slotIndex)
  {
    return super.interact(cursor, 0);
  }

  //Override
  addItemStack(itemStack, slotIndex, replace=false, merge=(slotIndex < 0), autofill)
  {
    return super.addItemStack(itemStack, 0, replace, merge, false);
  }

  //Override
  removeItemStack(itemStack, slotIndex, amount=Infinity)
  {
    return super.removeItemStack(itemStack, 0, amount);
  }

  //Override
  getItemStack(slotIndex)
  {
    return super.getItemStack(0);
  }

  //Override
  addSlot(slotIndex, itemStack)
  {
    return super.addSlot(0, itemStack);
  }

  //Override
  removeSlot(slotIndex)
  {
    return super.removeSlot(0);
  }

  //Override
  createSlot(slotIndex)
  {
    return new SlotContainerSlot(this);
  }

  //Override
  getSlotByIndex(slotIndex)
  {
    return super.getSlotByIndex(0);
  }

  //Override
  isEmptySlot(slotIndex, width=1, height=1)
  {
    if (width >= this.maxItemWidth) return false;
    if (height >= this.maxItemHeight) return false;
    return super.isEmptySlot(0);
  }

  //Override
  checkBounds(slotIndex=0, width=1, height=1)
  {
    return 0;
  }

  //Override
  getWidth()
  {
    const slot = this._slots[0];
    if (typeof slot == 'object')
    {
      return slot.getWidth();
    }
    else
    {
      return super.getWidth();
    }
  }

  //Override
  getHeight()
  {
    const slot = this._slots[0];
    if (typeof slot == 'object')
    {
      return slot.getHeight();
    }
    else
    {
      return super.getHeight();
    }
  }
}

export default SlotContainer;

export class SlotContainerSlot extends ContainerSlot
{
  constructor(parent)
  {
    super(parent, 0);
  }

  //Override
  update(slotIndex)
  {
    //Index will never change, making this the same as update()
    return super.update(0);
  }
}
