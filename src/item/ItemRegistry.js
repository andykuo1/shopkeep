const ITEMS = new Map();

class ItemRegistry
{
  static registerItem(item)
  {
    ITEMS.set(item.getName(), item);
    return item;
  }

  static unregisterItem(itemName)
  {
    const result = ITEMS.get(itemName);
    ITEMS.delete(itemName);
    return result;
  }

  static getItems()
  {
    return ITEMS.values();
  }

  static getItem(itemName)
  {
    if (!ITEMS.has(itemName)) throw new Error("Cannot find item with name \'" + itemName + "\'");
    return ITEMS.get(itemName);
  }
}

export default ItemRegistry;
