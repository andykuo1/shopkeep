import { guid } from 'util/MathHelper.js';

class DialogueBuilder
{
  constructor(parent=null)
  {
    this.parent = parent;
  }

  create(initialMessage)
  {
    if (this.parent) throw new Error("Cannot create root dialogue from parent");
    const result = new Dialogue(initialMessage);
    return new DialogueBuilder(result);
  }

  next(message)
  {
    const result = new Dialogue(message);
    this.parent.options.push(new DialogueOption(null, result, null));
    return new DialogueBuilder(result);
  }

  item(itemStack, value)
  {
    const result = new ValuedItem(itemStack, value);
    this.parent.items.push(result);
    return this;
  }

  option(label, target=null, callback=null)
  {
    if (target instanceof DialogueBuilder) target = target.toDialogue();
    const result = new DialogueOption(label, target, callback);
    this.parent.options.push(result);
    return this;
  }

  toDialogue()
  {
    let maxDepth = 100;
    let result = this.parent;
    while(result.parent && --maxDepth > 0)
    {
      result = result.parent;
    }
    return result;
  }
}

class Dialogue
{
  constructor(message="")
  {
    this.message = message;
    this.items = [];
    this.options = [];

    this.id = guid();
  }

  getTotalItemValue()
  {
    let result = 0;
    for(let item of this.items)
    {
      result += item.itemStack.getStackSize() * item.value;
    }
    return result;
  }

  hasItems()
  {
    return this.items.length > 0;
  }
}

class DialogueOption
{
  constructor(label, target=null, callback=null)
  {
    this.label = label;
    this.target = target;
    this.callback = callback;

    this.id = guid();
  }

  isExitOption()
  {
    return this.target == null && this.callback == null;
  }
}

class ValuedItem
{
  constructor(itemStack, value)
  {
    this.itemStack = itemStack;
    this.value = value;

    this.id = this.itemStack.getID();
  }
}

export default DialogueBuilder;
