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
    return ITEMS;
  }

  static getItem(itemName)
  {
    return ITEMS.get(itemName);
  }
}

export default ItemRegistry;
