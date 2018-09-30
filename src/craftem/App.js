import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';

import Container from 'craftem/container/Container.js';

import CraftingRegistry from 'craftem/crafting/CraftingRegistry.js';
import ShapedCraftingRecipe from 'craftem/crafting/ShapedCraftingRecipe.js';

import ItemRegistry from 'craftem/item/ItemRegistry.js';
import ItemStack from 'craftem/item/ItemStack.js';
import Item from 'craftem/item/Item.js';

export const TOUGH_FIBER = ItemRegistry.registerItem(new Item("toughFiber")).setMaxStackSize(16);
export const ROPE = ItemRegistry.registerItem(new Item("rope")).setSize(2, 1);
export const OIL_FLASK = ItemRegistry.registerItem(new Item("oilFlask")).setSize(1, 2).setMaxStackSize(4);
export const OAK_LOG = ItemRegistry.registerItem(new Item("oakLog")).setSize(3, 2);
export const OAK_WOOD = ItemRegistry.registerItem(new Item("oakWood")).setSize(1, 2).setMaxStackSize(4);

CraftingRegistry.registerRecipe(new ShapedCraftingRecipe("XXX", {X: TOUGH_FIBER}, ROPE));

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.equippedItem = new ItemStack(ItemRegistry.getItem("oilFlask"));
    this.cursorX = 0;
    this.cursorY = 0;

    this.container = new Container(7, 3);
    this.container.addItemStack(new ItemStack(ItemRegistry.getItem("toughFiber")));
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
        console.log("Testing: ", recipe);
        if (recipe.matches(this.crafting))
        {
          this.equippedItem = recipe.resolve(this.crafting);
          return false;
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
