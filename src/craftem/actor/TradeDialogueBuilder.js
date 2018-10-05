import DialogueBuilder from './DialogueBuilder.js';
import ItemStack from 'item/ItemStack.js';

class TradeDialogueBuilder
{
  constructor()
  {
    const db = new DialogueBuilder();

    const rootDialogue = db.create("Greetings.");
    const buyDialogue = db.create("I would like to buy:");
    const sellDialogue = db.create("Great! Here, I'll trade you:");

    rootDialogue.option(null, buyDialogue);
    buyDialogue.option("Accept", sellDialogue);
    buyDialogue.option("Decline");
    sellDialogue.option("Thank you")

    this.rootDialogue = rootDialogue;
    this.buyDialogue = buyDialogue;
    this.sellDialogue = sellDialogue;
  }

  buyItem(item, amount=1)
  {
    const result = new ItemStack(item, amount);
    this.buyDialogue.item(result, item.getBaseValue());
    return this;
  }

  buyItemStack(itemStack, amount=1)
  {
    const result = itemStack.copy();
    result.setStackSize(amount);
    this.buyDialogue.item(result, result.getItem().getBaseValue());
    return this;
  }

  sellItemStack(itemStack, amount=1)
  {
    const result = itemStack.copy();
    result.setStackSize(amount);
    this.sellDialogue.item(result, result.getItem().getBaseValue());
    return this;
  }

  toDialogue()
  {
    return this.rootDialogue.toDialogue();
  }
}

export default TradeDialogueBuilder;
