import ContainerScreen from './ContainerScreen.js';

import CraftingContainer from 'container/CraftingContainer.js';
import DumpContainer from 'container/DumpContainer.js';

class CraftingScreen extends ContainerScreen
{
  constructor(title, cursor, playerInventory)
  {
    super(title, cursor);

    this.addContainer(playerInventory, 10, 10);
    this.addContainer(new DumpContainer(), 600 - 42, 10);

    const crafting = new CraftingContainer(5, 5);
    this.addContainer(crafting, 244, 10);
    this.addContainer(crafting.getOutputContainer(), 414, 10);
  }
}

export default CraftingScreen;
