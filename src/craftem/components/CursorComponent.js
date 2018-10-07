import React from 'react';

import ItemComponent from './ItemComponent.js';
import InputController from './InputController.js';

class CursorComponent extends React.Component
{
  constructor()
  {
    super();

    this.controller = new InputController();
  }

  //Override
  componentDidMount()
  {
    this.controller.initialize(this.props.containers);
  }

  //Override
  componentWillUnmount()
  {
    this.controller.destroy();
  }

  //Override
  render()
  {
    return <ItemComponent src={this.controller.cursor.getEquippedItemStack()} x={this.controller.posX} y={this.controller.posY}/>;
  }
}

export default CursorComponent;
