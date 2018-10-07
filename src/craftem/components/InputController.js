import ContainerCursor from 'container/ContainerCursor.js';

class InputController
{
  constructor()
  {
    this.posX = 0;
    this.posY = 0;
    this.isDown = false;
    this.containers = null;

    this.cursor = new ContainerCursor();

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  initialize(containers)
  {
    this.containers = containers;

    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  destroy()
  {
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);

    if (this.isDown)
    {
      document.removeEventListener('mouseup', this.onMouseUp);
      this.isDown = false;
    }
  }

  onMouseDown(e)
  {
    this.updatePosition(e.clientX, e.clientY);

    if (!this.isDown)
    {
      document.addEventListener('mouseup', this.onMouseUp);
      this.isDown = true;
    }

    let flag = false;
    for(let element of this.containers.values())
    {
      //Reset selected elements
      element.selectedSlots.length = 0;

      //Only select ONE slot
      if (!flag)
      {
        const slotIndex = element.getSlotIndexByPosition(this.posX, this.posY);
        if (slotIndex >= 0)
        {
          element.selectedSlots.push(slotIndex);
          flag = true;
        }
      }
    }
  }

  onMouseMove(e)
  {
    this.updatePosition(e.clientX, e.clientY);

    if (this.isDown)
    {
      for(let element of this.containers.values())
      {
        const slotIndex = element.getSlotIndexByPosition(this.posX, this.posY);
        if (slotIndex >= 0)
        {
          if (!element.selectedSlots.includes(slotIndex))
          {
            element.selectedSlots.push(slotIndex);
          }
          break;
        }
      }
    }
  }

  onMouseUp(e)
  {
    this.updatePosition(e.clientX, e.clientY);

    let resetSelection = false;

    for(let element of this.containers.values())
    {
      const slotIndex = element.getSlotIndexByPosition(this.posX, this.posY);
      if (slotIndex >= 0)
      {
        const container = element.getContainer();
        container.onCursorInteract(this.cursor, slotIndex);
        break;
      }
    }

    if (resetSelection)
    {
      for(let element of this.containers.values())
      {
        element.selectedSlots.length = 0;
      }
    }

    document.removeEventListener('mouseup', this.onMouseUp);
    this.isDown = false;
  }

  updatePosition(x, y)
  {
    this.posX = x;
    this.posY = y;
  }
}

export default InputController;
