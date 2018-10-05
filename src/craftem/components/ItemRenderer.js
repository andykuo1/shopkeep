import React from 'react';
import ItemStack from 'item/ItemStack.js';

export function renderFullItemStack(itemStack, slotWidth=32, slotHeight=32, padding=2)
{
  if (!(itemStack instanceof ItemStack)) return null;

  const item = itemStack.getItem();
  return <svg width={slotWidth * item.getWidth()} height={slotHeight * item.getHeight()}>
  {
    renderItemStack(itemStack)
  }
  </svg>;
}

export function renderItemStack(itemStack, x=0, y=0, slotWidth=32, slotHeight=32, padding=2)
{
  if (!(itemStack instanceof ItemStack)) return null;

  const item = itemStack.getItem();
  const left = x + padding;
  const top = y + padding;
  const width = slotWidth * item.getWidth() - (padding * 2);
  const height = slotHeight * item.getHeight() - (padding * 2);
  return <g key={itemStack.getID()} className="itemstack">
    <rect className="itemstack-item"
      x={left} y={top}
      width={width} height={height}
      style={{fill: item.color}}/>
    <text className="itemstack-size"
      x={left + width - padding} y={top + height - padding}>{itemStack.getStackSize()}</text>
  </g>;
};
