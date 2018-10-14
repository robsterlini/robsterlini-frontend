<template>
  <main class="main main--work">
    <div class="group group--first-last">
      <h1 class="h1 mb0">Let’s chat!</h1>
      <p class="large">Get in touch about anything, and everything.</p>

      <div class="grid mb2">
        <div class="grid__item grid__item--2s mb0" v-for="item in mainContact">
          <h2 class="h2">{{ item.title }}</h2>
          <p class="medium" v-for="copy in item.copy" v-html="copy" />
          <module-button
            class="mt0 mbh dt"
            :link="item.link"
            :title="item.linkTitle"
          >
            {{ item.label }}
          </module-button>
        </div>
      </div>

      <h2 class="h3">Social</h2>
      <ul class="p mt0">
        <li v-for="item in contact">
          <module-button
            class="mt0 mb0"
            :link="item.link"
          >
            {{ item.label }}
          </module-button>
        </li>
        <li>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
// Models
import meta from 'models/meta';

// Services
import { createMeta } from 'services/meta';

// Modules
import ModuleButton from 'modules/Button';
import ModuleLink from 'modules/Link';

// Export
export default {
  name: `view-contact`,

  // Meta data
  metaInfo: {
    title: meta.contact.title,
    meta: createMeta(meta.contact.meta),
  },

  // Components
  components: {
    ModuleButton,
    ModuleLink,
  },

  // Data
  data() {
    return {
      mainContact: {
        email: {
          title: `Email`,
          link: `mailto:hi@robsterlini.co.uk`,
          label: `hi@robsterlini.co.uk`,
          linkTitle: `Email me`,
          copy: [
            `If you want me on a freelance job; you’re dying to ask a super-duper long question; or you just want to grab a coffee then ping me an email and we’ll go from there!`,
          ],
        },
        twitter: {
          title: `Twitter`,
          link: `https://twitter.com/robsterlini`,
          label: `@robsterlini`,
          linkTitle: `Send me a tweet`,
          copy: [
            `If you can squeeze it into 140 of your juiciest characters then Twitter is the place to do it! Be warned though, my twitter has no profanity filter.`,
          ],
        }
      },
      contact: {
        instagram: {
          link: `https://instagram.com/robsterlini`,
          label: `Instagram`,
        },
        github: {
          link: `https://github.com/robsterlini`,
          label: `Github`,
        },
        strava: {
          link: `https://www.strava.com/athletes/6578573`,
          label: `Strava`,
        },
        codepen: {
          link: `https://codepen.io/robsterlini/`,
          label: `Codepen`,
        },
      },
    };
  },
};
</script>
