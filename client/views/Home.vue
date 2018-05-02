<template>
  <main class="main main--home">
    <module-block :grow="true" block="dark">
      <div class="group group--first-last">
        <h1 class="h1 mt0">Hello World!</h1>

        <h2 class="h2">Auth</h2>
        <p class="p">Some links will not work when authed, this is deliberate.</p>
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

        <h3 class="h3">Modals</h3>

        <module-button
          button="dark"
          level="tertiary"
          @click.native="openModal(`example-modal`)"
        >
          Open Modal (<code>example-modal</code>)
        </module-button>

        <module-button
          button="dark"
          level="tertiary"
          @click.native="openModal(`example-modal-2`)"
        >
          Open Modal (<code>example-modal-2</code>)
        </module-button>

      </div>

    </module-block>

    <module-modal
      id="example-modal"
    >
      <div slot="header">
        Header content
      </div>
      <div slot="footer">
        Footer content
      </div>

      <p>Modal content within the default slot</p>

      <module-button
        button="light"
        level="tertiary"
        @click.native="openModal(`example-modal-2`)"
      >
        Open other modal
      </module-button>
    </module-modal>

    <module-modal
      id="example-modal-2"
    >
      <p class="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies euismod neque, et suscipit turpis. Ut blandit turpis a nibh molestie, fringilla pharetra lorem auctor. Phasellus facilisis fringilla rhoncus. Cras maximus pretium vestibulum. Mauris nec tellus convallis, semper est non, feugiat elit. Nam eu ex in lorem suscipit placerat id gravida sem. Donec dignissim urna luctus, sagittis urna id, imperdiet magna.</p>

      <p class="p">Etiam quis magna a erat vehicula vulputate nec at mauris. Phasellus viverra ut tellus at faucibus. Pellentesque in dictum magna. Phasellus et nulla bibendum, pellentesque felis sit amet, faucibus quam. In pharetra elit vel tempus pulvinar. Etiam molestie ullamcorper nisl vitae tristique. Donec tristique ultricies sem, quis accumsan tortor congue sed. Duis eu ante quis mi posuere porta non blandit massa.</p>
    </module-modal>
  </main>
</template>

<script>
// Vuex
import { mapActions } from 'vuex';

// Models
import meta from 'models/global/meta';

// Services
import { createMeta } from 'services/meta';
import { toPlural } from 'services/string';

// Modules
import ModuleBlock from 'modules/Block';
import ModuleButton from 'modules/Button';
import ModuleModal from 'modules/Modal';

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
    ModuleModal,
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
    ...mapActions(`modals`, [
      `openModal`,
    ]),
    increaseCounter() {
      this.count++;
    },
  },
};
</script>
