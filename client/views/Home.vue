<template>
  <main class="main main--home">
    <module-bg
      :image="hoverImage"
    />
    <div class="group group--first-last">
      <h1 class="home-header">
        <module-logo
          class="mt0 mb"
        /><!--
        --><span class="visuallyhidden"> – </span><!--
        --><span class="h1 home-header__span home-header__span--dev" @mouseover="changeBg(`dev`)" @mousedown="changeBg(`dev`)">Frontend dev<span>eloper</span></span><!--
        --><span class="visuallyhidden">, </span><!--
        --><span class="h1 home-header__span home-header__span--tri" @mouseover="changeBg(`tri`)" @mousedown="changeBg(`tri`)"><span>Amateur </span>triathlete</span><!--
        --><span class="visuallyhidden">, and </span><!--
        --><span class="h1 home-header__span home-header__span--lego" @mouseover="changeBg(`lego`)" @mousedown="changeBg(`lego`)"><small class="type--sc">LEGO</small><span> master</span> builder</span>
      </h1>
      <div class="home-col home-col--work">
        <h2 class="h3 mb-h">
          <module-link
            label="Work"
            link="work"
            :no-underline="true"
          />
        </h2>
        <p class="medium mb0">By day I lead the frontend efforts at <module-link :link="{ name: `work`, hash: `#fueled` }" label="Fueled" @mouseover.native="changeBg(`dev`)" />. In my role at Fueled, and as a freelance developer I have helped mould the early web presence of startups, collaborated <module-link :link="{ name: `work`, hash: `#kickpush` }" label="agencies" />, and worked with established brands like to create innovative web&nbsp;experiences. <module-button link="work" class="m0" /></p>
      </div><!--
      --><div class="home-col home-col--life">
        <h2 class="h3 mb-h">
          <module-link
            label="Life"
            link="life"
            :no-underline="true"
          />
        </h2>
        <p class="medium mb0">Away from the screen I like swimming, cycling, and running; occasionally one after the other… I have <module-link link="https://www.instagram.com/p/BZJncXEAQgv/" :no-underline="true" @mouseover.native="changeBg(`tri`)">one <abbr title="Ironman 70.3"  class="type--sc type--nb">IM&hairsp;70.3</abbr></module-link> under my belt and still have my sights firmly set on a full Ironman. I’m pretty into <module-link link="https://www.instagram.com/p/BdFEVqxgspJ/?taken-by=robsterlini" :no-underline="true" @mouseover.native="changeBg(`lego`)"><span class="type--sc">LEGO</span></module-link>, and – for my sins – I am a Spurs season ticket&nbsp;holder. <module-button link="life" class="m0" /></p>
      </div>
      <!-- @mouseover="changeBg(`dev`)" -->
      <h2 class="h3 mb0">
        <module-link
          label="Let’s chat"
          link="contact"
          :no-underline="true"
        />
      </h2>
      <p class="p mb0">
        <module-button
          class="mt0 mbh dt"
          link="mailto:hi@robsterlini.co.uk"
          title="Email me"
        >
          hi@robsterlini.co.uk
        </module-button>
        <module-button
          class="mt0 mbh dt"
          link="https://twitter.com/robsterlini"
          title="Follow me on Twitter"
        >
          @robsterlini
        </module-button>
      </p>
    </div>
    <div class="home-credit">
      <div class="group">
        <p class="small">Headshot taken by <a href="https://www.instagram.com/leonty/">Leon Deriglazov</a>.</p>
      </div>
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
import ModuleButton from 'modules/Button';
import ModuleLink from 'modules/Link';
import ModuleLogo from 'modules/Logo';

// Images
const images = {
  dev: require(`images/hero/home.jpg`),
  tri: require(`images/hero/life.jpg`),
  lego: require(`images/hero/lego.jpg`),
};

// Export
export default {
  name: `view-home`,

  // Meta data
  metaInfo: {
    title: meta.home.title,
    meta: createMeta(meta.home.meta),
  },

  // Components
  components: {
    ModuleBg,
    ModuleButton,
    ModuleLink,
    ModuleLogo,
  },

  // Data
  data() {
    return {
      images,
      hoverSlug: ``,
    };
  },
  computed: {
    hoverImage() {
      return images.dev;
      // return this.images[this.hoverSlug] || ``;
    },
  },

  // Methods
  methods: {
    changeBg(slug) {
      if (slug !== this.hoverSlug) {
        this.hoverSlug = slug;
      }
    },
  },

  // Lifecycle
  created() {
    this.hoverSlug = `dev`;
  },
};
</script>
