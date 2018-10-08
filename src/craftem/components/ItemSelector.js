import React from 'react';

import ItemRegistry from 'item/ItemRegistry.js';

import ItemComponent from './ItemComponent.js';

class ItemSelector extends React.Component
{
  constructor()
  {
    super();

    this.items = [];

    this.state = {
      value: ItemRegistry.getItems().next().value.getName()
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  getItem()
  {
    return ItemRegistry.getItem(this.state.value);
  }

  //Override
  componentWillMount()
  {
    const result = this.items;
    for(const item of ItemRegistry.getItems())
    {
      result.push(item);
    }
  }

  onValueChange(e)
  {
    this.setState({value: e.target.value});
  }

  //Override
  render()
  {
    return <select value={this.state.value} onChange={this.onValueChange}>
    {
      this.items.map((e, i) => {
        const name = e.getName();
        return <option key={name} value={name}>
        {name}
        </option>;
      })
    }
    </select>;
  }
}

export default ItemSelector;
