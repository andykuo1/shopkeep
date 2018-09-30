import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { guid } from 'util/MathHelper.js';

import ContainerComponent from 'craftem/components/ContainerComponent.js';
import CursorComponent from 'craftem/components/CursorComponent.js';
import Container from 'craftem/container/Container.js';

import ItemRegistry from 'craftem/item/ItemRegistry.js';
import Item from 'craftem/item/Item.js';
import ItemStack from 'craftem/item/ItemStack.js';

export const TOUGH_FIBER = ItemRegistry.registerItem(new Item("toughFiber"));
export const ROPE = ItemRegistry.registerItem(new Item("rope")).setSize(2, 1);
export const OIL_FLASK = ItemRegistry.registerItem(new Item("oilFlask")).setSize(1, 2);
export const OAK_LOG = ItemRegistry.registerItem(new Item("oakLog")).setSize(3, 2);
export const OAK_WOOD = ItemRegistry.registerItem(new Item("oakWood")).setSize(1, 2);

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

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onSlotClick = this.onSlotClick.bind(this);

    document.addEventListener('mousemove', this.onMouseMove);
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

  //Override
  render()
  {
    return <div className="app-container">
      <h1>Craftem</h1>
      <ContainerComponent src={this.container} onSlotClick={this.onSlotClick}/>
      <CursorComponent src={this.equippedItem} x={this.cursorX} y={this.cursorY}/>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
