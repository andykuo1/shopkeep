import Container from './Container.js';
import SlotContainer from './SlotContainer.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';

class CraftingContainer extends Container
{
  constructor(name, craftingSize)
  {
    super(name, craftingSize, craftingSize);

    this.outputContainer = new CraftingOutputContainer(this);
  }

  //Override
  onCursorInteract(cursor, slotIndex)
  {
    super.onCursorInteract(cursor, slotIndex);

    this.outputContainer.onCraftingUpdate(this);
  }

  getOutputContainer()
  {
    return this.outputContainer;
  }
}

export default CraftingContainer;

export class CraftingOutputContainer extends SlotContainer
{
  constructor(inputContainer)
  {
    super(inputContainer.getName() + ".output");

    this.inputContainer = inputContainer;
  }

  //Override
  onCursorInteract(cursor, slotIndex)
  {
    const result = super.onCursorInteract(cursor, slotIndex);
    this.onCraftingUpdate(this.inputContainer);
    return result;
  }

  //Override
  onCursorExtract(cursor, slotIndex)
  {
    const recipes = CraftingRegistry.getRecipes();
    for(let recipe of recipes)
    {
      const result = recipe.applyRecipe(this.inputContainer);
      if (result)
      {
        cursor.setEquippedItemStack(result);
        return true;
      }
    }
    return false;
  }

  onCraftingUpdate(container)
  {
    this.clear();
    const recipes = CraftingRegistry.getRecipes();
    for(let recipe of recipes)
    {
      const usedSlots = recipe.matches(container);
      if (usedSlots)
      {
        this.putItemStack(recipe.getResult(usedSlots), 0, true);
        return;
      }
    }
  }
}
