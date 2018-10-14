import ContainerScreen from './ContainerScreen.js';

import CraftingContainer from 'container/CraftingContainer.js';
import OutputSlotContainer from 'container/OutputSlotContainer.js';
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

    const output = new OutputSlotContainer();
    this.addContainer(output, 414, 10);

    crafting.setOutputContainer(output);
  }
}

export default CraftingScreen;
