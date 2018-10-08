import React from 'react';
import './ItemComponent.css';

import ItemStack from 'item/ItemStack.js';

class ItemStackComponent extends React.Component
{
  constructor()
  {
    super();
  }

  //Override
  render()
  {
    const itemStack = this.props.src;
    if (!(itemStack instanceof ItemStack)) return null;

    const isEmbedded = this.props.embedded;

    const offsetX = this.props.x || 0;
    const offsetY = this.props.y || 0;

    const slotWidth = this.props.slotWidth || 32;
    const slotHeight = this.props.slotHeight || 32;

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

  renderItemStack(itemStack, offsetX=0, offsetY=0, slotWidth=32, slotHeight=32)
  {
    const item = itemStack.getItem();
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
    return <g key={itemStack.getID()} className="itemstack-container">
      <image className="itemstack-content"
        x={left} y={top}
        width={width} height={height}
        xlinkHref={"./res/" + item.getTextureName()}/>
      <text className="itemstack-size"
        x={left + width - PADDING} y={top + height - PADDING}>
        {itemStack.getStackSize()}
      </text>
    </g>;
  }
}

export default ItemStackComponent;
export const PADDING = 2;
