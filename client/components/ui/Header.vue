<template>
  <header
    :class="[
      'header',
      {
        'header--hidden': appPage.meta.noFooter,
        'header--scrolled': appScrollY > 0,
      },
    ]"
  >
    <span class="header__bg" />
    <div class="group">
      <module-logo
        class="header__logo"
        link="home"
      />

      <ui-navigation/>
    </div>

  </header>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Modules
import ModuleLogo from 'modules/Logo';

// Ui
import UiNavigation from 'ui/Navigation';

// Export
export default {
  name: `ui-header`,

  // Components
  components: {
    ModuleLogo,
    UiNavigation,
  },

  // Data
  computed: {
    ...mapGetters(`app`, [
      `appPage`,
      `appScrollY`,
    ]),
  },
};
</script>
