class ContainerCursor
{
  constructor()
  {
    this._itemStack = null;
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

  setEquippedItemStack(itemStack)
  {
    this._itemStack = itemStack;
  }

  removeEquippedItemStack()
  {
    const prev = this._itemStack;
    this._itemStack = null;
    return prev;
  }

  getEquippedItemStack()
  {
    return this._itemStack;
  }
}

export default ContainerCursor;
