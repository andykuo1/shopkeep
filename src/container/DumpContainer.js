import SlotContainer from './SlotContainer.js';

class DumpContainer extends SlotContainer
{
  constructor(maxItemWidth=Infinity, maxItemHeight=Infinity)
  {
    super(maxItemWidth, maxItemHeight);
  }

  tryDumpItemStack(itemStack)
  {
    if (itemStack.isEmpty()) return false;

    //Just consume everything
    itemStack.clear();
    return true;
  }

  //Override
  addItemStack(itemStack, slotIndex=0, replace=false, merge=false, autofill=true)
  {
    //Ignore empty itemstacks
    if (itemStack.isEmpty()) return null;

    //Ignoring slotIndex, replace, merge, and autofill
    const result = this.tryDumpItemStack(itemStack);
    if (!result) return null;
    return itemStack;
  }
}

export default DumpContainer;
