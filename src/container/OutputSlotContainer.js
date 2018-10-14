import SlotContainer from './SlotContainer.js';

class OutputSlotContainer extends SlotContainer
{
  constructor()
  {
    super(Infinity, Infinity);

    this._callback = null;
  }

  setCallback(callback)
  {
    this._callback = callback;
    return this;
  }

  setOutput(itemStack)
  {
    const slot = this._slots[0];
    if (typeof slot == 'object')
    {
      slot.clear();
      slot.getItemStack().join(itemStack);
      slot.update();
    }
    else
    {
      this.addSlot(0, itemStack);
    }

    this.onContainerUpdate();
  }

  //Override
  addItemStack(itemStack, slotIndex, replace, merge, autofill)
  {
    return false;
  }

  //Override
  removeItemStack(itemStack, slotIndex, amount)
  {
    const slot = this._slots[0];

    //Picking up...
    if (typeof slot == 'object')
    {
      const slotStack = slot.getItemStack();
      if (itemStack.join(slotStack, slotStack.getStackSize(), Infinity, false))
      {
        if (slotStack.isEmpty()) this.removeSlot(slot.getRootIndex());

        if (this._callback)
        {
          this._callback(this, itemStack);
        }

        this.onContainerUpdate();
        return true;
      }
    }
    return false;
  }
}

export default OutputSlotContainer;
