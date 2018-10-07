class ContainerCursor
{
  constructor()
  {
    this._itemStack = null;
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
