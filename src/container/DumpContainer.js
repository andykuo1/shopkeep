import SlotContainer from './SlotContainer.js';

class DumpContainer extends SlotContainer
{
  constructor(name, maxItemWidth=Infinity, maxItemHeight=Infinity)
  {
    super(name, maxItemWidth, maxItemHeight);
  }

  tryDumpItemStack(itemStack)
  {
    //Just consume everything
    return null;
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
