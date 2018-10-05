import React from 'react';
import './DialogueComponent.css';

import * as ItemRenderer from './ItemRenderer.js';

class DialogueComponent extends React.Component
{
  constructor()
  {
    super();
  }

  //Override
  render()
  {
    const src = this.props.src;
    return <div className="dialogue-container">
      <p>{src.message}</p>
      {
        src.hasItems() &&
        <ul className="dialogue-items">
        {
          src.items.map((e, i) => {
            return <li key={e.itemStack.getID()}>
              {
                ItemRenderer.renderFullItemStack(e.itemStack)
              }
              <label className="dialogue-item-value">{e.value} gp</label>
            </li>;
          })
        }
        </ul>
      }
      {
        src.hasItems() &&
        <span>
          <hr/>
          <div className="dialogue-total-container">
            <label className="dialogue-total-value">{"Total: " + src.getTotalItemValue()} gp</label>
          </div>
        </span>
      }
      <hr/>
      <div className="dialogue-option-container">
      {
        src.options.map((e, i) => {
          return <button key={e.id} className="dialogue-option" onClick={() => this.props.onOption && this.props.onOption(e)}>{e.label || "Next"}</button>;
        })
      }
      </div>
    </div>;
  }
}

export default DialogueComponent;
