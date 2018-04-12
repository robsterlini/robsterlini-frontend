<template>
  <div
    :class="[
      `page`,
      appPage.classes,
      {
        'page--is-loaded': appState.loaded,
      },
    ]"
    :id="`app`"
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
// Vuex
import { mapGetters, mapActions } from 'vuex';

// Services
import { createMeta } from 'services/meta';

// Models
import config from 'models/global/config';

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
        return `${titleChunk ? `${titleChunk}${config.meta.separator}` : ``}${config.name}`;
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
      `appState`,
      `appPage`,
    ]),
  },

  // Methods
  methods: {
    ...mapActions(`app`, [
      `openLoader`,
      `updatePage`,
      `closeLoader`,
    ]),
    ...mapActions(`meta`, [
      `updateMeta`,
      `updateMetaTitle`,
    ]),
    onLeave() {
      this.openLoader();
    },
    onLoad() {
      this.updatePage();

      if (this.appState.init) {
        this.closeLoader();
      }
    },
  },
};
</script>
