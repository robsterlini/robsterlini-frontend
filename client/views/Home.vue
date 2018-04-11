<template>
  <main class="main main--home">
    <module-block :grow="true" block="dark">
      <div class="group group--first-last">
        <h1 class="h1">Hello World!</h1>

        <h2 class="h2">Auth</h2>
        <ul>
          <li v-for="(auth, name) in authFlow" :key="name">
            <router-link :to="{ name }">{{ auth }}</router-link>
          </li>
        </ul>

        <h2 class="h2">Helpers</h2>
        <h3 class="h3">Plural <code>toPlural</code></h3>
        <p>{{ countStr }}</p>
        <module-button
          button="dark"
          level="tertiary"

          @click.native="increaseCounter"
        >
          Increase counter
        </module-button>
      </div>
    </module-block>
  </main>
</template>

<script>
// Models
import meta from 'models/global/meta';

// Services
import { createMeta } from 'services/meta';
import { toPlural } from 'services/string';

// Modules
import ModuleBlock from 'modules/Block';
import ModuleButton from 'modules/Button';

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
    ModuleButton,
  },

  // Data
  data () {
    return {
      count: 0,
      authFlow: {
        login: `Log In`,
        logout: `Log Out`,
        register: `Register`,
        authReset: `Reset`,
      },
    };
  },
  computed: {
    countStr() {
      const count = this.count;
      return `${count} ${toPlural(count, `item`)}, ${count} ${toPlural(count, `country`, `countries`)}`;
    },
  },

  // Methods
  methods: {
    increaseCounter() {
      this.count++;
    },
  },
};
</script>
