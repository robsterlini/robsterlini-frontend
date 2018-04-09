<template>
  <form
    :class="[
      'form',
    ]"
    @submit.prevent="submitForm"
  >
    <module-form-fieldset
      v-for="(field, key) in fields"
      :key="key"
      :form-id="formId"
      :field="field"
      :field-id="key"
      :server-error="serverErrors[key]"
      @fieldTouch="onFieldTouch(key)"
      @fieldReset="onFieldReset(key)"
    />

    <p v-if="serverErrors._global" :class="`form__errors`">{{ serverErrors._global }}</p>

    <div v-if="!noSubmit" :class="[hideSubmit ? 'visuallyhidden' : 'form__submit']">
      <module-button
        :class="[
          {
            'btn--hidden': hideSubmit,
          }
        ]"

        :button="button || ''"
        :size="buttonSize || ''"
        :disabled="$v.$invalid || invalid"
        :loading="status.loading"
        :success="status.success"
        type="submit"
      >
        {{ submit || `Submit` }}
      </module-button>
    </div>

  </form>
</template>

<script>
// Vuex
import { mapActions, mapGetters, mapMutations } from 'vuex';
// Services
import { arrayLoop } from 'services/array';
// Modules
import ModuleButton from 'modules/Button';
import ModuleFormFieldset from 'modules/form/Fieldset';
// Export
export default {
  name: `module-form`,
  // Components
  components: {
    ModuleButton,
    ModuleFormFieldset,
  },
  // Props
  props: {
    fields: Object,
    submit: String,
    hideSubmit: Boolean,
    noSubmit: Boolean,
    button: {
      type: String,
      default: `light`,
    },
    buttonSize: {
      type: String,
      default: `xs`,
    },
    formId: String,
    action: Function,
    success: Function,
    fail: Function,
    doNotReset: Boolean,
  },
  // Data
  computed: {
    ...mapGetters(`forms`, [
      `getModel`,
      `getStatus`,
      `getValidations`,
      `getServerErrors`,
    ]),
    model() {
      return this.getModel(this.formId);
    },
    status() {
      return this.getStatus(this.formId);
    },
    validations() {
      return this.getValidations(this.formId);
    },
    serverErrors() {
      return this.getServerErrors(this.formId);
    },
    invalid() {
      let invalid = false;
      // TODO: Replace with Array prototype
      Object.keys(this.serverErrors).forEach(key => {
        if (this.serverErrors[key]) {
          invalid = true;
        }
      });
      return invalid;
    },
  },
  watch: {
    fields: {
      handler(fields) {
        arrayLoop(fields, (key, field) => {
          this.$store.commit(`forms/updateFieldValidation`, { // TODO: mapMutations
            form: this.formId,
            key,
            field,
          });
        });
      },
      deep: true,
    },
  },
  // Methods
  methods: {
    ...mapActions(`forms`, {
      'formEvent': `event`,
      'init': `init`,
      'onSubmit': `onSubmit`,
      'setLoading': `setLoading`,
      'setSuccess': `setSuccess`,
      'unsetLoading': `unsetLoading`,
    }),
    ...mapMutations(`forms`, [
      `updateValid`,
    ]),
    onFieldTouch(id) {
      this.$v.model[id].$touch();
    },
    onFieldReset(id) {
      this.$v.model[id].$reset();
    },
    submitForm() {
      if (this.noSubmit) {
        return false;
      }
      this.setLoading(this.formId);
      const settle = () => {
        this.unsetLoading(this.formId);
      };
      const fail = (data = {}) => {
        const errors = data.errors || [];
        for (const error of errors) {
          this.formEvent({
            event: `serverError`,
            form: this.formId,
            field: error.field,
            error: error.message,
          });
        }
        this.fail ? (this.fail(errors) || null) : null; // eslint-disable-line no-unused-expressions
      };
      const success = (data) => {
        this.success ? (this.success(data) || null) : null;  // eslint-disable-line no-unused-expressions
        this.setSuccess(this.formId);
      };
      if (typeof(this.action) !== `function`) {
        return false;
      }

      this.action()
        .then((response = {}) => {
          settle();
          if (response.status > 300) {
            fail(response.data);
          } else {
            success(response.data);
          }
        })
        .catch((response = {}) => {
          settle();
          fail(response.data);
        });
    },
  },
  // Lifecycle
  created() {
    this.init({
      id: this.formId,
      fields: this.fields,
    });
    this.$watch(`$v`, {
      handler(val) {
        this.updateValid({
          form: this.formId,
          value: val.model,
        });
      },
      deep: true,
    });
  },
  beforeMount() {
    this.updateValid({
      form: this.formId,
      value: this.$v.model,
    });
  },
  destroyed() {
    if (this.doNotReset !== true) {
      setTimeout(() => {
        this.$store.commit(`forms/resetForm`, this.formId);
      }, 500);
    }
  },

  // Validations
  validations() {
    return {
      model: this.validations,
    };
  },
};
</script>
