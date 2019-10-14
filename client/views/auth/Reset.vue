<template>
  <main class="main">
    <ui-auth
      :success-copy="`Reset instructions were sent to <strong>${model.email || `the email you provided`}</strong>.`"

      title="Forgotten Password"
      copy="Enter the address associated with your account. We’ll send you instructions on how to reset your password."
      slug="reset"
    >
      <span slot="link">Remembered your password? <router-link :to="{ name: 'login' }">Log in</router-link></span>
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
      `getModel`,
    ]),
    model() {
      return this.getModel(`reset`);
    },
  },
};
</script>
