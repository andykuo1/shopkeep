import Container from './Container.js';
import { ContainerSlot } from './Container.js';

class SlotContainer extends Container
{
  constructor(name, maxItemWidth=Infinity, maxItemHeight=Infinity)
  {
    super(name, 1, 1);

    this._slot = new SlotContainerSlot(this);

    this._maxItemWidth = maxItemWidth;
    this._maxItemHeight = maxItemHeight;
  }

  //Override
  onCursorInteract(cursor, slotIndex=0)
  {
    //Ignores slotIndex...
    return super.onCursorInteract(cursor, 0);
  }

  //Overrride
  tryFillItemStack(itemStack, merge=true)
  {
    const item = itemStack.getItem();
    const itemWidth = item.getWidth();
    const itemHeight = item.getHeight();

    const slot = this._slots[0];

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
    }
    else if (this.isEmptySlot(0, itemWidth, itemHeight))
    {
      //Found empty space! Success!
      this.addSlot(0, itemStack);
      return null;
    }

    return itemStack;
  }

  //Override
  getItemStack(slotIndex=0)
  {
    //Ignores slotIndex...
    const slot = this._slots[0];
    return typeof slot == 'object' ? slot.getItemStack() : null;
  }

  //Override
  addSlot(slotIndex, itemStack)
  {
    //Ignores slotIndex...
    const result = this._slot;
    result.setItemStack(itemStack);
    this._slotsOnly.add(result);
    return result;
  }

  //Override
  getSlot(slotIndex=0)
  {
    //Ignores slotIndex...
    return this._slots[0];
  }

  //Override
  checkBounds(slotIndex=0, width=1, height=1)
  {
    //Ignores slotIndex...
    if (width > this._maxItemWidth) return -1;
    if (height > this._maxItemHeight) return -1;
    return 0;
  }

  //Override
  isEmptySlot(slotIndex=0, width=1, height=1)
  {
    //Ignores slotIndex...
    return typeof this._slots[0] == 'object';
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
  clear()
  {
    if (!this._itemStack) return;

    //Remove from the container's slots
    const container = this._parent;
    container._slots[0] = undefined;

    //Reset values
    this._itemStack = null;
    this._width = 0;
    this._height = 0;
  }

  //Override
  move(slotIndex, newItemStack=null)
  {
    const itemStack = this._itemStack;
    if (itemStack)
    {
      //Clear from previous position in the container's slots
      this.clear();
    }

    //Index will never change, making this the same as setItemStack()

    //Set to new position in the container's slots
    this.setItemStack(newItemStack || itemStack);
    return itemStack;
  }

  //Override
  setItemStack(itemStack)
  {
    const prev = this._itemStack;

    if (!itemStack)
    {
      this.clear();
      return prev;
    }

    const container = this._parent;
    const item = itemStack.getItem();

    //Add to the container's slots
    container._slots[0] = this;

    this._itemStack = itemStack;
    this._width = item.getWidth();
    this._height = item.getHeight();
    return prev;
  }
}
