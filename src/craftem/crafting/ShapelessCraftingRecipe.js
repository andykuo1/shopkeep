import CraftingRecipe from './CraftingRecipe.js';

import ItemStack from 'craftem/item/ItemStack.js';

class ShapelessCraftingRecipe extends CraftingRecipe
{
  constructor(inputItems, resultItem, amount=1, metadata=0)
  {
    super();

    this.inputs = inputItems;

    this.item = resultItem;
    this.amount = amount;
    this.metadata = metadata;
  }

  //Override
  matches(container)
  {
    const containerWidth = container.getWidth();
    const containerHeight = container.getHeight();

    const inputs = this.inputs.slice();

    let index;
    let itemStack;
    let item;
    for(let y = 0; y < containerHeight; ++y)
    {
      for(let x = 0; x < containerWidth; ++x)
      {
        index = x + y * containerWidth;
        itemStack = container.getItemStack(index);
        if (itemStack)
        {
          item = itemStack.getItem();
          if (inputs.includes(item))
          {
            inputs.splice(inputs.indexOf(item), 1);

            if (inputs.length <= 0) break;
          }
        }
      }
    }

    return inputs.length <= 0;
  }

  //Override
  resolve(container)
  {
    const containerWidth = container.getWidth();
    const containerHeight = container.getHeight();

    const inputs = this.inputs.slice();

    let index;
    let itemStack;
    let item;
    for(let y = 0; y < containerHeight; ++y)
    {
      for(let x = 0; x < containerWidth; ++x)
      {
        index = x + y * containerWidth;
        itemStack = container.getItemStack(index);
        if (itemStack)
        {
          item = itemStack.getItem();
          if (inputs.includes(item))
          {
            //Actually delete it!
            container.removeItemStack(index, 1);

            inputs.splice(inputs.indexOf(item), 1);

            if (inputs.length <= 0) break;
          }
        }
      }
    }

    return this.getResult(container);
  }

  //Override
  getResult(container)
  {
    return new ItemStack(this.item, this.amount, this.metadata);
  }
}

export default ShapelessCraftingRecipe;
