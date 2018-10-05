import SlotContainer from './SlotContainer.js';
import CraftingRegistry from 'crafting/CraftingRegistry.js';

class CraftingResultContainer extends SlotContainer
{
  constructor(inputContainer)
  {
    super();

    this.inputContainer = inputContainer;
  }

  //Override
  onContainerSlot(slotIndex, equippedItemStack)
  {
    const slot = this._slots[0];
    if (typeof slot == 'object')
    {
      const recipes = CraftingRegistry.getRecipes();
      for(let recipe of recipes)
      {
        const result = recipe.applyRecipe(this.inputContainer);
        if (result)
        {
          return result;
        }
      }
    }
    return null;
  }
}

export default CraftingResultContainer;
