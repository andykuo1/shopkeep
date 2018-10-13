import React from 'react';
import './ContainerRenderer.css';

import {DEFAULT_SLOT_WIDTH} from './ItemRenderer.js';
import ItemStackRenderer from './ItemStackRenderer.js';

class ContainerRenderer extends React.Component
{
  constructor(props)
  {
    super(props);

    this.ref = null;
  }

  //Override
  render()
  {
    const screen = this.props.screen;
    const target = this.props.target;
    const containerWidth = target.getWidth();
    const containerHeight = target.getHeight();

    const activeSlots = this.props.activeSlots;

    const width = this.props.width || containerWidth * DEFAULT_SLOT_WIDTH;
    const slotWidth = Math.floor(width / containerWidth);

    const height = this.props.height || containerHeight * slotWidth;
    const slotHeight = Math.floor(height / containerHeight);

    return <g ref={ref=>this.ref=ref} className="itemcontainer-container">
      {
        this.renderContainerBackground(screen, target, this.props.x, this.props.y, slotWidth, slotHeight, this.props.hideGrid)
      }
      {
        this.renderContainerForeground(screen, target, this.props.x, this.props.y, slotWidth, slotHeight)
      }
    </g>;
  }

  renderContainerBackground(containerScreen, container, offsetX, offsetY, slotWidth, slotHeight, hidden=false)
  {
    const result = [];
    const containerWidth = container.getWidth();
    const hiddenStyle = {outline: "none"};

    for(let i = 0, length = container.getWidth() * container.getHeight(); i < length; ++i)
    {
      result.push(<rect key={i} className={"itemcontainer-slot " + (containerScreen.isActiveSlotIndex(container, i) ? "active" : "")}
        x={(i % containerWidth) * slotWidth + offsetX}
        y={Math.floor(i / containerWidth) * slotHeight + offsetY}
        width={slotWidth} height={slotHeight}
        style={hidden ? hiddenStyle : null}/>
      );
    }

    return <g>{result}</g>;
  }

  renderContainerForeground(containerScreen, container, offsetX, offsetY, slotWidth, slotHeight, hidden=false)
  {
    const result =[];
    const containerWidth = container.getWidth();

    for(const slot of container.getSlots())
    {
      const index = slot.getRootIndex();
      result.push(<ItemStackRenderer key={slot.getItemStack().getID()}
        target={slot.getItemStack()} embedded="true"
        x={(index % containerWidth) * slotWidth + offsetX}
        y={Math.floor(index / containerWidth) * slotHeight + offsetY}
        slotWidth={slotWidth} slotHeight={slotHeight}/>
      );
    }
    return <g>{result}</g>;
  }
}

export default ContainerRenderer;
