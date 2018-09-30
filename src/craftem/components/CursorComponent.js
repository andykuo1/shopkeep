import React from 'react';

import { renderItemStack } from './ItemRenderer.js';

class CursorComponent extends React.Component
{
  constructor()
  {
    super();
  }

  //Override
  render()
  {
    const src = this.props.src;
    const x = this.props.x;
    const y = this.props.y;
    const maxItemSize = 96;
    return <svg className="cursoritem"
    width={maxItemSize} height={maxItemSize}
    style={{
      position: "fixed",
      pointerEvents: "none",
      left: x, top: y
    }}>
    {
      renderItemStack(src)
    }
    </svg>;
  }
}

export default CursorComponent;
