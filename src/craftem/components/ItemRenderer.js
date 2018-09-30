import React from 'react';
import ItemStack from 'craftem/item/ItemStack.js';

export function renderItemStack(itemStack, x=0, y=0, slotWidth=32, slotHeight=32, padding=2)
{
  if (!(itemStack instanceof ItemStack)) return null;

  const item = itemStack.getItem();
  return <rect key={itemStack.getID()} className="itemstack"
    x={x + padding}
    y={y + padding}
    width={slotWidth * item.getWidth() - (padding * 2)}
    height={slotHeight * item.getHeight() - (padding * 2)}/>;
};
