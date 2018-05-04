<template>
  <main class="main main--home">
    <module-block block="dark">
      <div class="group group--first-last">
        <h1 class="h1 mt0">Vue Init</h1>

        <p class="p">This is a page to demonstrate the features that are built into Vue Init.</p>
        <p v-if="$route.path === '/' && $route.name === 'vue-init'" class="p">The <code>/</code> route is currently set to <code>VueInit</code> (and the homepage can be found at <router-link :to="{ name: `home` }"><code>/home</code></router-link>, change <code>vue-init</code> and <code>home</code> in <code>router/index.js</code> when you start the project to build the homepage.</p>
        <p class="p">This page should be commented out (or removed entirely) of the final build (or at the start of a project if you are familiar with its functionality).</p>
      </div>
    </module-block>
    <module-block :grow="true" block="light">
      <div class="group group--first-last">
        <h2 class="h2 mt0">Features</h2>

        <h3 class="h3 mt0">Auth</h3>
        <p class="p">Some links will not work when authed, this is deliberate.</p>
        <ul>
          <li v-for="(auth, name) in authFlow" :key="name">
            <router-link :to="{ name }">{{ auth }}</router-link>
          </li>
        </ul>

        <h3 class="h3">Modules</h3>

        <h4 class="h4">Spinner</h4>

        <module-spinner
          :active="spinnerActive"
        />
        <module-button
          size="s"

          @click.native="spinnerActive = !spinnerActive"
        >
          Toggle spinner
        </module-button>

        <h4 class="h4">Buttons</h4>

        <template v-for="(button, index) in [`primary`, `secondary`, `tertiary`]">
          <div
            :class="[
              {
                'mt': index > 0,
              },
            ]"
            :key="`buttons-${button}`"
          >
            <template v-for="(sizeLabel, size) in { s: `Small`, m: `Medium`, l: `Large`, xl: `Disabled` }">
              <module-button
                :key="`button-${button}-${size}`"
                :button="button"
                :size="size"
                :disabled="size === `xl`"
                class="mt0 mb0 vam"
              >
                {{ sizeLabel }} {{ button }} button
              </module-button>
            </template>
          </div>
        </template>

        <br><br>

        <template v-for="(buttonProps, buttonLabel, index) in buttonVariants">
          <module-button
            :key="`button-variants-${index}`"
            v-bind="buttonProps"
            class="mt0 mb0 vam"
          >
            {{ buttonLabel }}
          </module-button>
        </template>

        <h4 class="h4">Modals</h4>

        <module-button
          @click.native="openModal(`example-modal`)"
        >
          Open Modal (<code>example-modal</code>)
        </module-button>

        <module-button
          @click.native="openModal(`example-modal-2`)"
        >
          Open Modal (<code>example-modal-2</code>)
        </module-button>

        <h3 class="h3">Helpers</h3>
        <h4 id="to-plural" class="h4"><code>toPlural</code></h4>
        <p class="p">
          <module-button
            :negative="true"
            class="mt0 mb0 vam"
            size="s"
            icon="plus"

            @click.native="increaseCounter"
          >
            Increase counter
          </module-button>
          {{ countStr }}
        </p>

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

// Services
import { toPlural } from 'services/string';
import { createMeta } from 'services/meta';

// Models
import meta from 'models/meta';

// Modules
import ModuleBlock from 'modules/Block';
import ModuleButton from 'modules/Button';
import ModuleModal from 'modules/Modal';
import ModuleSpinner from 'modules/Spinner';

// Export
export default {
  name: `view-vue-init`,

  // Meta data
  metaInfo: {
    title: meta.vueInit.title,
    meta: createMeta(meta.vueInit.meta),
  },

  // Components
  components: {
    ModuleBlock,
    ModuleButton,
    ModuleModal,
    ModuleSpinner,
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
      spinnerActive: true,
      buttonVariants: {
        'Icon button': {
          icon: `carousel`,
        },
        'Icon button (left)': {
          icon: `grid`,
          negative: true,
        },
        'Button Loading': {
          loading: true,
        },
        'Button Success': {
          success: true,
        },
        'Button :hover': {
          hover: true,
        },
        'Button :active': {
          active: true,
        },
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
