import React from 'react';
import './ItemComponent.css';

import Item from 'item/Item.js';

class ItemComponent extends React.Component
{
  constructor()
  {
    super();
  }

  //Override
  render()
  {
    const item = this.props.src;
    if (!(item instanceof Item)) return null;

    const isEmbedded = this.props.embedded;

    const offsetX = this.props.x;
    const offsetY = this.props.y;

    const slotWidth = this.props.slotWidth || 32;
    const slotHeight = this.props.slotHeight || 32;

    if (!isEmbedded)
    {
      const style = {position: "fixed", left: offsetX, top: offsetY};
      return <svg
        width={slotWidth * item.getWidth()}
        height={slotHeight * item.getHeight()}
        style={offsetX || offsetY ? style : null}>
      {
        this.renderItem(item, 0, 0, slotWidth, slotHeight)
      }
      </svg>;
    }
    else
    {
      return this.renderItem(item, offsetX, offsetY, slotWidth, slotHeight)
    }
  }

  renderItem(item, offsetX=0, offsetY=0, slotWidth=32, slotHeight=32)
  {
    const left = offsetX + PADDING;
    const top = offsetY + PADDING;
    const width = slotWidth * item.getWidth() - (PADDING * 2);
    const height = slotHeight * item.getHeight() - (PADDING * 2);
    /*
    <rect className="itemstack-item"
      x={left} y={top}
      width={width} height={height}
      style={{fill: "slategray"}}/>
    */
    return <g key={item.getName()} className="itemstack-container">
      <image className="itemstack-content"
        x={left} y={top}
        width={width} height={height}
        xlinkHref={"./res/" + item.getTextureName()}/>
    </g>;
  }
}

export default ItemComponent;
export const PADDING = 2;
