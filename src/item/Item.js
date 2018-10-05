class Item
{
  constructor(name, color="dodgerblue")
  {
    this._name = name;

    //HACK: this is temp
    this.color = color;

    this._width = 1;
    this._height = 1;

    this._maxStackSize = 1;

    this._baseValue = 1;
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
