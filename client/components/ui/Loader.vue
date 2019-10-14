<template>
  <div
    :class="[
      'loader',
      {
        'loader--intro': appState.intro,
        'is--intro': !appState.init,
        'is--active': appState.loading && appState.init,
      }
    ]"
  >
    <div class="loader__layer" />
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Export
export default {
  name: `ui-loader`,

  // Data
  computed: {
    ...mapGetters(`app`, [
      `appState`,
    ]),
  },
};
</script>
