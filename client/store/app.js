'use strict';

// Vue
import Vue from 'vue';

// Config
import config from 'models/global/config';

// State
const state =  {
  page: {
    classes: ``,
    name: ``,
    params: {},
    meta: {},
    query: {},
  },
  state: {
    init: false,
    loading: false,
    loaded: false,
    intro: false,
  },
};

// Getters
const getters = {
  appState: state => state.state,
  appPage: state => state.page,
};

// Mutations
const mutations = {
  SET_PAGE (state, page) {
    state.page = page;
  },
  SET_STATE (state, key = ``) {
    if (!key) return;

    Vue.set(state.state, key, true);
  },
  UNSET_STATE (state, key = ``) {
    if (!key) return;

    Vue.set(state.state, key, false);
  },
};

// Actions
const actions = {
  init({ commit }) {
    commit(`SET_STATE`, `init`);
    commit(`UNSET_STATE`, `loading`);

    setTimeout(() => {
      commit(`SET_STATE`, `loaded`);
      commit(`UNSET_STATE`, `intro`);
    }, config.transitionDuration);
  },

  updatePage({ commit, rootState }) {
    const route = rootState.route;
    const classes = `page--${route.name}`;

    commit(`SET_PAGE`, {
      name: route.name,
      params: route.params,
      meta: route.meta,
      query: route.query,
      classes,
    });
  },

  openLoader({ commit }, payload = {}) {
    if (payload.isIntro) {
      commit(`SET_STATE`, `intro`);
    }
    commit(`SET_STATE`, `loading`);

    setTimeout(() => {
      commit(`UNSET_STATE`, `loaded`);
    }, config.transitionDuration);
  },

  closeLoader({ commit }) {
    commit(`UNSET_STATE`, `loading`);

    window.scrollTo(0, 0); // TODO: Fix on back button

    setTimeout(() => {
      commit(`SET_STATE`, `loaded`);
    }, config.transitionDuration);
  },
};

// Export
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
