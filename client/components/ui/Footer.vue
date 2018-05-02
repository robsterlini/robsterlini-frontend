<template>
  <footer class="block--accent footer">
    <div class="group">
      &copy; Copyright {{ new Date().getFullYear() }} • <router-link :to="{ name: `terms` }">Terms</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: `ui-footer`,
};
</script>
