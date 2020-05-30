import Vue from 'vue';
import App from './App';

/* eslint-disable no-undef */
if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
/* eslint-enable no-undef */

new Vue({
  el: '#root',
  render: (h) => h(App),
});
