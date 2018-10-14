import ContainerScreen from './ContainerScreen.js';

import SlotContainer from 'container/SlotContainer.js';
import OutputSlotContainer from 'container/OutputSlotContainer.js';
import DumpContainer from 'container/DumpContainer.js';

import * as Items from 'craftem/Items.js';

class SmeltingScreen extends ContainerScreen
{
  constructor(title, cursor, playerInventory)
  {
    super(title, cursor);

    this.addContainer(playerInventory, 10, 10);
    this.addContainer(new DumpContainer(), 600 - 42, 10);

    const furnaceX = 244;
    const inputContainer = new SlotContainer(3, 2);
    this.addContainer(inputContainer, furnaceX, 10);
    const burnContainer = new SlotContainer(3, 2);
    burnContainer.setFilter(burnableFilter);
    this.addContainer(burnContainer, furnaceX, 138);

    this.addContainer(new OutputSlotContainer(), furnaceX, 340 - 74);

    const smelteryX = 350;
    this.addContainer(new SlotContainer(3, 2), smelteryX, 10);
    this.addContainer(new SlotContainer(3, 2), smelteryX, 74);
    this.addContainer(new SlotContainer(3, 2), smelteryX, 138);
  }
}

function burnableFilter(itemStack)
{
  return itemStack.getItem() == Items.OAK_LOG;
}

export default SmeltingScreen;
