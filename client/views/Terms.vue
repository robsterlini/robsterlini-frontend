<template>
  <main class="main main--terms">
    <component
      :is="termsContent"
      class="group group--first-last typeset typeset--terms links"
    />
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
