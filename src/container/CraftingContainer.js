import Container from './Container.js';
import CraftingResultContainer from './CraftingResultContainer.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';

class CraftingContainer extends Container
{
  constructor(craftingSize, outputContainer)
  {
    super(craftingSize, craftingSize);

    this.outputContainer = outputContainer || new CraftingResultContainer(this);
  }

  //Override
  onContainerUpdate()
  {
    this.outputContainer.clear();
    const recipes = CraftingRegistry.getRecipes();
    for(let recipe of recipes)
    {
      const usedSlots = recipe.matches(this);
      if (usedSlots)
      {
        this.outputContainer.putItemStack(recipe.getResult(usedSlots), 0, true);
        break;
      }
    }
  }

  getResultContainer()
  {
    return this.outputContainer;
  }
}

export default CraftingContainer;
