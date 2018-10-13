import Item from './Item.js';
import ItemStack from './ItemStack.js';

class ItemFillable extends Item
{
  constructor(name, containerItem)
  {
    super(name);

    this.containerItem = containerItem;
    this.maxFillAmount = 1;
  }

  setMaxFillAmount(amount)
  {
    this.maxFillAmount = amount;
    return this;
  }

  //Override
  onCraftResult(itemStack, itemSlot, craftingContainer, recipe, resultItem)
  {
    super.onCraftResult(itemStack, itemSlot, craftingContainer, recipe, resultItem);
    /*
    const metadata = itemStack.getMetadata();
    if (metadata.fillAmount >= this.maxFillAmount)
    {
      itemStack.pop(1);
      if (itemSlot.isEmpty())
      {
        craftingContainer.removeSlot(itemSlot.getRootIndex());
      }

      craftingContainer.addItemStack(new ItemStack(this.containerItem), itemSlot.getRootIndex(), false);
    }
    else
    {
      metadata.fillAmount = (metadata.fillAmount || 0) + 1;
    }
    */
  }

  getMaxFillAmount()
  {
    return this.maxFillAmount;
  }

  getContainerItem()
  {
    return this.containerItem;
  }
}

export default ItemFillable;
