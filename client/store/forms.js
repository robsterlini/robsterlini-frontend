// Vue
import Vue from 'vue';

// Services
/* eslint-disable import/no-extraneous-dependencies */
import { arrayLoop } from 'services/array';
import { setValidation } from 'services/forms';

// Export
export default {
  namespaced: true,
  state: {},
  getters: {
    getForm: (state) => (slug) => state[slug],
    getModel: (state) => (slug) => {
      const model = {};
      const form = state[slug] || {};

      arrayLoop(form.model || {}, (i, v) => {
        let val = v;
        if (v === `_NULL`) {
          val = null;
        } else if (v === `0`) {
          val = 0;
        }
        model[i] = val;
      });

      return model;
    },
    getStatus: (state) => (slug) => (state[slug] || {}).status || {},
    getValidations: (state) => (slug) => (state[slug] || {}).validations,
    getServerErrors: (state) => (slug) => (state[slug] || {}).serverErrors,
  },
  mutations: {
    createFormObject (state, payload) {
      Vue.set(state, payload.id, payload.obj);
    },
    updateValue (state, payload) {
      Vue.set(state[payload.form].model, payload.field, payload.value);
    },
    updateValid (state, payload) {
      Vue.set (state[payload.form], `valid`, payload.value);
    },
    toggleValidation (state, payload) {
      Vue.set(state[payload.form].validations, payload.key, setValidation(payload.key, payload.value ? payload.field : {}));
    },
    updateFieldValidation (state, payload) {
      Vue.set(state[payload.form].validations, payload.key, setValidation(payload.key, payload.field));
    },
    updateStatus (state, payload) {
      Vue.set(state[payload.form].status, payload.status, payload.value);
    },
    updateServerError (state, payload) {
      // Set a field-specific or global server error
      Vue.set(state[payload.form].serverErrors, payload.field || `_global`, payload.error || ``);
      // If unsetting it, also unset the global error message to
      if (!payload.error) {
        Vue.set(state[payload.form].serverErrors, `_global`, ``);
      }
    },
    resetForm (state, payload) {
      if (state[payload]) {
        Vue.set(state, payload, null);
      }
    },
  },
  actions: {
    init ({ commit, state }, payload) {
      const id = payload.id;
      const fields = payload.fields;

      if (state[id] && state[id] !== null) {
        console.warn(`Form already initialised`);
        return false;
      }

      const form = {
        id,
        obj: {
          model: {},
          validations: {},
          valid: {},
          status: {
            loading: false,
            success: false,
          },
          serverErrors: {
            _global: ``,
          },
        },
      };

      arrayLoop(fields, (key, field) => {
        const isConditional = field.conditional;
        if (field.value === ``) {
          form.obj.model[key] = isConditional ? null : ``;
        } else if (field.type === `select`) {
          form.obj.model[key] = field.value && !isConditional ? field.value : `_NULL`;
        } else if (field.type === `checkbox`) {
          form.obj.model[key] = field.value && !isConditional ? field.value : [];
        } else {
          form.obj.model[key] = isConditional ? null : field.value;
        }
        form.obj.validations[key] = field.conditional ? {} : setValidation(key, field);
      });

      commit(`createFormObject`, form);
    },
    event ({ commit, dispatch, state }, payload = {}) {
      if (payload.event === `input`) {
        dispatch(`updateValue`, payload);
        const errors = state[payload.form].serverErrors;
        const fieldError = !!errors[payload.field];
        const globalError = !!errors._global;

        if ((fieldError || globalError) && payload.change === false) {
          dispatch(`event`, {
            form: payload.form,
            field: payload.field,
            event: `serverError`,
            error: ``,
          });
        }

      } else if (payload.event === `serverError`) {

        commit(`updateServerError`, {
          form: payload.form,
          field: payload.field || false,
          error: payload.error,
        });
      } else {
        console.warn(`No form event type matched.`);
      }
    },
    updateValue({ commit }, payload) {
      commit(`updateValue`, {
        form: payload.form,
        field: payload.field,
        value: payload.value,
      });
    },
    setLoading({ commit }, payload) {
      commit(`updateStatus`, {
        form: payload,
        status: `loading`,
        value: true,
      });
    },
    unsetLoading({ commit }, payload) {
      commit(`updateStatus`, {
        form: payload,
        status: `loading`,
        value: false,
      });
    },
    setSuccess({ commit }, payload) {
      commit(`updateStatus`, {
        form: payload,
        status: `success`,
        value: true,
      });
    },
  },
};
