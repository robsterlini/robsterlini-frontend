<template>
  <footer
    v-show="!appPage.meta.noFooter"
    class="block--accent footer"
  >
    <div class="group">
      <p class="small mt0 mb0">Built with <module-link link="https://fueled.com">Fueled</module-link>’s Vue Init, see the source on <module-link link="https://github.com/robsterlini/robsterlini-frontend">Github</module-link>.</p>
    </div>
  </footer>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Modules
import ModuleLink from 'modules/Link';

// Export
export default {
  name: `ui-footer`,

  // Components
  components: {
    ModuleLink,
  },

  // Data
  computed: {
    ...mapGetters(`app`, [
      `appPage`,
    ]),
  },
};
</script>
