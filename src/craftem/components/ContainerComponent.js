import React from 'react';
import './ContainerComponent.css';

import { renderItemStack } from './ItemRenderer.js';

class ContainerComponent extends React.Component
{
  constructor()
  {
    super();
  }

  renderContainerGrid(container, slotWidth, slotHeight)
  {
    const result = [];
    const containerWidth = container.getWidth();
    const callback = this.props.onSlotClick;

    for(let i = 0, length = container.getSize(); i < length; ++i)
    {
      result.push(
        <rect key={i} className="itemslot"
          x={(i % containerWidth) * slotWidth}
          y={Math.floor(i / containerWidth) * slotHeight}
          width={slotWidth} height={slotHeight}
          onClick={(e) => {if (callback) callback(container, i)}}/>
      );
    }

    return <g>{result}</g>;
  }

  renderContainerItems(container, slotWidth, slotHeight)
  {
    const containerWidth = container.getWidth();
    return container.getSlots().map((e, i) => {
      if (!e) return null;
      
      const index = e.index;
      //Only render if root index...
      if (i != index) return null;

      return renderItemStack(e.itemStack,
        (index % containerWidth) * slotWidth,
        Math.floor(index / containerWidth) * slotHeight,
        slotWidth, slotHeight);
    });
  }

  //Override
  render()
  {
    const src = this.props.src;
    const containerWidth = src.getWidth();
    const containerHeight = src.getHeight();

    const width = this.props.width || containerWidth * 32;
    const slotWidth = Math.floor(width / containerWidth);

    const height = this.props.height || containerHeight * slotWidth;
    const slotHeight = Math.floor(height / containerHeight);

    const paddingLeft = (width - (slotWidth * containerWidth)) / 2;
    const paddingTop = (height - (slotHeight * containerHeight)) / 2;

    return <svg className="itemcontainer"
      width={width} height={height}
      style={{paddingLeft: paddingLeft, paddingTop: paddingTop}}>
      {
        this.renderContainerGrid(src, slotWidth, slotHeight)
      }
      {
        this.renderContainerItems(src, slotWidth, slotHeight)
      }
    </svg>;
  }
}

export default ContainerComponent;
