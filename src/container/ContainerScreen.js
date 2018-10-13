class ContainerScreen
{
  constructor(title, cursor)
  {
    this.title = title;
    this.elements = [];

    this.cursor = cursor;

    this.targetSlots = [];
  }

  onMouseDown(e)
  {
    const x = e.clientX;
    const y = e.clientY;

    this.targetSlots.length = 0;
    for(const element of this.elements)
    {
      const slotIndex = element.getSlotIndexByPosition(x, y);
      if (slotIndex >= 0)
      {
        this.targetSlots.push({container: element.getContainer(), index: slotIndex});
        return true;
      }
    }

    return false;
  }

  onMouseUp(e)
  {
    const x = e.clientX;
    const y = e.clientY;

    if (this.targetSlots.length == 1)
    {
      this.targetSlots[0].container.interact(this.cursor, this.targetSlots[0].index);
    }
    else
    {
      //TODO: Split the items among the available space...
    }

    this.targetSlots.length = 0;
  }

  onMouseMove(e)
  {
    const x = e.clientX;
    const y = e.clientY;

    for(const element of this.elements)
    {
      const slotIndex = element.getSlotIndexByPosition(x, y);
      if (slotIndex >= 0 && !this.isActiveSlotIndex(element.getContainer(), slotIndex))
      {
        this.targetSlots.push({container: element.getContainer(), index: slotIndex});
        break;
      }
    }
  }

  addContainer(container, x, y)
  {
    this.elements.push(new ContainerElement(container, x, y));
  }

  removeContainer(container)
  {
    for(let i = 0, l = this.elements.length; i < l; ++i)
    {
      if (this.elements[i].getContainer() == container)
      {
        this.elements.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  isActiveSlotIndex(container, index)
  {
    for(const targetSlot of this.targetSlots)
    {
      if (targetSlot.container == container && targetSlot.index == index)
      {
        return true;
      }
    }
    return false;
  }

  getContainerByIndex(index)
  {
    return this.elements[index].getContainer();
  }

  getContainerElements()
  {
    return this.elements;
  }

  getCursor()
  {
    return this.cursor;
  }

  getTitle()
  {
    return this.title;
  }
}

class ContainerElement
{
  constructor(container, x, y)
  {
    this.container = container;
    this.x = x;
    this.y = y;

    this.renderer = null;
  }

  setRenderer(renderer)
  {
    this.renderer = renderer;
    return this;
  }

  getSlotIndexByPosition(x, y)
  {
    const rect = this.renderer.ref.getBoundingClientRect();

    const container = this.container;
    const containerX = rect.left;
    const containerY = rect.top;
    const containerWidth = rect.right - containerX;
    const containerHeight = rect.bottom - containerY;

    const newX = x - containerX;
    const newY = y - containerY;
    if (newX >= 0 && newX < containerWidth && newY >= 0 && newY < containerHeight)
    {
      const slotWidth = containerWidth / container.getWidth();
      const slotHeight = containerHeight / container.getHeight();

      const slotX = Math.floor(newX / slotWidth);
      const slotY = Math.floor(newY / slotHeight);
      const slotIndex = slotX + slotY * container.getWidth();
      return slotIndex;
    }

    return -1;
  }

  getRenderer()
  {
    return this.renderer;
  }

  getContainer()
  {
    return this.container;
  }

  getX()
  {
    return this.x;
  }

  getY()
  {
    return this.y;
  }
}

export default ContainerScreen;
