import React from 'react';
import './CraftingList.css';

import CraftingRegistry from 'crafting/CraftingRegistry.js';
import CraftingRecipeRenderer from './CraftingRecipeRenderer.js';
import EditableCraftingRecipeComponent from './EditableCraftingRecipeComponent.js';

class CraftingList extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  //Override
  render()
  {
    return <div className="crafting-list-container">
      <h1>Crafting Recipes</h1>
      <ul className="crafting-list">
      {
        CraftingRegistry.getRecipes().map((e, i) => {
          return <CraftingRecipeRenderer key={i} target={e}/>;
        })
      }
      <EditableCraftingRecipeComponent/>
      </ul>
    </div>;
  }
}

export default CraftingList;
