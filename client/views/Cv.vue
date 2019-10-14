<template>
  <main class="main main--work">
    <div class="group">
      <h1 class="h1">Curriculum Vitae</h1>
      <p class="large">Lorem ipsum.</p>
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
  name: `view-terms`,

  // Meta data
  metaInfo: {
    title: meta.terms.title,
    meta: createMeta(meta.terms.meta),
  },
};
</script>
