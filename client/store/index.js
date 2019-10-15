import Vue from 'vue';
import Vuex from 'vuex';

import app from 'store/app';
import meta from 'store/meta';

Vue.use(Vuex);

const store = new Vuex.Store({ // eslint-disable-line import/no-named-as-default-member
  modules: {
    app,
    meta,
  },
});

export default store;
