<template>
  <div
    :class="[
      `page`,
      `page--c${random}`,
      appPage.classes,
      {
        'page--is-loaded': appState.loaded,
        'page--is-loading': appState.loading,
        'page--show-group': !appState.loading,
      },
    ]"
    :id="`app`"

    :data-env="appEnv"
  >
    <ui-header/>

    <transition
      name="component-fade"
      mode="out-in"
      @appear="onLoad()"
      @enter="onLoad()"
      @leave="onLeave()"
    >
      <router-view :key="$route.fullPath"/>
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
// Config
import config from 'config';

// Vuex
import { mapGetters, mapActions } from 'vuex';

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
        return `${config.env !== `prod` ? `[${config.env}] ` : ``}${titleChunk ? `${titleChunk}${config.meta.separator}` : ``}${config.name}`;
      },
      htmlAttrs: {
        prefix: `og: http://ogp.me/ns#`,
      },
      meta: createMeta({
        type: `website`,
        url: `${config.rootUrl}${this.$route.fullPath}`,
        title: this.metaTitle,
        twitterHandle: `@${config.social.twitter}`,
        twitterCard: `summary`,
        company: config.name,
        image: config.logoUrl,
        generator: `Fueled VueJS – https://github.com/fueled/vue-init`,
      }),
      changed(metaInfo/*, added, removed*/) {
        if (metaInfo.title !== this.metaTitle && this.updateMetaTitle) {
          this.updateMetaTitle(metaInfo.title);
        }

        if (this.$route.name && metaInfo.titleChunk) {
          document.dispatchEvent(new Event(`custom-post-render-event`));
        }

        if (this.updateMeta) {
          this.updateMeta(metaInfo);
        }
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
  computed: {
    ...mapGetters(`meta`, [
      `metaTitle`,
    ]),
    ...mapGetters(`app`, [
      `appEnv`,
      `appState`,
      `appPage`,
    ]),
    ...mapGetters(`modals`, [
      `modalActive`,
    ]),
    random() {
      return Math.floor(Math.random() * 4) + 1;
    },
  },
  watch: {
    modalActive(active) {
      const classList = document.body.classList;
      const className = `body--modal-open`;

      active ? classList.add(className) : classList.remove(className);
    },
  },

  // Methods
  methods: {
    ...mapActions(`app`, [
      `openLoader`,
      `updatePage`,
      `closeLoader`,
      `updateViewport`,
      `updateScroll`,
      `setTouch`,
    ]),
    ...mapActions(`meta`, [
      `updateMeta`,
      `updateMetaTitle`,
    ]),
    ...mapActions(`modals`, [
      `closeModal`,
    ]),
    onLeave() {
      this.openLoader();
      this.closeModal();
    },
    onLoad() {
      this.updatePage();

      if (this.appState.init) {
        this.closeLoader();
      }
    },
  },

  // Lifecycle
  created() {
    this.updateViewport();
    this.setTouch();

    window.addEventListener(`resize`, () => this.updateViewport(), true);
    window.addEventListener(`scroll`, () => this.updateScroll(), true);
  },
  destroyed() {
    window.removeEventListener(`resize`, () => this.updateViewport(), true);
    window.removeEventListener(`resize`, () => this.updateScroll(), true);
  },
};
</script>
