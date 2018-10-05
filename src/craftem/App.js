import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';
import InputController from './InputController.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';
import DialogueComponent from 'craftem/components/DialogueComponent.js';

import Actor from 'craftem/actor/Actor.js';

import * as ItemRenderer from 'craftem/components/ItemRenderer.js';

import Container from 'container/Container.js';
import SlotContainer from 'container/SlotContainer.js';
import CraftingContainer from 'container/CraftingContainer.js';

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

    this.inputController = new InputController();

    this.equippedItem = new ItemStack(ItemRegistry.getItem("oilFlask"));

    this.container = new Container(7, 7).setName("Inventory");
    for(let item of ItemRegistry.getItems())
    {
      this.container.addItemStack(new ItemStack(item, item.getMaxStackSize()));
    }
    this.craftingContainer = new CraftingContainer(5).setName("Crafting");

    this.displayContainers = [];
    this.displayContainers.push(new SlotContainer(true));
    this.displayContainers.push(new SlotContainer(true));
    this.displayContainers.push(new SlotContainer(true));
    this.displayContainers.push(new SlotContainer(true));
    this.displayContainers.push(new SlotContainer(true));

    this.actor = new Actor("Bob");
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
      {
        !this.actor.getDialogueTraverser().isFinished() &&
        <DialogueComponent src={this.actor.getDialogueTraverser().getCurrentDialogue()} onOption={this.actor.getDialogueTraverser().onDialogueOption}/>
      }
      <div>
      {
        this.displayContainers.map(e => {
          return <ContainerComponent key={e.id} ref={ref=>this.inputController.containers.set(e, ref)} className="player-display" src={e} hideGrid="true"/>
        })
      }
      </div>
      <ContainerComponent ref={ref=>this.inputController.containers.set(this.container, ref)} className="player-inventory" src={this.container}/>
      <ContainerComponent ref={ref=>this.inputController.containers.set(this.craftingContainer, ref)} className="player-crafting" src={this.craftingContainer}/>
      <ContainerComponent ref={ref=>this.inputController.containers.set(this.craftingContainer.getResultContainer(), ref)} className="player-result" src={this.craftingContainer.getResultContainer()} hideGrid="true"/>
      <CursorComponent src={this.inputController.getEquippedItem()} x={this.inputController.posX} y={this.inputController.posY}/>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
