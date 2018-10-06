import ItemRegistry from 'item/ItemRegistry.js';
import Item from 'item/Item.js';

export const TOUGH_FIBER = ItemRegistry.registerItem(new Item("toughFiber", "orange")).setMaxStackSize(16).setTextureName("images/toughFiber.png");
export const OILED_FIBER = ItemRegistry.registerItem(new Item("oiledFiber", "red")).setMaxStackSize(16).setTextureName("images/oiledFiber.png");
export const ROPE = ItemRegistry.registerItem(new Item("rope")).setSize(2, 1).setTextureName("images/rope.png");
export const OIL_FLASK = ItemRegistry.registerItem(new Item("oilFlask", "red")).setSize(1, 2).setTextureName("images/oilFlask.png");
export const EMPTY_FLASK = ItemRegistry.registerItem(new Item("emptyFlask", "blue")).setSize(1, 2).setTextureName("images/emptyFlask.png");
export const TORCH = ItemRegistry.registerItem(new Item("torch", "yellow")).setSize(1, 2).setTextureName("images/torch.png");
export const OAK_LOG = ItemRegistry.registerItem(new Item("oakLog", "gray")).setSize(3, 2).setTextureName("images/oakLog.png");
export const OAK_WOOD = ItemRegistry.registerItem(new Item("oakWood", "slategray")).setSize(1, 2).setMaxStackSize(4).setTextureName("images/oakWood.png");
export const CLOTH_SHIRT = ItemRegistry.registerItem(new Item("clothShirt", "lightblue")).setSize(2, 3).setTextureName("images/clothShirt.png");
export const CLOTH_RAG = ItemRegistry.registerItem(new Item("clothRag", "lightgray")).setSize(2, 2).setMaxStackSize(8).setTextureName("images/clothRag.png");
export const OILED_CLOTH_RAG = ItemRegistry.registerItem(new Item("oiledClothRag", "red")).setSize(2, 2).setMaxStackSize(8).setTextureName("images/oiledClothRag.png");
