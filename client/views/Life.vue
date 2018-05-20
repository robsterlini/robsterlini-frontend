<template>
  <main class="main main--life">
    <module-bg
      :image="images.hero"
    />
    <div class="group group--thin">
      <h1 class="h1 mt0">Life</h1>
      <p class="large"><module-link link="work">Work</module-link> should always be balanced by life!</p>

    </div>
  </main>
</template>

<script>
// Models
import meta from 'models/meta';

// Services
import { createMeta } from 'services/meta';

// Modules
import ModuleBg from 'modules/Bg';
import ModuleLink from 'modules/Link';

// Images
const images = {
  hero: require(`images/hero/life.jpg`),
};

// Export
export default {
  name: `view-terms`,

  // Meta data
  metaInfo: {
    title: meta.terms.title,
    meta: createMeta(meta.terms.meta),
  },

  // Components
  components: {
    ModuleBg,
    ModuleLink,
  },

  // Data
  data() {
    return {
      images,
    };
  },
};
</script>
