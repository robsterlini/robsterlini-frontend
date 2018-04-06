<template>
  <span
    :class="[
      'logo',
      color ? `logo--${color}` : ``,
    ]"
  >
    <span class="logo__inner">
      {{ labelSet }}
    </span>
  </span>
</template>

<script>
// Models
import config from 'models/global/config';

// Export
export default {
  name: `module-logo`,

  // Components
  components: {

  },

  // Props
  props: {
    color: String,
    label: String,
  },

  // Data
  computed: {
    labelSet() {
      return this.label || config.name;
    },
  },
};
</script>
