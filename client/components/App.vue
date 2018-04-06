<template>
  <div
    :class="[
      `page`,
      page.classes,
      {
        'page--is-loaded': state.loaded,
      },
    ]"
    id="app"
  >

    <ui-header/>

    <transition
      name="component-fade"
      mode="out-in"
      @appear="onLoad()"
      @enter="onLoad()"
      @before-leave="onBeforeLeave()"
      @leave="onLeave()"
    >
      <router-view :loaded="!state.loading" :key="$route.fullPath"/>
    </transition>

    <ui-footer/>

    <ui-loader/>
  </div>
</template>

<style lang="scss">
    ._debug { margin: 20px 0; font-size: 14px; min-height: 0; }
    ._debug--fixed { border: 0; position: fixed; top: 0; right: 0; padding: 5px 10px; background: rgba(0,0,0,0.5); color: white; z-index: 9999; white-space: pre-wrap; white-space: normal; margin: 0; width: 100%; pointer-events: none; white-space: pre2; }
    @import '../assets/main.scss';
</style>

<script>
// Vuex
import { mapGetters, mapState } from 'vuex';

// Services
import { createMeta } from 'services/meta';

// UI
import UiHeader from 'ui/Header';
import UiFooter from 'ui/Footer';
import UiLoader from 'ui/Loader';

// Export
export default {
  name: `app`,

  // Meta info
  metaInfo() {
    return {
      titleTemplate(titleChunk) {
        return `${titleChunk ? titleChunk + this.$store.state.meta.separator : ``}Fueled`;
      },
      htmlAttrs: {
        prefix: `og: http://ogp.me/ns#`,
      },
      meta: createMeta({
        type: `website`,
        url: this.$store.state.meta.root + this.$route.fullPath,
        title: this.metaTitle,
        twitterHandle: `@fueled`,
        twitterCard: `summary`,
        company: `Fueled`,
        image: `https://fueled.com/assets/images/logo.png`,
        generator: `Fueled VueJS – https://github.com/fueled/vue-boilerplate`,
      }),
      changed(metaInfo/*, added, removed*/) {
        if (metaInfo.title !== this.metaTitle) {
          this.$store.commit(`meta/updateTitle`, metaInfo.title);
        }

        if (this.$route.name && metaInfo.titleChunk) {
          document.dispatchEvent(new Event(`custom-post-render-event`));
        }

        this.$store.commit(`meta/updateMeta`, metaInfo);
      },
    };
  },

  // Components
  components: {
    UiHeader,
    UiFooter,
    UiLoader,
  },

  // Data
  data() {
    return {
      ticking: false,
      scrollY: 0,
    };
  },
  computed: {
    ...mapGetters(`meta`, [
      `metaTitle`,
    ]),
    ...mapState(`app`, {
      page: state => state.page,
      state: state => state.state,
    }),
    ...mapState(`header`, {
      header: state => state,
    }),
  },

  // Methods
  methods: {
    onBeforeLeave() {
      const route = this.$route;
      const loader = route.meta.loader;

      if (this.page.transition === loader || !loader) {
        this.$store.commit(`app/setTransition`, {
          main: loader,
        });
      }
    },
    onLeave() {
      this.$store.dispatch(`app/openLoader`);
    },
    onLoad() {
      this.$store.dispatch(`app/updatePage`);

      if (this.state.init) {
        this.$store.dispatch(`app/closeLoader`);
      }
    },
  },
};
</script>
