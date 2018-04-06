<template>
  <transition-expand-height>
    <ul class="form__errors errors" v-show="show">
      <li class="errors__item">{{ serverError || error }}</li>
    </ul>
  </transition-expand-height>
</template>

<script>
// Services
import { arrayLoop } from 'services/array';

// Transitions
import TransitionExpandHeight from 'transitions/ExpandHeight';

// Export
export default {
  name: `module-form-errors`,

  // Components
  components: {
    TransitionExpandHeight,
  },

  // Props
  props: {
    serverError: String,
    errors: Object,
    label: {
      type: String,
      default: `This field`,
    },
  },

  // Data
  data() {
    return {
      hasErrors: false,
      error: `${this.label} is invalid`,
    };
  },
  computed: {
    show() {
      return this.serverError || this.hasErrors;
    },
  },
  watch: {
    errors: {
      handler(errors) {
        const label = this.label;
        const params = errors.$params || {};

        const min = params.min || 0;
        const max = params.max || 0;
        const minLength = (params.minLength || {}).min || 0;
        const maxLength = (params.maxLength || {}).max || 0;

        const map = {
          required: `Required`,
          url: `Invalid URL`,
          email: `Invalid email`,
          min: `${min} min.`,
          minLength: `${minLength} character(s) min.`,
          max: `${max} max.`,
          maxLength: `${maxLength} character(s) max.`,
        };

        let error = ``;

        arrayLoop(map, (key, val) => {
          if (errors[key] === false && !error) {
            error = val;
          }
        });

        if (errors.$error) {
          this.error = error || `${label} is invalid`;
          this.hasErrors = true;
        } else {
          this.hasErrors = false;
        }
      },
      deep: true,
    },
  },
};
</script>
