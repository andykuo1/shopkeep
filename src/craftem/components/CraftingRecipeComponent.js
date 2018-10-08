import React from 'react';
import './CraftingRecipeComponent.css';

import ItemComponent from './ItemComponent.js';
import ItemStackComponent from './ItemStackComponent.js';

class CraftingRecipeComponent extends React.Component
{
  constructor()
  {
    super();

    this.craftingOutput = null;
  }

  componentDidMount()
  {
    this.craftingOutput = this.props.src.getResult();
  }

  //Override
  render()
  {
    const src = this.props.src;
    return <li className="crafting-recipe-container">
      <span className="crafting-recipe-pattern">
      {
        <input defaultValue={src.pattern} disabled={true}/>
      }
      </span>
      <span className="crafting-recipe-itemmap">
      {
        Object.entries(src.itemMap).map((e, i) => {
          return <span key={e[0]}>
            <label>{e[0] + ":"}</label>
            <ItemComponent src={e[1]}/>
          </span>
        })
      }
      </span>
      <label className="crafting-recipe-arrow">=></label>
      <span className="crafting-recipe-output">
      {
        <ItemStackComponent src={this.craftingOutput}/>
      }
      </span>
    </li>;
  }
}

export default CraftingRecipeComponent;
