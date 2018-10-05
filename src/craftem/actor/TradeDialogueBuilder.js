import DialogueBuilder from './DialogueBuilder.js';

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

  buyItem(itemStack, value)
  {
    this.buyDialogue.item(itemStack, value);
    return this;
  }

  sellItem(itemStack, value)
  {
    this.sellDialogue.item(itemStack, value);
    return this;
  }

  toDialogue()
  {
    return this.rootDialogue.toDialogue();
  }
}

export default TradeDialogueBuilder;
