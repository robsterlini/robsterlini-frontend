<template>
  <module-link
    v-if="link"

    class="logo logo--link"

    :link="link"
    :no-underline="true"
  >
    <span class="h3 mt0 mb0">Rob Sterlini</span>
  </module-link>
  <span
    v-else
    class="logo h3"
  >
    Rob Sterlini
  </span>
</template>

<script>
// Modules
import ModuleLink from 'modules/Link';

// Export
export default {
  name: `module-logo`,

  // Components
  components: {
    ModuleLink,
  },

  // Props
  props: {
    link: String,
  },

  // Data
  computed: {
    label() {
      return config.name;
    },
  },
};
</script>
