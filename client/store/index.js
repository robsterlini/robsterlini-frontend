import Vue from 'vue';
import Vuex from 'vuex';

import app from 'store/app';
import forms from 'store/forms';
import meta from 'store/meta';
import auth from 'store/auth';

Vue.use(Vuex);

const store = new Vuex.Store({ // eslint-disable-line import/no-named-as-default-member
  modules: {
    app,
    forms,
    meta,
    auth,
  },
});

export default store;
