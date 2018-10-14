<template>
  <main class="main main--error">
    <div class="group mta mba">
      <h1 class="h1 mt mb">{{ content.title }}</h1>
      <p class="large">{{ content.copy }}</p>
      <module-button class="dt" link="home">Back to the start?</module-button>
      <module-button class="dt mt0 mb0" link="contact">Looking for something in particular?</module-button>
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
  metaInfo() {
    const errorMeta = meta[this.$route.name];

    return {
      title: errorMeta.title,
      meta: createMeta(errorMeta.meta),
    };
  },

  // Components
  components: {
    ModuleButton,
  },

  // Data
  computed: {
    content() {
      const content = {
        notFound: {
          title: `Well, bollocks!`,
          copy: `It looks like you’re\xa0lost…`,
        },
        gone: {
          title: `Reshuffled`,
          copy: `This site has been through many changes, and along the way this page has been\xa0removed.`,
        },
      };

      return content[this.$route.name];
    },
  },
};
</script>
