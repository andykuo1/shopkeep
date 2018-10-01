import React from 'react';
import './ContainerComponent.css';

import { renderItemStack } from './ItemRenderer.js';

class ContainerComponent extends React.Component
{
  constructor()
  {
    super();
  }

  renderContainerGrid(container, offsetX, offsetY, slotWidth, slotHeight, hidden=false)
  {
    const result = [];
    const containerWidth = container.getWidth();
    const callback = this.props.onSlotClick;
    const hiddenStyle = {outline: "none"};

    for(let i = 0, length = container.getSize(); i < length; ++i)
    {
      result.push(
        <rect key={i} className="itemslot"
          x={(i % containerWidth) * slotWidth + offsetX}
          y={Math.floor(i / containerWidth) * slotHeight + offsetY}
          width={slotWidth} height={slotHeight}
          style={hidden ? hiddenStyle : null}
          onClick={(e) => {if (callback) callback(container, i);}}/>
      );
    }

    return <g>{result}</g>;
  }

  renderContainerItems(container, offsetX, offsetY, slotWidth, slotHeight)
  {
    const containerWidth = container.getWidth();
    return container.getSlots().map((e, i) => {
      if (!e) return null;

      const index = e.getRootIndex();
      //Only render if root index...
      if (i != index) return null;

      return renderItemStack(e.getItemStack(),
        (index % containerWidth) * slotWidth + offsetX,
        Math.floor(index / containerWidth) * slotHeight + offsetY,
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

    const headerHeight = this.props.title ? 18 : 0;

    return <svg className={"itemcontainer " + this.props.className}
      width={width} height={height + headerHeight}
      style={{paddingLeft: paddingLeft, paddingTop: paddingTop}}>
      {
        this.renderContainerGrid(src, 0, headerHeight, slotWidth, slotHeight, this.props.hideGrid)
      }
      {
        this.renderContainerItems(src, 0, headerHeight, slotWidth, slotHeight)
      }
      {
        this.props.title &&
        <text className="itemcontainer-title"
          x={4} y={headerHeight - 4}>{this.props.title}</text>
      }
    </svg>;
  }
}

export default ContainerComponent;
