<template>
  <div
    :class="[
      `auth`,
      `auth--${slug}`,
      `group`,
      `group--first-last`,
    ]"
  >

    <h1
      v-if="title"
      class="f-h-cond f-h-50 tc"
    >{{ title }}</h1>
    <p
      v-if="copy"
      class="p tc"
      v-html="successCopy && status.success ? successCopy : copy"
    />

    <div
      v-show="!successCopy || (successCopy && !status.success)"
    >
      <module-form
        :class="[
          `auth__form`,
          `auth__form--${slug}`,
        ]"

        :form-id="slug"
        :fields="fields[slug]"

        :action="requestAction"
        :success="success"
        :fail="fail"
        :submit="submit"

        button-size="l"
        button="secondary"
      />
    </div>

    <p class="auth__footer small tc">
      <slot name="link" />
    </p>
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Models
import { login, register, reset, confirm } from 'models/auth';

// Modules
import ModuleForm from 'modules/Form';
import ModuleLogo from 'modules/Logo';

// Export
export default {
  name: `ui-auth-login`,

  // Components
  components: {
    ModuleForm,
    ModuleLogo,
  },

  // Props
  props: {
    title: String,
    copy: String,
    successCopy: String,
    slug: {
      type: String,
      required: true,
    },
    submit: String,
    action: String,
    success: {
      type: Function,
      default() {
        return () => {}; // eslint-disable-line no-empty-function
      },
    },
    fail: {
      type: Function,
      default() {
        return () => {}; // eslint-disable-line no-empty-function
      },
    },
  },

  // Data
  data() {
    return {
      fields: {
        login,
        register,
        reset,
        confirm,
      },
    };
  },
  computed: {
    ...mapGetters(`forms`, [
      `getModel`,
      `getStatus`,
    ]),
    model() {
      return this.getModel(this.slug);
    },
    status() {
      return this.getStatus(this.slug);
    },
  },

  // Methods
  methods: {
    requestAction() {
      return this.$store.dispatch(`auth/${this.action}`, this.model);
    },
  },
};
</script>
