import Vue from 'vue';
import Vuex from 'vuex';

import appStore from 'store/app';
import formsStore from 'store/forms';
import metaStore from 'store/meta';
import authStore from 'store/auth';

Vue.use(Vuex);

const store = new Vuex.Store({ // eslint-disable-line import/no-named-as-default-member
  state: {},
  mutations: {},
  modules: {
    app: appStore,
    forms: formsStore,
    meta: metaStore,
    auth: authStore,
  },
});

export default store;
