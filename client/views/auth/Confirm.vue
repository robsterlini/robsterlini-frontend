<template>
  <main class="main">
    <ui-auth
      title="Reset Password"
      copy="Enter your new password."
      success-copy="Password reset!"
      slug="confirm"
    >
      <span slot="link">{{ status.success ? `` : `Remembered your password?` }} <router-link :to="{ name: 'Login' }">Log in</router-link></span>
    </ui-auth>
  </main>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Ui
import UiAuth from 'ui/Auth';

// Export
export default {
  name: `view-register`,

  // Components
  components: {
    UiAuth,
  },

  // Data
  computed: {
    ...mapGetters(`forms`, [
      `getStatus`,
    ]),
    status() {
      return this.getStatus(`confirm`);
    },
  },
};
</script>
