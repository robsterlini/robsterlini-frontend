<template>
  <main class="main main--not-found">
    <h1>Page not found</h1>
  </main>
</template>

<script>
// Models
import meta from 'models/global/meta';

// Services
import { createMeta } from 'services/meta';

// Modules

// Export
export default {
  name: `view-not-found`,

  // Meta data
  metaInfo: {
    title: meta.notFound.title,
    meta: createMeta(meta.notFound.meta),
  },

  // Components
  components: {
  },
};
</script>
