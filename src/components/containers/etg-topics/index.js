import { html, PolymerElement } from '@polymer/polymer/polymer-element';

import css from './style.less';
import template from './template.html';

export default class ETGTopics extends PolymerElement {
  static get properties() {
    return {
      data: {
        type: Array,
        value: [],
        observer: 'onDataChange'
      }
    };
  }
  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  onDataChange(newValue) {
    let tCtx = this.$.topicsCanvas.getContext('2d');
    let x = 30;
    let y = 30;
    let lineheight = 24;
    tCtx.canvas.width = this.$.topics.offsetWidth;
    tCtx.canvas.height = newValue.length * lineheight + 30;
    newValue.map((string, index) => {
      tCtx.font = '100 18px sans-serif';
      tCtx.fillText(`${index + 1}. ${string}`, x, y + (index * lineheight));
    });
  }
}

window.customElements.define('etg-topics', ETGTopics);
