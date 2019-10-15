<template>
  <main class="main main--life">
    <module-bg
      :image="images.hero"
    />
    <div class="group group--thin group--first-last">
      <h1 class="h1 mt0 mb0">Not work</h1>
      <p class="large">A <module-link link="work">work</module-link>-life balance is very important, so away from my frontend development environments I try and spend time outside with an elevated heart&nbsp;rate, inside cooking (read that as eating), or building with&nbsp;<span class="type--sc">LEGO</span>.</p>

      <h2 class="h2">Swim, bike, run… eat!</h2>
      <p class="p">Since taking on the sport in {{ new Date(triathlons[0].date).getFullYear() }}, I have {{ triathlonsCount }} under my belt, including my first <abbr class="nowrap" title="Ironman 70.3"><span class="type--sc">IM</span>&hairsp;70.3</abbr> – a half Ironman distance made up of a 1.2 mile swim, a 56 mile bike, and a <span class="nowrap">half-marathon</span>&nbsp;run.</p>
      <p class="p">Training for triathlon keeps life varied with three disciplines to keep on top of, whether that’s swimming in a reservoir head-to-toe in neoprene, clipping merrily up hills on <module-link link="https://www.instagram.com/p/BUmYHM0FYjG">Cleo</module-link>, getting aero with <module-link link="https://www.instagram.com/p/BW5hVZhAm-d/">Alice</module-link>, or pushing the earth down along the&nbsp;Thames.</p>
      <p class="p">That amount of cardio works up quite a hunger, but with my large, Italian appetite, I've got that covered&nbsp;too.</p>

<!--       <div class="group__overlap">
        <div class="life-triathlon__images grid">
          <div v-for="image in images.triathlon" class="life-triathlon__image grid__item--3 mt">
            <span
              :style="{
                backgroundImage: `url(${image})`,
              }"
            />
          </div>
        </div>
      </div> -->

      <h2 class="h2">Being less active</h2>
      <h3 class="h3" id="lego">Bricks on bricks</h3>
      <p class="p">I’ve built with <span class="type--sc">LEGO</span> since I was a very young boy, but the jewel in my collection – <module-link link="https://www.instagram.com/p/BdFEVqxgspJ/?taken-by=robsterlini"><abbr title="Ultimate Collector Series">UCS</abbr> Millenium Falcon 75192</module-link> – was built over the Christmas holiday in&nbsp;2017.</p>
      <p class="p">I’ve also got an <module-link link="https://instagram.com/hopeaitchison">amazing wife</module-link> who supported me getting <module-link link="https://www.instagram.com/p/BDTc0gYP-8b/?taken-by=robsterlini"><span class="type--sc">LEGO</span> Batman and Iron Man</module-link> indelibly inked onto my&nbsp;quad.</p>

      <h3 class="h3" id="sports">Sports</h3>
      <p class="p">Aside from participating in triathlon, it is also one of the sports in a long list that I follow avidly. I am a <module-link link="https://twitter.com/search?q=robsterlini%20coys"><abbr title="Tottenham Hotspur FC">Spurs</abbr></module-link> season ticket holder – for my sins; I stay up late to watch the Patriots in the NFL, and get behind Team&nbsp;Ineos in the pro peleton.</p>

      <h2 class="h3">Share an interest?</h2>
      <module-button
        class="mt0"
        link="contact"
      >
        Let’s chat!
      </module-button>

    </div>
  </main>
</template>

<script>
// Models
import meta from 'models/meta';

// Services
import { createMeta } from 'services/meta';
import { toNumberWord } from 'services/numbers';
import { toPlural } from 'services/string';

// Modules
import ModuleBg from 'modules/Bg';
import ModuleButton from 'modules/Button';
import ModuleLink from 'modules/Link';

// Images
const images = {
  hero: require(`images/hero/life.jpg`),
  triathlon: [
    require(`images/life/im-swim.jpg`),
    require(`images/life/im-bike.jpg`),
    require(`images/hero/life.jpg`),
  ],
};

// Export
export default {
  name: `view-life`,

  // Meta data
  metaInfo: {
    title: meta.life.title,
    meta: createMeta(meta.life.meta),
  },

  // Components
  components: {
    ModuleBg,
    ModuleButton,
    ModuleLink,
  },

  // Data
  data() {
    return {
      images,
      triathlons: [
        {
          event: `Jenson Button Trust`,
          distance: `super-sprint`,
          date: `12/7/2015`,
        },
        {
          event: `Jenson Button Trust`,
          distance: `super-sprint`,
          date: `12/7/2015`,
        },
        {
          event: `AJ Bell London Triathlon`,
          distance: `sprint`,
          date: `8/8/2015`,
        },
        {
          event: `Jenson Button Trust`,
          distance: `super-sprint`,
          date: `17/7/2016`,
        },
        {
          event: `Jenson Button Trust`,
          distance: `super-sprint`,
          date: `17/7/2016`,
        },
        {
          event: `AJ Bell London Triathlon`,
          distance: `olympic`,
          date: `8/8/2016`,
        },
        {
          event: `AJ Bell London Triathlon`,
          distance: `olympic`,
          date: `23/7/2017`,
        },
        {
          event: `Ironman Weymouth`,
          distance: `half-iron`,
          date: `17/9/2017`,
        },
        {
          event: `Royal Windsor Triathlon`,
          distance: `olympic`,
          date: `17/6/2018`,
        },
        {
          event: `Sri Chinmoy Triathlon`,
          distance: `sprint`,
        }
      ],
      marathons: [
        {
          event: `Brighton`,
          date: `18/4/2016`,
        },
        {
          event: `Manchester`,
        },
      ],
    };
  },
  computed: {
    triathlonsCount() {
      return `${toNumberWord(this.triathlons.length)} ${toPlural(this.triathlons, `triathlon`)}`;
    },
  },
};
</script>
