import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';
import CraftingRecipeComponent from 'craftem/components/CraftingRecipeComponent.js';
import EditableCraftingRecipeComponent from 'craftem/components/EditableCraftingRecipeComponent.js';

import Container from 'container/Container.js';
import SlotContainer from 'container/SlotContainer.js';
import CraftingContainer from 'container/CraftingContainer.js';
import DumpContainer from 'container/DumpContainer.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';

import * as Items from './Items.js';
import ItemRegistry from 'item/ItemRegistry.js';
import ItemStack from 'item/ItemStack.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.playerContainer = new Container("Inventory", 7, 16);
    for(let item of ItemRegistry.getItems())
    {
      this.playerContainer.addItemStack(new ItemStack(item, item.getMaxStackSize()));
    }
    this.craftingContainer = new CraftingContainer("Crafting", 5);
    this.trashContainer = new DumpContainer("Trash");

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
        <ContainerComponent ref={ref=>this.containers.set(this.trashContainer, ref)} className="player-trash" src={this.trashContainer}/>

        <CursorComponent containers={this.containers}/>
      </div>
      <div style={{outline: "1px dashed black", maxWidth: 600, maxHeight: 200, overflow: "scroll"}}>
        <ul className="crafting-entrylist">
        {
          CraftingRegistry.getRecipes().map((e, i) => {
            return <CraftingRecipeComponent key={i} src={e}/>;
          })
        }
        <EditableCraftingRecipeComponent/>
        </ul>
      </div>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
