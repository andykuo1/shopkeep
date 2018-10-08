import Item from './Item.js';

class ItemRepairable extends Item
{
  constructor(name)
  {
    super(name);

    this.maxDurability = 1;
  }

  setMaxDurability(durability)
  {
    this.maxDurability = durability;
    return this;
  }

  //Override
  onCraftResult(itemStack, itemSlot, craftingContainer, recipe, resultItem)
  {
    const metadata = itemStack.getMetadata() + 1;
    if (metadata >= this.maxDurability)
    {
      const newStackSize = itemStack.getStackSize() - 1;
      if (newStackSize <= 0)
      {
        craftingContainer.removeSlot(itemSlot.getRootIndex());
      }
      else
      {
        itemStack.setStackSize(newStackSize);
      }
    }
    else
    {
      itemStack.setMetadata(metadata);
    }
  }

  getMaxDurability()
  {
    return this.maxDurability;
  }
}

export default ItemRepairable;
