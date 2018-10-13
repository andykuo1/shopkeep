import React from 'react';
import './CraftingRecipeRenderer.css';

import ItemRenderer from './ItemRenderer.js';
import ItemStackRenderer from './ItemStackRenderer.js';

class CraftingRecipeRenderer extends React.Component
{
  constructor()
  {
    super();

    this.craftingOutput = null;
  }

  componentDidMount()
  {
    this.craftingOutput = this.props.target.getResult();
  }

  //Override
  render()
  {
    const target = this.props.target;
    return <li className="crafting-recipe-container">
      <span className="crafting-recipe-pattern">
      {
        <input defaultValue={target.pattern} disabled={true}/>
      }
      </span>
      <span className="crafting-recipe-itemmap">
      {
        Object.entries(target.itemMap).map((e, i) => {
          return <span key={e[0]}>
            <label>{e[0] + ":"}</label>
            <ItemRenderer target={e[1]}/>
          </span>
        })
      }
      </span>
      <label className="crafting-recipe-arrow">=></label>
      <span className="crafting-recipe-output">
      {
        <ItemStackRenderer target={this.craftingOutput}/>
      }
      </span>
    </li>;
  }
}

export default CraftingRecipeRenderer;
