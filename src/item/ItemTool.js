import Item from './Item.js';

class ItemTool extends Item
{
  constructor(name)
  {
    super(name);

    //Override
    this._maxStackSize = 1;
  }

  //Override
  onCraftResult(itemStack, itemSlot, craftingContainer, recipe, resultItem)
  {
    //Do nothing.
  }
}

export default ItemTool;
