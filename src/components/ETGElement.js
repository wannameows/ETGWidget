import { PolymerElement } from '@polymer/polymer/polymer-element';
import { API_URL } from '../constants';

export default class ETGElement extends PolymerElement {
  constructor() {
    super();
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const statusHelper = response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(new Error(response.statusText));
    };

    this.api = {
      get: query => fetch(API_URL + query, {
        method: 'GET',
        headers
      })
        .then(statusHelper)
        .then(response => response.json()),
      post: (query, data = {}) => fetch(API_URL + query, {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      })
        .then(statusHelper)
        .then(response => response.text().then(text => (text ? JSON.parse(text) : null)))
    };
  }

  getLocationParams() {
    let { search } = window.location;
    let query = search.substring(search.indexOf('?') + 1).split('&');
    if (Boolean(query[0])) {
      let params = {};
      query.map(param => {
        let pair = param.split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
      });
      return params;
    } else {
      return null;
    }
  }
}
