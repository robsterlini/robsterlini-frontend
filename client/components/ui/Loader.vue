<template>
  <div
    :class="[
      'loader',
      `loader--${custom}`,
      {
        'loader--intro': isIntro,
        'is--active': active,
      }
    ]"
  >
    <div class="loader__layer"/>
    <module-logo/>
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Modules
import ModuleLogo from 'modules/Logo';

// Export
export default {
  name: `ui-loader`,

  // Components
  components: {
    ModuleLogo,
  },

  // Data
  computed: {
    ...mapGetters(`app`, [
      `appState`,
    ]),
    active() {
      return this.appState.loading;
    },
    isIntro() {
      return this.appState.intro;
    },
    custom() {
      return this.$store.state.app.transition.main || `default`;
    },
  },
};
</script>
