import React from 'react';
import './ContainerScreenRenderer.css';

import ContainerRenderer from './ContainerRenderer.js';
import ItemStackRenderer from './ItemStackRenderer.js';
import {DEFAULT_SLOT_WIDTH, DEFAULT_SLOT_HEIGHT} from './ItemRenderer.js';

class ContainerScreenRenderer extends React.Component
{
  constructor(props)
  {
    super(props);

    this.down = false;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.cursorX = 0;
    this.cursorY = 0;
  }

  //Override
  componentDidMount()
  {
    const target = this.props.target;
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  //Override
  componentWillUnmount()
  {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  onMouseDown(e)
  {
    if (this.down)
    {
      document.removeEventListener("mouseup", this.onMouseUp);
        this.down = false;
    }

    if (this.props.target.onMouseDown(e))
    {
      this.down = true;
      document.addEventListener("mouseup", this.onMouseUp);
    }
  }

  onMouseMove(e)
  {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;

    if (!this.down) return;

    this.props.target.onMouseMove(e);
  }

  onMouseUp(e)
  {
    if (!this.down) return;

    document.removeEventListener("mouseup", this.onMouseUp);
    this.down = false;

    this.props.target.onMouseUp(e);
  }

  onKeyDown(e)
  {
    if (e.key == "Shift")
    {
      this.props.target.getCursor().setPrecisionMode(true);
      return false;
    }
    else if (e.key == "Alt")
    {
      this.props.target.getCursor().setControlMode(true);
      return false;
    }
  }

  onKeyUp(e)
  {
    if (e.key == "Shift")
    {
      this.props.target.getCursor().setPrecisionMode(false);
      return false;
    }
    else if (e.key == "Alt")
    {
      this.props.target.getCursor().setControlMode(false);
      return false;
    }
  }

  //Override
  render()
  {
    const target = this.props.target;
    return <div className="screen-container" onMouseDown={this.onMouseDown}>
      <h1 className="screen-title">{target.getTitle()}</h1>
      <svg className="screen-view" width="600" height="320">
      {
        target.getContainerElements().map(e =>
          <ContainerRenderer key={e.getContainer().getID()} ref={ref=>e.setRenderer(ref)}
          screen={target} target={e.getContainer()}
          x={e.getX()} y={e.getY()}/>)
      }
      </svg>
      {
        <ItemStackRenderer target={target.getCursor().getEquippedItemStack()}
          x={this.cursorX - DEFAULT_SLOT_WIDTH / 2} y={this.cursorY - DEFAULT_SLOT_HEIGHT / 2}
          slotWidth={DEFAULT_SLOT_WIDTH} slotHeight={DEFAULT_SLOT_HEIGHT}/>
      }
      <div className="screen-error">
        Sorry, your browser is too small.
      </div>
    </div>;
  }
}

export default ContainerScreenRenderer;
