import Item from './Item.js';
import ItemStack from './ItemStack.js';

class ItemFillable extends Item
{
  constructor(name, containerItem)
  {
    super(name);

    this.containerItem = containerItem;
    this.maxFillAmount = 1;

    //Override
    this._maxStackSize = 1;
  }

  setMaxFillAmount(amount)
  {
    this.maxFillAmount = amount;
    return this;
  }

  //Override
  onCraftResult(itemStack, itemSlot, craftingContainer, recipe, resultItem)
  {
    const metadata = itemStack.getMetadata() + 1;
    if (metadata >= this.maxFillAmount)
    {
      craftingContainer.removeItemStack(itemSlot.getRootIndex(), 1);
      craftingContainer.putItemStack(new ItemStack(this.containerItem), itemSlot.getRootIndex(), false, true);
    }
    else
    {
      itemStack.setMetadata(metadata);
    }
  }

  getContainerItem()
  {
    return this.containerItem;
  }
}

export default ItemFillable;
