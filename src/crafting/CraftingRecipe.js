import ItemStack from 'item/ItemStack.js';

class CraftingRecipe
{
  constructor(pattern, itemMap, outputItem, outputAmount=1, outputMetadata=0)
  {
    this.patterns = pattern.split('&');
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

  matches(container)
  {
    const containerWidth = container.getWidth();
    const containerHeight = container.getHeight();
    const result = [];
    const dst = [];

    for(let pattern of this.patterns)
    {
      let flag = false;
      for(let y = 0; y < containerHeight; ++y)
      {
        for(let x = 0; x < containerWidth; ++x)
        {
          if (matchesPattern(container, pattern, this.itemMap, x, y, 0, result, dst))
          {
            flag = true;
            break;
          }
        }

        if (flag) break;
      }

      if (flag)
      {
        while(dst.length > 0)
        {
          result.push(dst.pop());
        }
      }
      else
      {
        return null;
      }
    }

    return result;
  }

  getResult(usedSlots)
  {
    return new ItemStack(this.outputItem, this.outputAmount, this.outputMetadata);
  }
}

function matchesPattern(container, pattern, itemMap, offsetX=0, offsetY=0, patternOffset=0, used=[], dst=[])
{
  const containerWidth = container.getWidth();
  const containerHeight = container.getHeight();
  let nextSymbol = pattern.charAt(patternOffset);

  let slot, index;
  for(let y = offsetY; y < containerWidth; ++y)
  {
    for(let x = offsetX; x < containerWidth; ++x)
    {
      if (nextSymbol == ',')
      {
        //Skip to next row (but also update pattern index)
        x = containerWidth;
      }
      else if (nextSymbol != '*')
      {
        index = x + y * containerWidth;
        slot = container.getSlot(index);
        if (typeof slot == 'object')
        {
          if (nextSymbol == '.')
          {
            if (!dst.includes(slot))
            {
              if (dst.length > 0) dst.length = 0;
              return null;
            }
            else
            {
              //Success!
            }
          }
          else if (slot.getItemStack().getItem() !== itemMap[nextSymbol])
          {
            if (dst.length > 0) dst.length = 0;
            return null;
          }
          else if (used.includes(slot))
          {
            //TODO: not sure when this is relevant...
            //TODO: IF it is not, then add canCraft() to item.

            //Already used slot, must ensure enough amount
            let stackSize = slot.getItemStack().getStackSize();
            let slotIndex = 0;
            while((slotIndex = used.indexOf(slot, slotIndex)) >= 0)
            {
              if (--stackSize <= 0)
              {
                return null;
              }
            }

            //Success!
          }
          else if (dst.includes(slot))
          {
            //Invalid spacing in pattern - repeated symbol to self
            throw new Error("Invalid spacing in pattern");
          }
          else
          {
            //Success!
          }
        }
        else if (nextSymbol != '_')
        {
          if (dst.length > 0) dst.length = 0;
          return null;
        }
        else
        {
          //Success!
        }

        dst.push(slot);
      }
      else
      {
        //Success!
      }

      //Did not fail, therefore get next symbol
      ++patternOffset;
      if (patternOffset >= pattern.length) return dst;

      nextSymbol = pattern.charAt(patternOffset);
    }
  }

  return dst;
}

export default CraftingRecipe;
