import Vue from 'vue';
import NewTask from './NewTask.vue';

/* eslint-disable no-undef */
if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
/* eslint-enable no-undef */

new Vue({
  el: '#root',
  render: (h) => h(NewTask),
});
