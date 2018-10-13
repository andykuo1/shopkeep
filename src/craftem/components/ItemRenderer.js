import React from 'react';
import './ItemRenderer.css';

import Item from 'item/Item.js';

export const PADDING = 2;
export const TEXTURE_DIR = "./res/images/";
export const DEFAULT_SLOT_WIDTH = 32;
export const DEFAULT_SLOT_HEIGHT = 32;

class ItemRenderer extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  //Override
  render()
  {
    const item = this.props.target;
    if (!(item instanceof Item)) return null;

    const isEmbedded = this.props.embedded;

    const offsetX = this.props.x;
    const offsetY = this.props.y;

    const slotWidth = this.props.slotWidth || DEFAULT_SLOT_WIDTH;
    const slotHeight = this.props.slotHeight || DEFAULT_SLOT_HEIGHT;

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

  renderItem(item, offsetX=0, offsetY=0, slotWidth=DEFAULT_SLOT_WIDTH, slotHeight=DEFAULT_SLOT_HEIGHT)
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
      <image className="itemstack"
        x={left} y={top} width={width} height={height}
        xlinkHref={TEXTURE_DIR + item.getTextureName()}/>
    </g>;
  }
}

export default ItemRenderer;
