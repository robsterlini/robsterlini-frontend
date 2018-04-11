"use strict";

// Vue
import Vue from 'vue';
import router from 'router';

// API
import { HTTP } from 'api/http';
import {
  requestLogin,
  requestCurrentUser,
  requestRegisterUser,
  requestResetPassword,
  requestConfirmPassword,
} from 'api/auth';

// State
const state = {
  authToken: ``,
  user: {},
  redirect: ``,
};

// Getters
const getters = {
  isAuthenticated: state => !!state.authToken,
  user: state => state.user,
};

// Mutations
const mutations = {
  SET_TOKEN (state, payload) {
    state.authToken = payload;
    localStorage.setItem(`auth_token`, payload);

    if (payload) {
      HTTP.defaults.headers.common.Authorization = `Token ${payload}`;
    } else {
      delete HTTP.defaults.headers.common.Authorization;
    }
  },
  SET_USER (state, user) {
    Vue.set(state, `user`, {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
  },
  RESET_USER (state) {
    Vue.set(state, `user`, {});
  },
  SET_REDIRECT (state, payload) {
    Vue.set(state, `redirect`, payload || ``);
  },
};

// Actions
const actions = {

  requestLogout({ commit, dispatch }) {
    commit(`SET_TOKEN`, ``);
    dispatch(`resetUser`);
    setTimeout(() => {
      router.push({ name: `Home` });
    }, 500);
  },

  requestLogin({ dispatch, state }, model) {
    return new Promise((resolve, reject) => {
      requestLogin(model)
        .then(response => {
          dispatch(`updateUser`, response.data || {});
          resolve(response);
          const path = state.redirect;
          router.push(path ? { path } : { name: `Home` });
          dispatch(`storeRedirect`, ``);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  requestResetPassword(context, model) {
    return new Promise((resolve, reject) => {
      requestResetPassword(model)
        .then(response => resolve(response))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  requestConfirmPassword({ rootState }, model) {
    return new Promise((resolve, reject) => {
      const token = rootState.app.page.params.token;

      if (!token) {
        reject({
          errors: `No token`,
        });
      } else {
        model.token = token;
      }

      requestConfirmPassword(model)
        .then(response => resolve(response))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  requestCurrentUser({ state, commit, dispatch }, { auth_token, redirect }) {
    if (!state.auth_token) {
      commit(`SET_TOKEN`, auth_token);

      if (redirect) {
        const path = state.redirect;
        router.push(path ? { path } : { name: `Home` });
      }
    }
    return new Promise((resolve, reject) => {
      requestCurrentUser()
        .then(response => {
          dispatch(`updateUser`, response.data || {});
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  requestRegisterUser({ dispatch }, model) {
    return new Promise((resolve, reject) => {
      requestRegisterUser(model)
        .then(response => {
          dispatch(`updateUser`, response.data || {});
          router.push({
            name: `home`,
          });
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  updateUser({ commit }, data) {
    if (data.auth_token) {
      commit(`SET_TOKEN`, data.auth_token);
    }
    commit(`SET_USER`, data);
  },

  resetUser({ commit }) {
    commit(`RESET_USER`);
  },

  storeRedirect({ commit }, path) {
    commit(`SET_REDIRECT`, path);
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
