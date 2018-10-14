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
  onContainerUpdate()
  {
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

    //Picking up...
    if (typeof slot == 'object')
    {
      const slotStack = slot.getItemStack();
      if (itemStack.join(slotStack, slotStack.getStackSize(), Infinity, false))
      {
        //ItemStack in the slot is assumed to have emptied
        this.removeSlot(0);

        this.onCraft(cursor, 0);

        this.onCraftingUpdate(this.inputContainer);
      }
    }
  }
  
  onCraft(cursor, slotIndex)
  {
    const recipes = CraftingRegistry.getRecipes();
    for(let recipe of recipes)
    {
      const result = recipe.applyRecipe(this.inputContainer);
      if (result)
      {
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
