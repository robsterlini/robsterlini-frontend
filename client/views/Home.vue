<template>
  <main class="main main--home">
    <div class="group">
      <h1 class="h1">Hello World!</h1>
      <p class="p"><router-link :to="{ name: `vue-init` }">Vue Init features</router-link></p>
    </div>
  </main>
</template>

<script>
// Models
import meta from 'models/meta';

// Services
import { createMeta } from 'services/meta';

// Export
export default {
  name: `view-home`,

  // Meta data
  metaInfo: {
    title: meta.home.title,
    meta: createMeta(meta.home.meta),
  },
};
</script>
