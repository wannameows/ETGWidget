import { html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if.js';
import ETGElement from '../../ETGElement';

import '../../dumbs/etg-form-element';
import '../../dumbs/etg-input';
import '../../dumbs/etg-selector';
import '../../dumbs/etg-button';
import '../etg-topics';

import css from './style.less';
import template from './template.html';

export default class ETGWidget extends ETGElement {
  constructor() {
    super();
    this.getWidgetData = this.getWidgetData.bind(this);
    this.generateTopics = this.generateTopics.bind(this);
  }
  static get properties() {
    return {
      subject: {
        type: Array,
        value: []
      },
      types: {
        type: Array,
        value: []
      },
      form: {
        type: Object,
        value: {
          keywords: '',
          type: '',
          subject: ''
        }
      },
      topics: {
        type: Array,
        value: []
      },
      loading: {
        type: Boolean,
        value: false
      }
    };
  }
  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }
  connectedCallback() {
    super.connectedCallback();
    this.getWidgetData();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  getWidgetData() {
    this.api.get('data').then(({ subject, types }) => {
      subject.unshift({ id: 0, title: 'All' });
      types.unshift({ id: 0, title: 'All' });
      let form = { ...this.form };
      let params = this.getLocationParams();
      if (params) {
        if (params.keywords) {
          form.keywords = params.keywords;
        }
        if (params.type && types.find(elem => elem.title === params.type)) {
          types = types.sort(a => a.title === params.type ? -1 : 1);
          form.type = types[0].id;
        }
        if (params.subject && subject.find(elem => elem.title === params.subject)) {
          subject = subject.sort(a => a.title === params.subject ? -1 : 1);
          form.subject = subject[0].id;
        }
      }
      this.setProperties({
        subject,
        types,
        form
      });
    });
  }
  generateTopics() {
    let { keywords, type, subject } = this.form;
    subject = subject === 0 ? '' : subject;
    type = type === 0 ? '' : type;
    let query = `${keywords ? `?keywords=${keywords}` : ''}`;
    query += `${type ? `${query.length > 0 ? '&' : '?'}type=${type}` : ''}`;
    query += `${subject ? `${query.length > 0 ? '&' : '?'}subject=${subject}` : ''}`;
    this.loading = true;
    this.api.get(`generate${query}`).then(data => {
      this.topics = data;
      this.loading = false;
    });
  }
}

window.customElements.define('etg-widget', ETGWidget);
