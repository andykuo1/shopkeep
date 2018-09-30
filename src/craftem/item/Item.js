class Item
{
  constructor(name)
  {
    this._name = name;

    this._width = 1;
    this._height = 1;
  }

  setSize(width=1, height=1)
  {
    if (width <= 0) throw new Error("item width must be a positive integer");
    if (height <= 0) throw new Error("item height must be a positive integer");

    this._width = width;
    this._height = height;
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
