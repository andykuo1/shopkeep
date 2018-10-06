import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';
import InputController from './InputController.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';
import DialogueComponent from 'craftem/components/DialogueComponent.js';

import Actor from 'craftem/actor/Actor.js';
import Market from 'craftem/market/Market.js';

import * as ItemRenderer from 'craftem/components/ItemRenderer.js';

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

    this.inputController = new InputController();

    this.equippedItem = new ItemStack(Items.OIL_FLASK);

    this.container = new Container(7, 6).setName("Inventory");
    for(let item of ItemRegistry.getItems())
    {
      this.container.addItemStack(new ItemStack(item, item.getMaxStackSize()));
    }
    this.craftingContainer = new CraftingContainer(5).setName("Crafting");

    this.displayContainers = [];
    this.displayContainers.push(new SlotContainer(true).setSlotCapacity(1));
    this.displayContainers.push(new SlotContainer(true).setSlotCapacity(1));
    this.displayContainers.push(new SlotContainer(true).setSlotCapacity(1));
    this.displayContainers.push(new SlotContainer(true).setSlotCapacity(1));
    this.displayContainers.push(new SlotContainer(true).setSlotCapacity(1));

    this.market = new Market(this.container);
  }

  componentWillMount()
  {
    this.inputController.initialize();
  }

  componentWillUnmount()
  {
    this.inputController.terminate();
  }

  //Override
  render()
  {
    return <div className="app-container">
      <h1>Craftem</h1>
      <button onClick={e => {
        if (!this.inputController.equippedItem)
        {
          const result = this.container.takeItem(Items.OAK_WOOD, 4);
          this.inputController.equippedItem = result;
        }
      }}>Take 4 woods</button>
      <div style={{outline: "1px solid black", maxWidth: 600, maxHeight: 400, overflow: "scroll"}}>
        <ContainerComponent ref={ref=>this.inputController.containers.set(this.container, ref)} className="player-inventory" src={this.container}/>
        <ContainerComponent ref={ref=>this.inputController.containers.set(this.craftingContainer, ref)} className="player-crafting" src={this.craftingContainer}/>
        <ContainerComponent ref={ref=>this.inputController.containers.set(this.craftingContainer.getOutputContainer(), ref)} className="player-result" src={this.craftingContainer.getOutputContainer()} hideGrid="true"/>
        <CursorComponent src={this.inputController.getEquippedItem()} x={this.inputController.posX} y={this.inputController.posY}/>
      </div>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
