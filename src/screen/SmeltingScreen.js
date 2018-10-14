import ContainerScreen from './ContainerScreen.js';

import SlotContainer from 'container/SlotContainer.js';
import OutputSlotContainer from 'container/OutputSlotContainer.js';
import DumpContainer from 'container/DumpContainer.js';

class SmeltingScreen extends ContainerScreen
{
  constructor(title, cursor, playerInventory)
  {
    super(title, cursor);

    this.addContainer(playerInventory, 10, 10);
    this.addContainer(new DumpContainer(), 600 - 42, 10);

    const furnaceX = 244;
    this.addContainer(new SlotContainer(3, 2), furnaceX, 10);
    this.addContainer(new SlotContainer(3, 2), furnaceX, 138);
    this.addContainer(new OutputSlotContainer(), furnaceX, 340 - 74);

    const smelteryX = 350;
    this.addContainer(new SlotContainer(3, 2), smelteryX, 10);
    this.addContainer(new SlotContainer(3, 2), smelteryX, 74);
    this.addContainer(new SlotContainer(3, 2), smelteryX, 138);
  }
}

export default SmeltingScreen;
