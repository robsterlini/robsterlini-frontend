<template>
  <main class="main">
    <p>Successfully logged out</p>
  </main>
</template>

<script>
// Vuex
import { mapActions } from 'vuex';

// Export
export default {
  name: `view-logout`,

  // Methods
  methods: {
    ...mapActions(`auth`, [
      `requestLogout`,
    ]),
  },

  // Lifecycle
  created() {
    this.requestLogout();
  },
};
</script>
