<template>
  <main class="main main--work">
    <div class="group">
      <h1 class="h1">Let’s Chat!</h1>
    </div>
  </main>
</template>

<script>
// Models
import meta from 'models/meta';
import termsContent from 'models/content/terms.md';

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

  // Data
  data() {
    return {
      termsContent,
    };
  },
};
</script>
