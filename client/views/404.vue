<template>
  <main class="main main--not-found">
    <div class="group mta mba">
      <h1 class="h1 mt mb">Well, bollocks!</h1>
      <p class="large">It looks like you’re lost…</p>
      <module-button
        link="home"
      >
        Back to the start?
      </module-button>
    </div>
  </main>
</template>

<script>
// Models
import meta from 'models/meta';

// Services
import { createMeta } from 'services/meta';

// Modules
import ModuleButton from 'modules/Button';

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
    ModuleButton,
  },
};
</script>
