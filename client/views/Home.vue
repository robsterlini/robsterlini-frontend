<template>
  <main class="main main--home">
    <module-bg
      :image="images.hero"
    />
    <div class="group group--first-last">
      <h1 class="home-header">
        <module-logo
          class="mt0 mb"
        /><!--
        --><span class="visuallyhidden"> – </span><!--
        --><span class="h1 home-header__span home-header__span--dev">Frontend dev<span>eloper</span></span><!--
        --><span class="visuallyhidden">, </span><!--
        --><span class="h1 home-header__span home-header__span--tri"><span>Amateur </span>triathlete</span><!--
        --><span class="visuallyhidden">, and </span><!--
        --><span class="h1 mb0 home-header__span home-header__span--lego"><small class="type--sc">LEGO</small><span> master</span> builder</span>
      </h1>
      <!--<h2 class="h3">Hi, I’m Rob</h2>-->
      <div class="home-col home-col--work">
        <h2 class="h4 mb-h">
          <module-link
            label="Work"
            link="work"
            :no-underline="true"
          />
        </h2>
        <p class="medium mb0">By day I lead the frontend efforts at <module-link :link="{ name: `work`, hash: `#fueled` }" label="Fueled" />. As a frontend developer I have built websites for agencies like <a href="https://kickpush.co">Kickpush</a>; helped mould the early web presence of startups like <a href="https://web.fixfix.com">FixFix</a>; and worked with established brands like <a href="https://fueled.com/decks/web/#apple/1">Apple</a> and the University of Reading to create innovative web&nbsp;experiences.<module-button link="work" class="m0" /></p>
      </div><!--
      --><div class="home-col home-col--life">
        <h2 class="h4 mb-h">
          <module-link
            label="Life"
            link="life"
            :no-underline="true"
          />
        </h2>
        <p class="medium mb0">Away from the screen I enjoy cresting hills on my bike before running and then eating everything – I have <a href="https://www.instagram.com/p/BZwpydIgCsd/?taken-by=robsterlini">one <abbr title="Ironman 70.3"><span class="type--sc">IM</span>&hairsp;70.3</abbr></a> under my belt and still have my sights firmly set on a full Ironman. I’m pretty into <a href="https://www.instagram.com/p/BdFEVqxgspJ/?taken-by=robsterlini"><small class="type--sc">LEGO</small></a> and <a href="https://twitter.com/search?q=robsterlini%20coys">Spurs</a>&nbsp;too.</p>
      </div>
      <h2 class="h4 mb0">
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
        <p class="small">Photo taken by <a href="https://www.instagram.com/leonty/">Leon Deriglazov</a>.</p>
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
  hero: require(`images/hero/home.jpg`),
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
    };
  },
};
</script>
