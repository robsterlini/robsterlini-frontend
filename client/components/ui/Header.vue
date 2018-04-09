<template>
  <header
    :class="[
      'header',
    ]"
  >

    <div class="group">
      <router-link :class="`header__logo`" :to="{ name: 'home' }">
        <module-logo/>
      </router-link>

      <ui-navigation/>
    </div>

  </header>
</template>

<script>
// Modules
import ModuleLogo from 'modules/Logo';

// Ui
import UiNavigation from 'ui/Navigation';

// Export
export default {
  name: `ui-header`,

  // Components
  components: {
    UiNavigation,
    ModuleLogo,
  },

  // Data
  computed: {
    page() {
      return this.$store.state.app.page;
    },
    loading() {
      return this.$store.state.app.state.loading;
    },
  },
};
</script>
