'use strict';

// Vue
import Vue from 'vue';

// State
const state = {
  meta: [],
  title: ``,
};

// Getters
const getters = {
  metaTitle: state => state.title,
};

// Mutations
const mutations = {
  SET_META (state, meta) {
    Vue.set(state, `meta`, meta);
  },
  SET_TITLE (state, title) {
    state.title = title;
  },
};

// Actions
const actions = {
  updateMeta({ commit }, meta) {
    commit(`SET_META`, meta);
  },
  updateMetaTitle({ commit }, title) {
    commit(`SET_TITLE`, title);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
