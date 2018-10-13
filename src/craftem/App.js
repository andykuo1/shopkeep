import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import ContainerScreenRenderer from './components/ContainerScreenRenderer.js';
import ItemSelector from './components/ItemSelector.js';
import CraftingList from './components/CraftingList.js';

import ContainerScreen from 'container/ContainerScreen.js';
import ContainerCursor from 'container/ContainerCursor.js';

import Container from 'container/Container.js';
import CraftingContainer from 'container/CraftingContainer.js';
import DumpContainer from 'container/DumpContainer.js';

import * as Items from './Items.js';
import ItemRegistry from 'item/ItemRegistry.js';
import ItemStack from 'item/ItemStack.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.cursor = new ContainerCursor();
    this.screens = [
      new ContainerScreen("Inventory", this.cursor),//Inventory
      new ContainerScreen("Crafting", this.cursor),//Crafting
    ];
    this.screenIndex = 0;

    const inventory = new Container(7, 7);
    inventory.addItemStack(new ItemStack(Items.TOUGH_FIBER));
    inventory.addItemStack(new ItemStack(Items.OAK_LOG, 8));
    this.screens[0].addContainer(inventory, 10, 10);

    const crafting = new CraftingContainer(5, 5);
    this.screens[0].addContainer(crafting, 244, 10);
    this.screens[0].addContainer(crafting.getOutputContainer(), 414, 10);

    const trashCan = new DumpContainer();
    this.screens[0].addContainer(trashCan, 244, 180)

    this.toolbarItemElement = null;

    this.onClick = this.onClick.bind(this);
    this.onToolbarItemAdd = this.onToolbarItemAdd.bind(this);
  }

  onClick(e)
  {
    const id = e.target.id;
    if (id == "prev-screen-btn")
    {
      if (this.screenIndex <= 0)
      {
        this.screenIndex = this.screens.length - 1;
      }
      else
      {
        --this.screenIndex;
      }
    }
    else if (id == "next-screen-btn")
    {
      if (this.screenIndex >= this.screens.length - 1)
      {
        this.screenIndex = 0;
      }
      else
      {
        ++this.screenIndex;
      }
    }
    else
    {
      throw new Error("Unhandled click event");
    }
  }

  onToolbarItemAdd(e)
  {
    const value = this.toolbarItemElement.getValue();
    if (value)
    {
      this.screens[0].getContainerByIndex(0).addItemStack(new ItemStack(value, value.getMaxStackSize()));
    }
  }

  getActiveContainerScreen()
  {
    return this.screens[this.screenIndex];
  }

  //Override
  render()
  {
    const activeScreen = this.getActiveContainerScreen();
    return <div className="app-container">
      <div className="toolbar-container">
        <div className="toolbar-title">Toolbar</div>
        <div className="toolbar-items">
          <ItemSelector ref={ref=>this.toolbarItemElement=ref} title="Items"/>
          <div className="toolbar-items-buttons">
            <button onClick={this.onToolbarItemAdd} disabled={!this.toolbarItemElement || !this.toolbarItemElement.getValue()}>Add</button>
          </div>
        </div>
      </div>
      <div className="workspace-container">
        <button id="prev-screen-btn" className="workspace-navbutton" onClick={this.onClick}>{"<"}</button>
        <div className="workspace-content">
          <ContainerScreenRenderer target={activeScreen}/>
        </div>
        <button id="next-screen-btn" className="workspace-navbutton" onClick={this.onClick}>{">"}</button>
      </div>
      <div className="footer-container">
        <CraftingList/>
      </div>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
