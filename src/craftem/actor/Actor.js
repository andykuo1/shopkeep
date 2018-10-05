import DialogueTraverser from './DialogueTraverser.js';
import TradeDialogueBuilder from './TradeDialogueBuilder.js';

import ItemStack from 'item/ItemStack.js';
import ItemRegistry from 'item/ItemRegistry.js';

import { guid } from 'util/MathHelper.js';

class Actor
{
  constructor(name, inputContainer)
  {
    this.name = name;

    const db = new TradeDialogueBuilder(inputContainer);
    db.buyItem(ItemRegistry.getItem("oilFlask"), 10);
    db.buyItem(ItemRegistry.getItem("rope"), 2);
    db.buyItem(ItemRegistry.getItem("oakLog"), 5);
    db.sellItemStack(new ItemStack(ItemRegistry.getItem("toughFiber")), 14);
    this.dialogueTraverser = new DialogueTraverser(db.toDialogue());

    this.id = guid();
  }

  getDialogueTraverser()
  {
    return this.dialogueTraverser;
  }
}

export default Actor;
