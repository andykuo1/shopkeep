import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';

import * as ItemRenderer from 'craftem/components/ItemRenderer.js';

import Container from 'container/Container.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';
import CraftingRecipe from 'crafting/CraftingRecipe.js';

import ItemRegistry from 'item/ItemRegistry.js';
import ItemStack from 'item/ItemStack.js';
import Item from 'item/Item.js';

export const TOUGH_FIBER = ItemRegistry.registerItem(new Item("toughFiber", "orange")).setMaxStackSize(16);
export const OILED_FIBER = ItemRegistry.registerItem(new Item("oiledFiber", "red")).setMaxStackSize(16);
export const ROPE = ItemRegistry.registerItem(new Item("rope")).setSize(2, 1);
export const OIL_FLASK = ItemRegistry.registerItem(new Item("oilFlask", "red")).setSize(1, 2);
export const TORCH = ItemRegistry.registerItem(new Item("torch", "yellow")).setSize(1, 2);
export const OAK_LOG = ItemRegistry.registerItem(new Item("oakLog", "gray")).setSize(3, 2);
export const OAK_WOOD = ItemRegistry.registerItem(new Item("oakWood", "slategray")).setSize(1, 2).setMaxStackSize(4);
export const SHIRT = ItemRegistry.registerItem(new Item("shirt", "lightblue")).setSize(2, 3);
export const CLOTH_RAG = ItemRegistry.registerItem(new Item("clothRag", "lightgray")).setSize(2, 2).setMaxStackSize(8);
export const OILED_CLOTH_RAG = ItemRegistry.registerItem(new Item("oiledClothRag", "red")).setSize(2, 2).setMaxStackSize(8);

CraftingRegistry.registerRecipe(new CraftingRecipe("XXX", {X: TOUGH_FIBER}, ROPE));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y", {X: OILED_FIBER, Y: OAK_WOOD}, TORCH));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y,Z", {X: OILED_CLOTH_RAG, Y: TOUGH_FIBER, Z: OAK_WOOD}, TORCH));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: OAK_LOG}, OAK_WOOD, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: TOUGH_FIBER, Y: OIL_FLASK}, OILED_FIBER));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: SHIRT}, CLOTH_RAG, 3));
CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: CLOTH_RAG, Y: OIL_FLASK}, OILED_CLOTH_RAG));

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.equippedItem = new ItemStack(ItemRegistry.getItem("oilFlask"));
    this.resultItem = null;
    this.cursorX = 0;
    this.cursorY = 0;

    this.container = new Container(7, 7);
    for(let item of ItemRegistry.getItems())
    {
      this.container.addItemStack(new ItemStack(item, item.getMaxStackSize()));
    }

    this.crafting = new Container(5, 5);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onSlotClick = this.onSlotClick.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount()
  {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount()
  {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove(e)
  {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
  }

  onSlotClick(container, slotIndex)
  {
    if (this.equippedItem)
    {
      this.equippedItem = container.putItemStack(this.equippedItem, slotIndex, true);
    }
    else
    {
      this.equippedItem = container.removeItemStack(slotIndex, 1);
    }

    this.resultItem = null;
    const recipes = CraftingRegistry.getRecipes();
    for(let recipe of recipes)
    {
      const usedSlots = recipe.matches(this.crafting);
      if (usedSlots)
      {
        this.resultItem = recipe.getResult(usedSlots);
        break;
      }
    }
  }

  onClick(e)
  {
    if (!this.equippedItem)
    {
      const recipes = CraftingRegistry.getRecipes();
      for(let recipe of recipes)
      {
        const result = recipe.applyRecipe(this.crafting);
        if (result)
        {
          this.equippedItem = result;
          break;
        }
      }

      this.resultItem = null;
    }
  }

  //Override
  render()
  {
    return <div className="app-container">
      <h1>Craftem</h1>
      <CursorComponent src={this.equippedItem} x={this.cursorX} y={this.cursorY}/>
      <ContainerComponent className="player-inventory" title="Inventory" src={this.container} onSlotClick={this.onSlotClick}/>
      <ContainerComponent className="player-crafting" title="Crafting" src={this.crafting} onSlotClick={this.onSlotClick}/>
      <svg className="itemresult" width="96" height="96" onClick={this.onClick}>
        {ItemRenderer.renderItemStack(this.resultItem)}
      </svg>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
