import React from 'react';
import './ItemRenderer.css';

import {PADDING,
  TEXTURE_DIR,
  DEFAULT_SLOT_WIDTH,
  DEFAULT_SLOT_HEIGHT} from './ItemRenderer.js';

import ItemStack from 'item/ItemStack.js';

class ItemStackRenderer extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  //Override
  render()
  {
    const itemStack = this.props.target;
    if (!(itemStack instanceof ItemStack) || itemStack.isEmpty()) return null;

    const isEmbedded = this.props.embedded;

    const offsetX = this.props.x;
    const offsetY = this.props.y;

    const slotWidth = this.props.slotWidth || DEFAULT_SLOT_WIDTH;
    const slotHeight = this.props.slotHeight || DEFAULT_SLOT_HEIGHT;

    if (!isEmbedded)
    {
      const item = itemStack.getItem();
      const style = {position: "fixed", left: offsetX, top: offsetY};
      return <svg
        width={slotWidth * item.getWidth()}
        height={slotHeight * item.getHeight()}
        style={offsetX || offsetY ? style : null}>
      {
        this.renderItemStack(itemStack, 0, 0, slotWidth, slotHeight)
      }
      </svg>;
    }
    else
    {
      return this.renderItemStack(itemStack, offsetX, offsetY, slotWidth, slotHeight)
    }
  }

  renderItemStack(itemStack, offsetX=0, offsetY=0, slotWidth=DEFAULT_SLOT_WIDTH, slotHeight=DEFAULT_SLOT_HEIGHT)
  {
    const item = itemStack.getItem();
    const left = offsetX + PADDING;
    const top = offsetY + PADDING;
    const width = slotWidth * item.getWidth() - (PADDING * 2);
    const height = slotHeight * item.getHeight() - (PADDING * 2);
    const stackSize = itemStack.getStackSize();
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
      {
        stackSize > 1 &&
        <text className="itemstack-size"
          x={left + width - PADDING} y={top + height - PADDING}>
          {stackSize}
        </text>
      }
    </g>;
  }
}

export default ItemStackRenderer;
