// @ts-check

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => ({
  getInputName: (property) => `data[${property}]`,
  getInputId: (property) => `data_${property}`,
  route(name, params) {
    return app.reverse(name, params);
  },
  t(key) {
    return i18next.t(key);
  },
  _,
  getAlertClass(type) {
    switch (type) {
      // case 'failure':
      //   return 'danger';
      case 'error':
        return 'danger';
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      default:
        throw new Error(`Unknown flash type: '${type}'`);
    }
  },
  formatName: (user) => [user.firstName, user.lastName].filter((value) => value).join(' '),
  formatDate: (str) => new Date(str).toLocaleString(),
});
