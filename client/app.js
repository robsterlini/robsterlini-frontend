/* eslint-disable import/default */
import Vue from 'vue';

import { sync } from 'vuex-router-sync';

import App from 'components/App';
import router from 'root/router';
import store from 'root/store';
import plugins from 'root/plugins'; // eslint-disable-line no-unused-vars

const unsync = sync(store, router); // eslint-disable-line no-unused-vars

const app = new Vue({
  router,
  store,
  ...App,
});

export { app, router, store };
/* eslint-enable import/default */
