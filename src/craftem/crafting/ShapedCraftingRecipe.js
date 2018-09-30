import CraftingRecipe from './CraftingRecipe.js';

import ItemStack from 'craftem/item/ItemStack.js';

class ShapedCraftingRecipe extends CraftingRecipe
{
  constructor(pattern, mapping, resultItem, amount=1, metadata=0)
  {
    super();

    this.pattern = pattern;
    this.mapping = mapping;

    this.item = resultItem;
    this.amount = amount;
    this.metadata = metadata;
  }

  matches(container)
  {
    const pattern = this.pattern;
    const mapping = this.mapping;
    const containerWidth = container.getWidth();
    const containerHeight = container.getHeight();
    const rows = pattern.split("|");
    let row = rows.pop().split("");
    let nextItem = mapping[row[0]];
    let nextX = 0;

    let index;
    let ignoreWhitespace = true;
    let itemStack;
    for(let y = 0; y < containerHeight; ++y)
    {
      for(let x = nextX; x < containerWidth; ++x)
      {
        index = x + y * containerWidth;
        itemStack = container.getItemStack(index);
        if (!itemStack)
        {
          if (ignoreWhitespace) continue;
          else return false;
        }
        else if (itemStack.getItem() === nextItem)
        {
          row.shift();
          nextItem = mapping[row[0]];

          if (ignoreWhitespace)
          {
            nextX = x;
            ignoreWhitespace = false;
          }

          if (row.length <= 0) break;
        }
        else
        {
          return false;
        }
      }

      if (row.length <= 0)
      {
        //Get the next row to read...
        if (rows.length > 0)
        {
          row = rows.pop().split("");
        }
        //No more rows to read...
        else
        {
          break;
        }
      }
    }

    return rows.length <= 0 && row.length <= 0;
  }

  resolve(container)
  {
    const pattern = this.pattern;
    const mapping = this.mapping;
    const containerWidth = container.getWidth();
    const containerHeight = container.getHeight();
    const rows = pattern.split("|");
    let row = rows.pop().split("");
    let nextItem = mapping[row[0]];
    let nextX = 0;

    let index;
    let ignoreWhitespace = true;
    let itemStack;
    for(let y = 0; y < containerHeight; ++y)
    {
      for(let x = nextX; x < containerWidth; ++x)
      {
        index = x + y * containerWidth;
        itemStack = container.getItemStack(index);
        if (!itemStack)
        {
          if (ignoreWhitespace) continue;
          else return false;
        }
        else if (itemStack.getItem() === nextItem)
        {
          //Actually delete it!
          container.removeItemStack(index);

          row.shift();
          nextItem = mapping[row[0]];

          if (ignoreWhitespace)
          {
            nextX = x;
            ignoreWhitespace = false;
          }

          if (row.length <= 0) break;
        }
        else
        {
          return false;
        }
      }

      if (row.length <= 0)
      {
        //Get the next row to read...
        if (rows.length > 0)
        {
          row = rows.pop().split("");
        }
        //No more rows to read...
        else
        {
          break;
        }
      }
    }

    return this.getResult(container);
  }

  getResult(container)
  {
    return new ItemStack(this.item, this.amount, this.metadata);
  }
}

export default ShapedCraftingRecipe;
