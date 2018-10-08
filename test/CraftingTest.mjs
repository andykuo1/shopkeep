import ItemRegistry from 'item/ItemRegistry.js';
import ItemStack from 'item/ItemStack.js';
import Item from 'item/Item.js';
import CraftingRegistry from 'crafting/CraftingRegistry.js';
import CraftingRecipe from 'crafting/CraftingRecipe.js';
import Container from 'container/Container.js';

console.log("Registering items...");
const ROCK = ItemRegistry.registerItem(new Item("rock")).setSize(1, 1);
const STICK = ItemRegistry.registerItem(new Item("stick")).setSize(1, 2);
const PLANK = ItemRegistry.registerItem(new Item("plank")).setSize(2, 1);
const WOOD = ItemRegistry.registerItem(new Item("wood")).setSize(2, 2);
const LOG = ItemRegistry.registerItem(new Item("log")).setSize(3, 2);
const ITEMS = {
  X: ROCK,
  Y: STICK,
  Z: PLANK,
  W: WOOD,
  A: LOG
}
console.log("Creating container...");
const CONTAINER = new Container("inv", 5, 5);

function testRecipe(container, pattern)
{
  const recipe = new CraftingRecipe(pattern, ITEMS, ROCK, 1);
  const result = recipe.matches(container);
  if (!result || result.length <= 0)
  {
    console.error("= Failed for pattern: " + pattern);
  }
  else
  {
    console.log("= Success!");
  }
}

console.log("Testing recipes...");
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(ROCK), 0);
  CONTAINER.addItemStack(new ItemStack(ROCK), 1);
  CONTAINER.addItemStack(new ItemStack(ROCK), 2);
  testRecipe(CONTAINER, "XXX");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(LOG), 0);
  testRecipe(CONTAINER, "A..,...");

  CONTAINER.addItemStack(new ItemStack(ROCK), 3);
  CONTAINER.addItemStack(new ItemStack(ROCK), 8);
  testRecipe(CONTAINER, "A..X,...X");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(LOG), 0);
  testRecipe(CONTAINER, "A..,...");

  CONTAINER.addItemStack(new ItemStack(STICK), 3);
  testRecipe(CONTAINER, "A..Y,....");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(LOG), 2);
  testRecipe(CONTAINER, "A..,...");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(LOG), 1);
  testRecipe(CONTAINER, "A..,...");

  CONTAINER.addItemStack(new ItemStack(STICK), 4);
  testRecipe(CONTAINER, "A..Y,....");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(PLANK), 0);
  CONTAINER.addItemStack(new ItemStack(PLANK), 2);
  testRecipe(CONTAINER, "Z.Z.");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(PLANK), 0);
  CONTAINER.addItemStack(new ItemStack(PLANK), 2);
  CONTAINER.addItemStack(new ItemStack(STICK), 5);
  CONTAINER.addItemStack(new ItemStack(STICK), 6);
  testRecipe(CONTAINER, "Z.Z.,YY,..");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(PLANK), 0);
  CONTAINER.addItemStack(new ItemStack(PLANK), 2);
  CONTAINER.addItemStack(new ItemStack(STICK), 5);
  CONTAINER.addItemStack(new ItemStack(STICK), 8);
  CONTAINER.addItemStack(new ItemStack(PLANK), 15);
  CONTAINER.addItemStack(new ItemStack(PLANK), 17);
  testRecipe(CONTAINER, "Z.Z.,Y**Y,.**.,Z.Z.");
}
{
  CONTAINER.clear();
  CONTAINER.addItemStack(new ItemStack(PLANK), 0);
  CONTAINER.addItemStack(new ItemStack(STICK), 5);
  testRecipe(CONTAINER, "Z&Y");
}
