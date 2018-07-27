import { html, PolymerElement } from '@polymer/polymer/polymer-element';

import css from './style.less';
import template from './template.html';

export default class ETGFormElement extends PolymerElement {
  static get properties() {
    return {
      label: {
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

window.customElements.define('etg-form-element', ETGFormElement);
