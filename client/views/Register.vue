<template>
  <main class="main">
    <ui-auth
      title="Register"
      slug="register"
      submit="Create Account"
      action="requestRegisterUser"
    >
      <span slot="link">Already have an account? <router-link :to="{ name: 'login' }">Log in</router-link></span>
    </ui-auth>
  </main>
</template>

<script>
// Ui
import UiAuth from 'ui/Auth';

// Export
export default {
  name: `view-register`,

  // Components
  components: {
    UiAuth,
  },
};
</script>
