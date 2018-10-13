import Container from './Container.js';
import SlotContainer from './SlotContainer.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';

class CraftingContainer extends Container
{
  constructor(width, height)
  {
    super(width, height);

    this.outputContainer = new CraftingOutputContainer(this);
  }

  //Override
  interact(cursor, slotIndex)
  {
    super.interact(cursor, slotIndex);

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
    super();

    this.inputContainer = inputContainer;
  }

  //Override
  interact(cursor, slotIndex=0)
  {
    const itemStack = cursor.getEquippedItemStack();
    const slot = this._slots[0];

    //If holding something...
    if (itemStack)
    {
      //Picking up by merging...
      if (typeof slot == 'object')
      {
        const result = itemStack.merge(slot.getItemStack(), Infinity, false);
        if (result && result.isEmpty())
        {
          this.removeSlot(0);

          this.onCraft(cursor, 0);
        }
      }
    }
    //If holding nothing...
    else
    {
      //Pick it up...
      if (typeof slot == 'object')
      {
        const result = slot.getItemStack();
        cursor.setEquippedItemStack(result);
        this.removeSlot(0);

        this.onCraft(cursor, 0);
      }
    }
    this.onCraftingUpdate(this.inputContainer);
  }

  //Override
  onCraft(cursor, slotIndex)
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
      if (usedSlots && usedSlots.length > 0)
      {
        this.addItemStack(recipe.getResult(usedSlots), 0, true);
        return;
      }
    }
  }
}
