import ContainerScreen from './ContainerScreen.js';

import DumpContainer from 'container/DumpContainer.js';

class BrewingScreen extends ContainerScreen
{
  constructor(title, cursor, playerInventory)
  {
    super(title, cursor);

    this.addContainer(playerInventory, 10, 10);
    this.addContainer(new DumpContainer(), 600 - 42, 10);

    this.addContainer(new DumpContainer(), 244, 10);
  }
}

export default BrewingScreen;
