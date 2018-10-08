import React from 'react';
import './CraftingRecipeComponent.css';

import ItemSelector from './ItemSelector.js';
import ItemComponent from './ItemComponent.js';

import CraftingRegistry from 'crafting/CraftingRegistry.js';
import CraftingRecipe from 'crafting/CraftingRecipe.js';

class EditableCraftingRecipeComponent extends React.Component
{
  constructor()
  {
    super();

    this.state = {
      value: "",
      symbols: []
    };

    this.inputs = new Map();
    this.output = null;

    this.onPatternChange = this.onPatternChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onPatternChange(e)
  {
    const value = e.target.value;
    const symbolValues = value.split("").filter(symbol => CraftingRecipe.isPatternSymbol(symbol));
    const symbols = Array.from(new Set(symbolValues)) || [];

    this.setState({
      value: e.target.value,
      symbols: symbols
    });
  }

  //Override
  onSubmit(e)
  {
    if (!this.state.value) return;
    
    const itemMap = {};
    for(const symbol of this.state.symbols)
    {
      itemMap[symbol] = this.inputs.get(symbol).getItem();
    }
    const output = this.output.getItem();

    CraftingRegistry.registerRecipe(new CraftingRecipe(this.state.value, itemMap, output, 1));

    this.setState({value: "", symbols: []});
  }

  //Override
  render()
  {
    return <li className="crafting-recipe-container">
      <span className="crafting-recipe-pattern">
      {
        <input value={this.state.value} onChange={this.onPatternChange}/>
      }
      </span>
      <span className="crafting-recipe-itemmap">
      {
        this.state.symbols &&
        this.state.symbols.map((e, i) => {
          return <div key={e}>
            <label>{e + ":"}</label>
            <ItemSelector ref={ref=>this.inputs.set(e, ref)}/>
          </div>;
        })
      }
      </span>
      <label className="crafting-recipe-arrow">=></label>
      <span className="crafting-recipe-output">
      {
        <ItemSelector ref={ref=>this.output=ref}/>
      }
      </span>
      <button onClick={this.onSubmit}>+</button>
    </li>;
  }
}

export default EditableCraftingRecipeComponent;
