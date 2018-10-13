import SlotContainer from './SlotContainer.js';
import ItemStack from 'item/ItemStack.js';

class ContainerCursor
{
  constructor()
  {
    this._itemStack = new ItemStack();
    this._precision = false;
  }

  setPrecisionMode(enabled)
  {
    this._precision = enabled;
  }

  isPrecisionMode()
  {
    return this._precision;
  }

  getEquippedItemStack()
  {
    return this._itemStack;
  }
}

export default ContainerCursor;
