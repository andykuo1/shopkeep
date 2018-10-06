import ItemRegistry from 'item/ItemRegistry.js';
import Item from 'item/Item.js';
import ItemTool from 'item/ItemTool.js';

export const TOUGH_FIBER = ItemRegistry.registerItem(new Item("toughFiber")).setMaxStackSize(64).setTextureName("images/toughFiber.png");
export const OILED_FIBER = ItemRegistry.registerItem(new Item("oiledFiber")).setMaxStackSize(64).setTextureName("images/oiledFiber.png");
export const ROPE = ItemRegistry.registerItem(new Item("rope")).setSize(2, 1).setMaxStackSize(8).setTextureName("images/rope.png");
export const OIL_FLASK = ItemRegistry.registerItem(new Item("oilFlask")).setSize(1, 2).setMaxStackSize(1).setTextureName("images/oilFlask.png");
export const EMPTY_FLASK = ItemRegistry.registerItem(new Item("emptyFlask")).setSize(1, 2).setMaxStackSize(8).setTextureName("images/emptyFlask.png");
export const TORCH = ItemRegistry.registerItem(new Item("torch")).setSize(1, 2).setMaxStackSize(4).setTextureName("images/torch.png");
export const OAK_LOG = ItemRegistry.registerItem(new Item("oakLog")).setSize(3, 2).setMaxStackSize(2).setTextureName("images/oakLog.png");
export const OAK_WOOD = ItemRegistry.registerItem(new Item("oakWood")).setSize(1, 2).setMaxStackSize(4).setTextureName("images/oakWood.png");
export const OAK_PLANK = ItemRegistry.registerItem(new Item("oakPlank")).setSize(2, 1).setMaxStackSize(4).setTextureName("images/oakPlank.png");
export const CLOTH_SHIRT = ItemRegistry.registerItem(new Item("clothShirt")).setSize(2, 3).setMaxStackSize(1).setTextureName("images/clothShirt.png");
export const CLOTH_RAG = ItemRegistry.registerItem(new Item("clothRag")).setSize(2, 2).setMaxStackSize(8).setTextureName("images/clothRag.png");
export const OILED_CLOTH_RAG = ItemRegistry.registerItem(new Item("oiledClothRag")).setSize(2, 2).setMaxStackSize(8).setTextureName("images/oiledClothRag.png");

export const SAW = ItemRegistry.registerItem(new ItemTool("saw")).setSize(1, 2).setTextureName("images/saw.png");
