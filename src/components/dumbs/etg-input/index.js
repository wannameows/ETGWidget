import { html, PolymerElement } from '@polymer/polymer/polymer-element';

import css from './style.less';
import template from './template.html';

export default class ETGInput extends PolymerElement {
  static get properties() {
    return {
      value: {
        type: String,
        value: '',
        notify: true
      },
      placeholder: {
        type: String,
        value: ''
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
}

window.customElements.define('etg-input', ETGInput);
