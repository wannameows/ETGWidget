import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import css from './style.less';
import template from './template.html';

export default class ETGSelector extends PolymerElement {
  static get properties() {
    return {
      value: {
        type: String,
        value: '',
        notify: true
      },
      data: {
        type: Array,
        value: []
      },
      value: {
        type: String,
        value: null,
        notify: true
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

window.customElements.define('etg-selector', ETGSelector);
