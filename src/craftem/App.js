import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';

import Container from 'craftem/container/Container.js';

import CraftingRegistry from 'craftem/crafting/CraftingRegistry.js';
import CraftingRecipe from 'craftem/crafting/CraftingRecipe.js';

import ItemRegistry from 'craftem/item/ItemRegistry.js';
import ItemStack from 'craftem/item/ItemStack.js';
import Item from 'craftem/item/Item.js';

export const TOUGH_FIBER = ItemRegistry.registerItem(new Item("toughFiber", "orange")).setMaxStackSize(16);
export const OILED_FIBER = ItemRegistry.registerItem(new Item("oiledFiber", "red")).setMaxStackSize(16);
export const ROPE = ItemRegistry.registerItem(new Item("rope")).setSize(2, 1);
export const OIL_FLASK = ItemRegistry.registerItem(new Item("oilFlask", "red")).setSize(1, 2);
export const TORCH = ItemRegistry.registerItem(new Item("torch", "yellow")).setSize(1, 2);
export const OAK_LOG = ItemRegistry.registerItem(new Item("oakLog", "gray")).setSize(3, 2);
export const OAK_WOOD = ItemRegistry.registerItem(new Item("oakWood", "slategray")).setSize(1, 2).setMaxStackSize(4);

CraftingRegistry.registerRecipe(new CraftingRecipe("XXX", {X: TOUGH_FIBER}, ROPE));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y", {X: OILED_FIBER, Y: OAK_WOOD}, TORCH));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: OAK_LOG}, OAK_WOOD, 4));
CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: TOUGH_FIBER, Y: OIL_FLASK}, OILED_FIBER));

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.equippedItem = new ItemStack(ItemRegistry.getItem("oilFlask"));
    this.cursorX = 0;
    this.cursorY = 0;

    this.container = new Container(7, 3);
    this.container.addItemStack(new ItemStack(ItemRegistry.getItem("oiledFiber")));
    this.container.addItemStack(new ItemStack(ItemRegistry.getItem("oakWood")), 1);
    this.container.addItemStack(new ItemStack(ItemRegistry.getItem("oakLog")), 2);
    this.container.addItemStack(new ItemStack(ItemRegistry.getItem("oakWood")), 5);
    this.container.addItemStack(new ItemStack(ItemRegistry.getItem("toughFiber")), 6);
    this.container.addItemStack(new ItemStack(ItemRegistry.getItem("toughFiber")), 7);

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
      this.equippedItem = container.addItemStack(this.equippedItem, slotIndex, true);
    }
    else
    {
      this.equippedItem = container.removeItemStack(slotIndex);
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
    }
  }

  //Override
  render()
  {
    return <div className="app-container">
      <h1>Craftem</h1>
      <CursorComponent src={this.equippedItem} x={this.cursorX} y={this.cursorY}/>
      <ContainerComponent src={this.container} onSlotClick={this.onSlotClick}/>
      <ContainerComponent src={this.crafting} onSlotClick={this.onSlotClick}/>
      <button onClick={this.onClick}>CRAFT!</button>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
