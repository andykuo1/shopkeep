import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';

import Container from 'container/Container.js';
import SlotContainer from 'container/SlotContainer.js';
import CraftingContainer from 'container/CraftingContainer.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';
import CraftingRecipe from 'crafting/CraftingRecipe.js';

import * as Items from './Items.js';
import ItemRegistry from 'item/ItemRegistry.js';
import ItemStack from 'item/ItemStack.js';

//NOTICE: Order Matters! Recipes are matched in the order registered. Therefore, earlier recipes will mask further recipes.
CraftingRegistry.registerRecipe(new CraftingRecipe("XXX", {X: Items.TOUGH_FIBER}, Items.ROPE));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y", {X: Items.OILED_FIBER, Y: Items.OAK_WOOD}, Items.TORCH));
CraftingRegistry.registerRecipe(new CraftingRecipe("X,Y,Z", {X: Items.OILED_CLOTH_RAG, Y: Items.TOUGH_FIBER, Z: Items.OAK_WOOD}, Items.TORCH));

CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: Items.OAK_LOG, Y: Items.SAW}, Items.OAK_PLANK, 2));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: Items.OAK_LOG}, Items.OAK_WOOD, 4));

CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: Items.TOUGH_FIBER, Y: Items.OIL_FLASK}, Items.OILED_FIBER));
CraftingRegistry.registerRecipe(new CraftingRecipe("X", {X: Items.CLOTH_SHIRT}, Items.CLOTH_RAG, 3));
CraftingRegistry.registerRecipe(new CraftingRecipe("X&Y", {X: Items.CLOTH_RAG, Y: Items.OIL_FLASK}, Items.OILED_CLOTH_RAG));

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.playerContainer = new Container("Inventory", 7, 7);
    for(let item of ItemRegistry.getItems())
    {
      this.playerContainer.addItemStack(new ItemStack(item, item.getMaxStackSize()));
    }
    this.craftingContainer = new CraftingContainer("Crafting", 5);

    this.containers = new Map();
  }

  //Override
  render()
  {
    return <div className="app-container">
      <h1>Craftem</h1>
      <div style={{outline: "1px solid black", maxWidth: 600, maxHeight: 400, overflow: "scroll"}}>
        <ContainerComponent ref={ref=>this.containers.set(this.playerContainer, ref)} className="player-inventory" src={this.playerContainer}/>
        <ContainerComponent ref={ref=>this.containers.set(this.craftingContainer, ref)} className="player-crafting" src={this.craftingContainer}/>
        <ContainerComponent ref={ref=>this.containers.set(this.craftingContainer.getOutputContainer(), ref)} className="player-crafting-output" src={this.craftingContainer.getOutputContainer()} hideGrid="true" hideName="true"/>

        <CursorComponent containers={this.containers}/>
      </div>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
