import DialogueTraverser from './DialogueTraverser.js';
import TradeDialogueBuilder from './TradeDialogueBuilder.js';

import ItemStack from 'item/ItemStack.js';
import ItemRegistry from 'item/ItemRegistry.js';

class Actor
{
  constructor(name)
  {
    this.name = name;

    const db = new TradeDialogueBuilder();
    db.buyItem(new ItemStack(ItemRegistry.getItem("oilFlask")), 10);
    db.buyItem(new ItemStack(ItemRegistry.getItem("rope")), 2);
    db.buyItem(new ItemStack(ItemRegistry.getItem("oakLog")), 5);
    db.sellItem(new ItemStack(ItemRegistry.getItem("toughFiber")), 1);
    this.dialogueTraverser = new DialogueTraverser(db.toDialogue());
  }

  getDialogueTraverser()
  {
    return this.dialogueTraverser;
  }
}

export default Actor;
