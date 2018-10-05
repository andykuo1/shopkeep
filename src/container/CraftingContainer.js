import Container from './Container.js';
import SlotContainer from './SlotContainer.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';

class CraftingContainer extends Container
{
  constructor(craftingSize)
  {
    super(craftingSize, craftingSize);

    this.outputContainer = new CraftingOutputSlotContainer(this);
  }

  getOutputContainer()
  {
    return this.outputContainer;
  }
}

export class CraftingOutputSlotContainer extends SlotContainer
{
  constructor(inputContainer)
  {
    super();

    this.inputContainer = inputContainer;

    this.onInputContainerUpdate = this.onInputContainerUpdate.bind(this);

    this.inputContainer.on("update", this.onInputContainerUpdate);
  }

  onInputContainerUpdate(container)
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

  //Override
  onContainerSlot(slotIndex, equippedItemStack)
  {
    super.onContainerSlot(slotIndex, equippedItemStack);

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

export default CraftingContainer;
