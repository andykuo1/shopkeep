import ItemStack from 'item/ItemStack.js';

class CraftingRecipe
{
  constructor(pattern, itemMap, outputItem, outputAmount=1, outputMetadata=0)
  {
    this.pattern = pattern.replace(/\s/g, '');
    this.itemMap = itemMap;

    this.outputItem = outputItem;
    this.outputAmount = outputAmount;
    this.outputMetadata = outputMetadata;
  }

  applyRecipe(container)
  {
    const usedSlots = this.matches(container);
    if (usedSlots)
    {
      const result = this.getResult(usedSlots);
      for(let slot of usedSlots)
      {
        const itemStack = slot.getItemStack();
        itemStack.getItem().onCraftResult(itemStack, slot, container, this, result);
      }
      return result;
    }
    else
    {
      return null;
    }
  }

  matches(container, pattern=this.pattern, dst=[])
  {
    const containerWidth = container.getWidth();
    const containerHeight = container.getHeight();

    for(let j = 0; j < containerHeight; ++j)
    {
      for(let i = 0; i < containerWidth; ++i)
      {
        const result = this.matchesPattern(container, pattern, this.itemMap, i, j, dst);
        if (result && result.length > 0)
        {
          for(const slot of result)
          {
            dst.push(slot);
          }
          return dst;
        }
      }
    }

    return null;
  }

  matchesPattern(container, pattern, itemMap, offsetX, offsetY, used=[])
  {
    const containerWidth = container.getWidth();
    const containerHeight = container.getHeight();

    const dst = [];
    const patternLength = pattern.length;
    let symbolIndex = 0;
    let symbol;
    let x = offsetX;
    let y = offsetY;
    while(symbolIndex < patternLength)
    {
      symbol = pattern[symbolIndex++];

      //console.log(x, y, symbol);

      switch(symbol)
      {
        case ',':
          //Go to the next line...
          ++y;
          x = offsetX - 1;
          break;
        case '&':
          //Try another pattern...
          const newPattern = pattern.substring(symbolIndex);
          const newUsed = used.concat(dst);
          for(let j = 0; j < containerHeight; ++j)
          {
            for(let i = 0; i < containerWidth; ++i)
            {
              const result = this.matchesPattern(container, newPattern, itemMap, i, j, newUsed);
              if (result && result.length > 0)
              {
                //Found another pattern!
                for(const slot of result)
                {
                  dst.push(slot);
                }
                return dst;
              }
            }
          }
          return null;
          break;
        case '*':
          //Ignore whatever this is and continue...
          break;
        case '.':
          //This is something already read...
          if (!dst.includes(container.getSlot(x + y * containerWidth)))
          {
            return null;
          }
          break;
        case '_':
          if (container.getSlot(x + y * containerWidth))
          {
            return null;
          }
          break;
        default:
          const slot = container.getSlot(x + y * containerWidth);
          if (slot)
          {
            const itemStack = slot.getItemStack();
            const item = itemMap[symbol];
            if (item === itemStack.getItem())
            {
              if (dst.includes(slot))
              {
                throw new Error("Invalid pattern spacing");
              }

              //Check if already used by OTHER crafting patterns
              let stackSize = itemStack.getStackSize();
              let index = used.indexOf(slot);
              while (index >= 0)
              {
                --stackSize;
                //Still enough of item left to take...
                if (stackSize > 0)
                {
                  index = used.indexOf(slot, index + 1);
                }
                //Not enough of stack size
                else
                {
                  return null;
                }
              }
              dst.push(slot);
            }
            else
            {
              return null;
            }
          }
          else
          {
            return null;
          }
      }

      ++x;
    }

    //Out of symbols...
    return dst;
  }

  getResult(usedSlots)
  {
    return new ItemStack(this.outputItem, this.outputAmount, this.outputMetadata);
  }

  static isPatternSymbol(symbol)
  {
    return symbol != '&' && symbol != '_' && symbol != '|' && symbol != '^' && symbol != ',' && symbol != '*' && symbol != '.';
  }
}

export default CraftingRecipe;
