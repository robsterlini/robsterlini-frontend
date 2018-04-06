'use strict';

export default {
  namespaced: true,
  state: {
    page: {
      classes: ``,
      name: ``,
      transition: ``,
      params: {},
    },
    dynamic: {},
    state: {
      init: false,
      loading: false,
      loaded: false,
      intro: false,
    },
    transition: {
      main: ``,
      styleguideContents: false,
    },
  },
  getters: {
    appState: (state) => state.state,
  },
  mutations: {
    setPage(state, payload) {
      state.page = payload;
    },
    setDynamic(state, payload) {
      let obj = {};

      if (typeof payload === `string`) {
        obj[payload] = true;
      } else {
        obj = payload;
      }

      Object.assign(state.dynamic, obj);
    },
    setState(state, payload) {
      let obj = {};

      if (typeof payload === `string`) {
        obj[payload] = true;
      } else {
        obj = payload;
      }

      Object.assign(state.state, obj);
    },
    setTransition(state, payload) {
      let obj = {};

      if (typeof payload === `string`) {
        obj[payload] = true;
      } else {
        obj = payload;
      }

      Object.assign(state.transition, obj);
    },
  },
  actions: {
    init(context) {
      context.commit(`setState`, `init`);
      context.commit(`setState`, {
        loading: false,
      });
      setTimeout(() => {
        context.commit(`setState`, `loaded`);
        context.commit(`setState`, {
          intro: false,
        });
      }, 500);
    },
    updatePage(context) {
      const route = context.rootState.route;
      const classes = `page--${route.name}`;

      context.commit(`setPage`, {
        classes,
        name: route.name,
        params: route.params,
        transition: route.meta.loader || ``,
      });
    },
    openLoader(context, payload = {}) {
      if (payload.isIntro) {
        context.commit(`setState`, `intro`); // TODO: Make action and import
      }
      context.commit(`setState`, `loading`); // TODO: Make action and import

      setTimeout(() => {
        context.commit(`setState`, { // TODO: Make action and import
          loaded: false,
        });
      }, 500);
    },
    closeLoader(context) {
      context.commit(`setState`, { // TODO: Make action and import
        loading: false,
      });

      window.scrollTo(0, 0); // TODO: Fix on back button

      setTimeout(() => {
        context.commit(`setState`, `loaded`); // TODO: Make action and import
      }, 500);
    },
  },
};
