const RECIPES = [];

class CraftingRegistry
{
  static registerRecipe(craftingRecipe)
  {
    RECIPES.push(craftingRecipe);
    return craftingRecipe;
  }

  static unregisterRecipe(craftingRecipe)
  {
    RECIPES.splice(RECIPES.indexOf(craftingRecipe), 1);
    return craftingRecipe;
  }

  static getRecipes()
  {
    return RECIPES;
  }
}

export default CraftingRegistry;
