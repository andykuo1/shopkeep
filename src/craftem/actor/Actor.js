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

    const items = Array.from(ItemRegistry.getItems());
    const db = new TradeDialogueBuilder(inputContainer);
    for(let i = Math.floor(Math.random() * 4); i >= 0; --i)
    {
      const item = items[Math.floor(Math.random() * items.length)];
      db.buyItem(item, 1 + Math.floor(Math.random() * 4));
    }
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
