<template>
  <main class="main main--home">
    <module-block :grow="true" block="dark">
      <div class="group group--first-last">
        <h1 class="h1">Hello World!</h1>

        <h2 class="h2">Auth</h2>
        <ul>
          <li><router-link :to="{ name: `login` }">Log in</router-link></li>
        </ul>
      </div>
    </module-block>
  </main>
</template>

<script>
// Models
import meta from 'models/global/meta';

// Services
import { createMeta } from 'services/meta';

// Modules
import ModuleBlock from 'modules/Block';

// Export
export default {
  name: `home`,

  // Meta data
  metaInfo: {
    title: meta.home.title,
    meta: createMeta(meta.home.meta),
  },

  // Components
  components: {
    ModuleBlock,
  },

  // Data
  data () {
    return {

    };
  },

  // Methods
  methods: {

  },
};
</script>
