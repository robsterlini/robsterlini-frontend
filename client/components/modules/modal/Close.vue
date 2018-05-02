<template>
  <button
    class="link modal__close"
    @click="closeModal"
  >
    <span class="visuallyhidden">Close modal</span>
    <module-icon icon="close" />
  </button>
</template>

<script>
// Vuex
import { mapActions } from 'vuex';

// Modules
import ModuleIcon from 'modules/Icon';

// Export
export default {
  name: `module-modal-close`,

  // Components
  components: {
    ModuleIcon,
  },

  // Methods
  methods: {
    ...mapActions(`modals`, [
      `closeModal`,
    ]),
  },
};
</script>
