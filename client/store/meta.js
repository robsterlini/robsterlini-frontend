'use strict';

const state = {
  separator: ` | `,
  root: `https://fueled.com`,
  meta: [],
  title: ``,
};

const getters = {
  separator: state => state.separator,
  metaTitle: state => state.title,
};

const mutations = {
  updateMeta(state, payload) {
    state.meta = payload;
  },
  updateTitle(state, payload) {
    state.title = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
