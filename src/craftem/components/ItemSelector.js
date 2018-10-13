import React from 'react';
import './ItemSelector.css';

import ItemRenderer from './ItemRenderer.js';

import ItemRegistry from 'item/ItemRegistry.js';

class ItemSelector extends React.Component
{
  constructor(props)
  {
    super(props);

    this.itemList = [];

    this.state = {
      open: false,
      value: null
    };
  }

  //Override
  componentWillMount()
  {
    this.itemList = Array.from(ItemRegistry.getItems());
  }

  //Override
  componentWillUnmount()
  {
    this.itemList = null;
  }

  toggle()
  {
    this.setState(prev => {
      return {
        open: !prev.open
      };
    });
  }

  close()
  {
    this.setState({open: false});
  }

  getValue()
  {
    return this.state.value;
  }

  //Override
  render()
  {
    const title = this.props.title || "Items";
    const items = this.itemList;
    const isOpen = this.state.open;
    const value = this.state.value;
    return <div className="itemselector-container">
      <div className="itemselector-header" onClick={() => this.toggle()}>
        <span className="itemselector-header-title">
        {value ? value.getName() : title}
        </span>
        <span className="itemselector-header-icon">
        {
          value &&
          <ItemRenderer target={value} slotWidth={24 / value.getWidth()} slotHeight={24 / value.getHeight()}/>
        }
        </span>
      </div>
      {
        isOpen &&
        <ul className="itemselector-list">
        {
          items.map(e=><li key={e.getName()} className="itemselector-list-item"
            onClick={() => {
              this.setState({value: e})
              this.close();
            }}>
            <ItemRenderer target={e} slotWidth={16 / e.getWidth()} slotHeight={16 / e.getHeight()}/>
            {e.getName()}
          </li>)
        }
        </ul>
      }
    </div>;
  }
}

export default ItemSelector;
