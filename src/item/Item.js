class Item
{
  constructor(name)
  {
    this._name = name;
    this._texture = "images/300.png";
    this._color = 0x00000000;

    this._width = 1;
    this._height = 1;

    this._maxStackSize = 64;

    this._baseValue = 1;
  }

  setTextureName(textureName)
  {
    this._texture = textureName;
    return this;
  }

  setBaseColor(color)
  {
    this._color = color;
    return this;
  }

  setBaseValue(value)
  {
    if (value < 0) throw new Error("item base value must be a non-negative integer");

    this._baseValue = value;
    return this;
  }

  setSize(width=1, height=1)
  {
    if (width <= 0) throw new Error("item width must be a positive integer");
    if (height <= 0) throw new Error("item height must be a positive integer");

    this._width = width;
    this._height = height;
    return this;
  }

  setMaxStackSize(stackSize)
  {
    this._maxStackSize = stackSize;
    return this;
  }

  canStackWith(itemStack, otherItemStack)
  {
    return true;
  }

  onCraftResult(itemStack, itemSlot, craftingContainer, recipe, resultItem)
  {
    itemStack.pop(1);
  }
  
  getWidth()
  {
    return this._width;
  }

  getHeight()
  {
    return this._height;
  }

  getMaxStackSize()
  {
    return this._maxStackSize;
  }

  getBaseValue()
  {
    return this._baseValue;
  }

  getBaseColor()
  {
    return this._color;
  }

  getTextureName()
  {
    return this._texture;
  }

  getName()
  {
    return this._name;
  }

  getUnlocalizedName()
  {
    return "item." + this._name;
  }
}

export default Item;
