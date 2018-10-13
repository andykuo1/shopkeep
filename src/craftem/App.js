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
      new ContainerScreen("Crafting", this.cursor),
      new ContainerScreen("Smelting", this.cursor),
      new ContainerScreen("Cauldron", this.cursor),
      new ContainerScreen("Textile", this.cursor),
      new ContainerScreen("Alchemy", this.cursor),
      new ContainerScreen("Enchanting", this.cursor)
    ];
    this.screenIndex = 0;
    this.cursor.setScreen(this.getActiveContainerScreen());

    const playerInventory = new Container(7, 9);
    playerInventory.addItemStack(new ItemStack(Items.TOUGH_FIBER));
    playerInventory.addItemStack(new ItemStack(Items.OAK_LOG, 8));

    //Crafting
    {
      const screen = this.screens[0];
      screen.addContainer(playerInventory, 10, 10);

      const crafting = new CraftingContainer(5, 5);
      screen.addContainer(crafting, 244, 10);
      screen.addContainer(crafting.getOutputContainer(), 414, 10);
      const trashCan = new DumpContainer();
      screen.addContainer(trashCan, 244, 180);
    }

    //Smelting
    {
      const screen = this.screens[1];
      screen.addContainer(playerInventory, 10, 10);
    }

    //Cauldron
    {
      const screen = this.screens[2];
      screen.addContainer(playerInventory, 10, 10);
    }

    //Textile
    {
      const screen = this.screens[3];
      screen.addContainer(playerInventory, 10, 10);
    }

    //Alchemy
    {
      const screen = this.screens[4];
      screen.addContainer(playerInventory, 10, 10);
    }

    //Enchanting
    {
      const screen = this.screens[5];
      screen.addContainer(playerInventory, 10, 10);
    }

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

    this.cursor.setScreen(this.getActiveContainerScreen());
  }

  onToolbarItemAdd(e)
  {
    const value = this.toolbarItemElement.getValue();
    if (value)
    {
      this.getActiveContainerScreen().getContainerByIndex(0).addItemStack(new ItemStack(value, value.getMaxStackSize()));
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
