<template>
      <!-- `loader--${appPage.name}`, -->
  <div
    :class="[
      'loader',
      loaderClass,
      {
        'loader--intro': appState.intro,
        'is--intro': !appState.init,
        'is--active': appState.loading && appState.init,
      }
    ]"
  >
    <div class="loader__layer loader__layer--bg" />
    <div class="loader__layer loader__layer--accent" />
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Export
export default {
  name: `ui-loader`,

  // Data
  data() {
    return {
      isIntro: true,
    };
  },
  computed: {
    ...mapGetters(`app`, [
      `appState`,
      `appPage`,
    ]),
    loaderClass() {
      // return `!appState.init ? `loader--${$route.name}` : ``,`
      if (this.isIntro) return ``;

      return `loader--${this.$route.name}`;
    },
  },
  watch: {
    'appState.init': {
      handler(change) {
        console.log('CHANGE', change)
        setTimeout(() => {
          this.isIntro = false;
        }, 300);
      },
    },
  },
};
</script>
