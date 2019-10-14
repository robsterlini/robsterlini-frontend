'use strict';

// Config
import config from 'config';

// Vue
import Vue from 'vue';

// State
const state =  {
  env: config.env,
  page: {
    classes: ``,
    name: ``,
    params: {},
    meta: {},
    query: {},
  },
  state: {
    init: false,
    loading: true,
    loaded: false,
  },
  viewport: {
    height: null,
    width: null,
  },
  touch: null,
};

// Getters
const getters = {
  appEnv: state => state.env,
  appState: state => state.state,
  appPage: state => state.page,
  viewportHeight: state => state.viewport.height,
  viewportWidth: state => state.viewport.width,
  viewportMobile: state => state.viewport.width < 768,
  touch: state => state.touch === null ? null : !!state.touch,
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
  UPDATE_VIEWPORT (state, viewport) {
    state.viewport.height = viewport[0];
    state.viewport.width = viewport[1];
  },
  SET_TOUCH (state, touch) {
    state.touch = touch;
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

  updateViewport({ commit }) {
    clearTimeout(window.updateViewport);

    // WHY: Debounces the update to only fire after all has been resized
    window.updateViewport = setTimeout(() => {
      commit(`UPDATE_VIEWPORT`, [
        window.innerHeight,
        window.innerWidth,
      ]);
    }, 100);
  },

  setTouch({ commit }) {
    const isTouch = `ontouchstart` in window || navigator.maxTouchPoints; // WHY: https://stackoverflow.com/a/4819886/2599650

    commit(`SET_TOUCH`, isTouch);
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
