'use strict';

// Vue
import Vue from 'vue';
import router from 'router';

// Services
import { arrayLoop } from 'services/array';

// State
const state = {
  modals: {},
};

// Getters
const getters = {
  modalActive: state => {
    let active = ``;

    arrayLoop(state.modals, (id, modal) => {
      if (modal.active) {
        active = id;
      }
    });

    return active;
  },
};

// Mutations
const mutations = {
  CREATE_MODAL (state, { id, path }) {
    const modal = {
      active: false,
    };

    if (path) {
      modal.path = path;
    }
    Vue.set(state.modals, id, modal);
  },
  OPEN_MODAL (state, { id }) {
    if (!state.modals[id]) return;

    Vue.set(state.modals[id], `active`, true);
  },
  CLOSE_MODAL (state, { id }) {
    if (!state.modals[id]) return;

    Vue.set(state.modals[id], `active`, false);
  },
};

// Actions
const actions = {
  createModal({ commit, state }, modal) {
    const id = modal.id;

    if (!id) return;

    if (!state.modals[id]) {
      commit(`CREATE_MODAL`, modal);
    }
  },
  pushState(context, id = null) {
    const modal = state.modals[id] || {};
    let path = modal.path || false;

    if (path) {
      path = encodeURI((path.charAt(0) === `/`) ? path.substr(1) : path);
    }

    const currentRoute = {
      ...router.currentRoute,
    };

    if (id) {
      currentRoute.query[`modal${path ? `-path` : ``}`] = path || id;
    } else {
      currentRoute.query.modal = undefined;
      currentRoute.query[`modal-path`] = undefined;
    }

    const route = router.resolve(currentRoute);

    history.replaceState({}, ``, route.href);
  },
  openModal({ commit, dispatch, getters, state, rootGetters }, id) {

    if (!id) return;

    const modal = state.modals[id] || {};

    if (modal.path === router.currentRoute.path) return;

    // WHY: Force the path change on small screens or touch devices
    if (modal.path && (rootGetters[`app/viewportMobile`] || rootGetters[`app/touch`])) {
      router.push({
        path: modal.path,
      });

      return;
    }

    const active = getters.modalActive;
    let timeout = 0;

    if (active) {
      if (id === active) return;

      timeout = 300; // TODO: Var
      dispatch(`closeModal`, active);
    }

    setTimeout(() => {
      commit(`OPEN_MODAL`, {
        id,
      });

      dispatch(`pushState`, id);
    }, timeout);

  },
  closeModal({ commit, dispatch, getters }) {
    if (!getters.modalActive) return false;

    const id = getters.modalActive;

    commit(`CLOSE_MODAL`, {
      id,
    });

    dispatch(`pushState`);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
