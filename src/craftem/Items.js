/**
* ITEMS
**/

import ItemRegistry from 'item/ItemRegistry.js';
import Item from 'item/Item.js';
import ItemTool from 'item/ItemTool.js';
import ItemFillable from 'item/ItemFillable.js';

export const TOUGH_FIBER = ItemRegistry.registerItem(new Item("toughFiber")).setMaxStackSize(64).setTextureName("images/toughFiber.png");
export const OILED_FIBER = ItemRegistry.registerItem(new Item("oiledFiber")).setMaxStackSize(64).setTextureName("images/oiledFiber.png");

export const ROPE = ItemRegistry.registerItem(new Item("rope")).setSize(2, 1).setMaxStackSize(8).setTextureName("images/rope.png");

export const EMPTY_FLASK = ItemRegistry.registerItem(new Item("emptyFlask")).setSize(1, 2).setMaxStackSize(8).setTextureName("images/emptyFlask.png");
export const OIL_FLASK = ItemRegistry.registerItem(new ItemFillable("oilFlask", EMPTY_FLASK).setMaxFillAmount(4)).setSize(1, 2).setTextureName("images/oilFlask.png");

export const TORCH = ItemRegistry.registerItem(new Item("torch")).setSize(1, 2).setMaxStackSize(4).setTextureName("images/torch.png");

export const OAK_LOG = ItemRegistry.registerItem(new Item("oakLog")).setSize(3, 2).setMaxStackSize(2).setTextureName("images/oakLog.png");
export const OAK_WOOD = ItemRegistry.registerItem(new Item("oakWood")).setSize(1, 2).setMaxStackSize(4).setTextureName("images/oakWood.png");
export const OAK_PLANK = ItemRegistry.registerItem(new Item("oakPlank")).setSize(2, 1).setMaxStackSize(4).setTextureName("images/oakPlank.png");

export const CLOTH_SHIRT = ItemRegistry.registerItem(new Item("clothShirt")).setSize(2, 3).setMaxStackSize(4).setTextureName("images/clothShirt.png");
export const CLOTH_RAG = ItemRegistry.registerItem(new Item("clothRag")).setSize(1, 2).setMaxStackSize(24).setTextureName("images/clothRag.png");
export const CLOTH = ItemRegistry.registerItem(new Item("cloth")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/cloth.png");
export const OILED_CLOTH_RAG = ItemRegistry.registerItem(new Item("oiledClothRag")).setSize(1, 2).setMaxStackSize(24).setTextureName("images/oiledClothRag.png");

export const SAW = ItemRegistry.registerItem(new ItemTool("saw")).setSize(1, 2).setTextureName("images/saw.png");

export const FEATHER = ItemRegistry.registerItem(new Item("feather")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/feather.png");
export const STICK = ItemRegistry.registerItem(new Item("stick")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/stick.png");
export const FLINT = ItemRegistry.registerItem(new Item("flint")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/flint.png");
export const ARROW = ItemRegistry.registerItem(new Item("arrow")).setSize(1, 2).setMaxStackSize(64).setTextureName("images/arrow.png");
export const LEATHER = ItemRegistry.registerItem(new Item("leather")).setSize(1, 2).setMaxStackSize(16).setTextureName("images/leather.png");
export const LEATHER_STRIP = ItemRegistry.registerItem(new Item("leatherStrip")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/leatherStrip.png");

export const GOLD_INGOT = ItemRegistry.registerItem(new Item("goldIngot")).setSize(2, 1).setMaxStackSize(16).setTextureName("images/goldIngot.png");
export const SILVER_INGOT = ItemRegistry.registerItem(new Item("silverIngot")).setSize(2, 1).setMaxStackSize(16).setTextureName("images/silverIngot.png");
export const COPPER_INGOT = ItemRegistry.registerItem(new Item("copperIngot")).setSize(2, 1).setMaxStackSize(16).setTextureName("images/copperIngot.png");
export const IRON_INGOT = ItemRegistry.registerItem(new Item("ironIngot")).setSize(2, 1).setMaxStackSize(16).setTextureName("images/ironIngot.png");
export const LEAD_INGOT = ItemRegistry.registerItem(new Item("leadIngot")).setSize(2, 1).setMaxStackSize(16).setTextureName("images/leadIngot.png");
export const TIN_INGOT = ItemRegistry.registerItem(new Item("tinIngot")).setSize(2, 1).setMaxStackSize(16).setTextureName("images/tinIngot.png");
export const BRONZE_INGOT = ItemRegistry.registerItem(new Item("bronzeIngot")).setSize(2, 1).setMaxStackSize(16).setTextureName("images/bronzeIngot.png");

export const GOLD_NUGGET = ItemRegistry.registerItem(new Item("goldNugget")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/goldNugget.png");
export const SILVER_NUGGET = ItemRegistry.registerItem(new Item("silverNugget")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/silverNugget.png");
export const COPPER_NUGGET = ItemRegistry.registerItem(new Item("copperNugget")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/copperNugget.png");
export const IRON_NUGGET = ItemRegistry.registerItem(new Item("ironNugget")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/ironNugget.png");
export const LEAD_NUGGET = ItemRegistry.registerItem(new Item("leadNugget")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/leadNugget.png");
export const TIN_NUGGET = ItemRegistry.registerItem(new Item("tinNugget")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/tinNugget.png");
export const BRONZE_NUGGET = ItemRegistry.registerItem(new Item("bronzeNugget")).setSize(1, 1).setMaxStackSize(64).setTextureName("images/bronzeNugget.png");

export const GOLD_ORE = ItemRegistry.registerItem(new Item("goldOre")).setSize(2, 2).setMaxStackSize(4).setTextureName("images/goldOre.png");
export const SILVER_ORE = ItemRegistry.registerItem(new Item("silverOre")).setSize(2, 2).setMaxStackSize(4).setTextureName("images/silverOre.png");
export const COPPER_ORE = ItemRegistry.registerItem(new Item("copperOre")).setSize(2, 2).setMaxStackSize(4).setTextureName("images/copperOre.png");
export const IRON_ORE = ItemRegistry.registerItem(new Item("ironOre")).setSize(2, 2).setMaxStackSize(4).setTextureName("images/ironOre.png");
export const LEAD_ORE = ItemRegistry.registerItem(new Item("leadOre")).setSize(2, 2).setMaxStackSize(4).setTextureName("images/leadOre.png");
export const TIN_ORE = ItemRegistry.registerItem(new Item("tinOre")).setSize(2, 2).setMaxStackSize(4).setTextureName("images/tinOre.png");

//Brass
//Calamine

/**
* CRAFTING RECIPES
**/

import CraftingRegistry from 'crafting/CraftingRegistry.js';
import CraftingRecipe from 'crafting/CraftingRecipe.js';

//NOTICE: Order Matters! Recipes are matched in the order registered. Therefore, earlier recipes will mask further recipes.
CraftingRegistry.registerRecipe(new CraftingRecipe("XXX", {X: TOUGH_FIBER}, ROPE));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y", {X: OILED_FIBER, Y: OAK_WOOD}, TORCH));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y,Z", {X: OILED_CLOTH_RAG, Y: TOUGH_FIBER, Z: OAK_WOOD}, TORCH));

CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: OAK_LOG, Y: SAW}, OAK_PLANK, 2));
CraftingRegistry.registerRecipe(new CraftingRecipe("X..,...", {X: OAK_LOG}, OAK_WOOD, 4));

CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: TOUGH_FIBER, Y: OIL_FLASK}, OILED_FIBER));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: CLOTH_SHIRT}, CLOTH_RAG, 3));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: CLOTH_RAG}, CLOTH, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: CLOTH_RAG, Y: OIL_FLASK}, OILED_CLOTH_RAG));

CraftingRegistry.registerRecipe(new CraftingRecipe("X.X.,Y**Y,.**.,X.X.", {X: OAK_PLANK, Y: OAK_WOOD}, EMPTY_FLASK));

CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: OAK_PLANK, Y: SAW}, STICK, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y,Z", {X: FLINT, Y: STICK, Z: FEATHER}, ARROW));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: LEATHER}, LEATHER_STRIP, 4));

CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: IRON_INGOT}, IRON_NUGGET, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("XXXX", {X: IRON_NUGGET}, IRON_INGOT));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: GOLD_INGOT}, GOLD_NUGGET, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("XXXX", {X: GOLD_NUGGET}, GOLD_INGOT));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: LEAD_INGOT}, LEAD_NUGGET, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("XXXX", {X: LEAD_NUGGET}, LEAD_INGOT));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: COPPER_INGOT}, COPPER_NUGGET, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("XXXX", {X: COPPER_NUGGET}, COPPER_INGOT));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: BRONZE_INGOT}, BRONZE_NUGGET, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("XXXX", {X: BRONZE_NUGGET}, BRONZE_INGOT));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: SILVER_INGOT}, SILVER_NUGGET, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("XXXX", {X: SILVER_NUGGET}, SILVER_INGOT));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: TIN_INGOT}, TIN_NUGGET, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("XXXX", {X: TIN_NUGGET}, TIN_INGOT));
