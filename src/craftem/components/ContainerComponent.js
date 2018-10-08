import React from 'react';
import './ContainerComponent.css';

import ItemStackComponent from './ItemStackComponent.js';

class ContainerComponent extends React.Component
{
  constructor()
  {
    super();

    this.ref = null;

    this.selectedSlots = [];

    this.offsetX = 0;
    this.offsetY = 0;
  }

  getSlotIndexByPosition(x, y)
  {
    const container = this.props.src;
    const rect = this.ref.getBoundingClientRect();
    const containerX = rect.left + this.offsetX;
    const containerY = rect.top + this.offsetY;
    const containerWidth = rect.right - containerX;
    const containerHeight = rect.bottom - containerY;

    x -= containerX;
    y -= containerY;

    //If is withing container...
    if (x >= 0 && x < containerWidth && y >= 0 && y < containerHeight)
    {
      const slotWidth = containerWidth / container.getWidth();
      const slotHeight = containerHeight / container.getHeight();

      const slotX = Math.floor(x / slotWidth);
      const slotY = Math.floor(y / slotHeight);
      return slotX + slotY * container.getWidth();
    }
    else
    {
      return -1;
    }
  }

  renderContainerGrid(container, offsetX, offsetY, slotWidth, slotHeight, hidden=false)
  {
    const result = [];
    const containerWidth = container.getWidth();
    const hiddenStyle = {outline: "none"};
    const useImage = true;

    for(let i = 0, length = container.getWidth() * container.getHeight(); i < length; ++i)
    {
      result.push(
        useImage ?
        <image key={i} className={"itemslot " + (this.selectedSlots.includes(i) ? "select" : "")}
          x={(i % containerWidth) * slotWidth + offsetX}
          y={Math.floor(i / containerWidth) * slotHeight + offsetY}
          width={slotWidth} height={slotHeight}
          style={hidden ? hiddenStyle : null}
          xlinkHref={"./res/images/itemSlot.png"}/>
        :
        <rect key={i} className={"itemslot " + (this.selectedSlots.includes(i) ? "select" : "")}
          x={(i % containerWidth) * slotWidth + offsetX}
          y={Math.floor(i / containerWidth) * slotHeight + offsetY}
          width={slotWidth} height={slotHeight}
          style={hidden ? hiddenStyle : null}/>
      );
    }

    return <g>{result}</g>;
  }

  renderContainerItems(container, offsetX, offsetY, slotWidth, slotHeight)
  {
    const containerWidth = container.getWidth();
    return container._slots.map((e, i) => {
      if (!e) return null;

      const index = e.getRootIndex();
      //Only render if root index...
      if (i != index) return null;

      return <ItemStackComponent key={e.getItemStack().getID()}
        src={e.getItemStack()} embedded="true"
        x={(index % containerWidth) * slotWidth + offsetX}
        y={Math.floor(index / containerWidth) * slotHeight + offsetY}
        slotWidth={slotWidth} slotHeight={slotHeight}/>;
    });
  }

  getContainer()
  {
    return this.props.src;
  }

  //Override
  render()
  {
    const src = this.props.src;
    const containerWidth = src.getWidth();
    const containerHeight = src.getHeight();
    const containerTitle = this.props.hideName ? null : src.getName();
    const headerHeight = containerTitle ? 18 : 0;

    const width = this.props.width || containerWidth * 32;
    const slotWidth = Math.floor(width / containerWidth);

    const height = this.props.height || containerHeight * slotWidth;
    const slotHeight = Math.floor(height / containerHeight);

    const paddingLeft = this.offsetX = (width - (slotWidth * containerWidth)) / 2;
    const paddingTop = this.offsetY = (height - (slotHeight * containerHeight)) / 2;
    this.offsetY += headerHeight;

    return <svg ref={ref=>this.ref=ref} className={"itemcontainer " + this.props.className}
      width={width} height={height + headerHeight}
      style={{paddingLeft: paddingLeft, paddingTop: paddingTop}}>
      {
        this.renderContainerGrid(src, 0, headerHeight, slotWidth, slotHeight, this.props.hideGrid)
      }
      {
        this.renderContainerItems(src, 0, headerHeight, slotWidth, slotHeight)
      }
      {
        containerTitle &&
        <text className="itemcontainer-title"
          x={4} y={headerHeight - 4}>{containerTitle}</text>
      }
    </svg>;
  }
}

export default ContainerComponent;
