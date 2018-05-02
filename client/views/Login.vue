<template>
  <main class="main">
    <ui-auth
      title="Log In"
      slug="login"
    >
      <span slot="link">Don’t have an account? <router-link :to="{ name: 'register' }">Register</router-link></span>
    </ui-auth>
  </main>
</template>

<script>
// Ui
import UiAuth from 'ui/Auth';

// Export
export default {
  name: `view-login`,

  // Components
  components: {
    UiAuth,
  },
};
</script>
