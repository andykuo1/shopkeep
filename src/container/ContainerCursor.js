import SlotContainer from './SlotContainer.js';
import ItemStack from 'item/ItemStack.js';

class ContainerCursor
{
  constructor()
  {
    this._itemStack = new ItemStack();
    this._precision = false;
    this._control = false;

    this._screen = null;
  }

  setScreen(screen)
  {
    this._screen = screen;
  }

  getScreen()
  {
    return this._screen;
  }

  setPrecisionMode(enabled)
  {
    this._precision = enabled;
  }

  isPrecisionMode()
  {
    return this._precision;
  }

  setControlMode(enabled)
  {
    this._control = enabled;
  }

  isControlMode()
  {
    return this._control;
  }

  getEquippedItemStack()
  {
    return this._itemStack;
  }
}

export default ContainerCursor;
