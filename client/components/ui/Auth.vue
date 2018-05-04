<template>
  <div
    :class="[
      `auth`,
      `auth--${slug}`,
      `group`,
      `group--first-last`,
    ]"
  >

    <tag
      v-if="titleSet !== null"
      :is="modal ? `h2` : `h1`"
      :class="[
        `mt0`,
        modal ? `h3` : `h2`,
        {
          'mt0': modal,
        }
      ]"
    >{{ titleSet }}</tag>
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

        :form-id="formId"
        :fields="fields[slug]"

        :action="requestAction"
        :success="success"
        :fail="fail"
        :submit="submitSet"

        button-size="m"
        button="primary"
      />
    </div>

    <p v-if="hasFooter" class="auth__footer small tc">
      <slot name="link" />
    </p>
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Models
import { _forms, login, register, reset, confirm } from 'models/auth';

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
    modal: Boolean,
    slug: {
      type: String,
      required: true,
    },
    submit: String,
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
    formId() {
      return `${this.slug}${this.modal ? `-modal` : ``}`;
    },
    model() {
      return this.getModel(this.formId);
    },
    status() {
      return this.getStatus(this.formId);
    },
    action() {
      return _forms.actions[this.slug];
    },
    submitSet() {
      return this.submit || _forms.submit[this.slug] || ``;
    },
    titleSet() {
      if (typeof this.title !== `undefined`) {
        return this.title || null;
      }
      return _forms.title[this.slug] || null;
    },
    hasFooter() {
      return !!this.$slots.link;
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
