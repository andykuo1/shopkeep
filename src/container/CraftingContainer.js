import Container from './Container.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';

class CraftingContainer extends Container
{
  constructor(width, height=width)
  {
    super(width, height);

    this._output = null;
  }

  setOutputContainer(container)
  {
    this._output = container;
    container.setCallback(this.onOutput.bind(this));
  }

  onOutput(container)
  {
    const recipes = CraftingRegistry.getRecipes();
    for(let recipe of recipes)
    {
      const result = recipe.applyRecipe(this);
      if (result != null)
      {
        this.onContainerUpdate();
        return true;
      }
    }
    return false;
  }

  //Override
  onContainerUpdate()
  {
    if (this._output)
    {
      const recipes = CraftingRegistry.getRecipes();
      for(let recipe of recipes)
      {
        const usedSlots = recipe.matches(this);
        if (usedSlots && usedSlots.length > 0)
        {
          this._output.setOutput(recipe.getResult(usedSlots));
          return;
        }
      }

      this._output.clear();
    }
  }

  getOutputContainer()
  {
    return this._output;
  }
}

export default CraftingContainer;
