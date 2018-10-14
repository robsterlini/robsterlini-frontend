<template>
  <main class="main main--work">
    <module-bg
      :image="images.hero"
    />
    <div class="group group--thi group--first-last">
      <h1 class="h1 mt0 mb0">A portfolio of sorts</h1>
      <p class="large">I’m a typography graduate turned frontend developer with a passion for creating web experiences, both at <module-link link="#fueled">Fueled</module-link> and as a freelance&nbsp;developer.</p>

      <div
        v-for="(project, projectId) in projects"

        :class="[
          `work-project`,
          `work-project--${projectId}`,
        ]"
        :id="projectId"
      >
        <h2 class="h2">
          <module-link
            v-if="project.link"

            :link="project.link"
            :label="project.title"
          />
          <abbr
            v-else-if="project.abbr"

            :title="project.abbr"
            v-html="project.title"
          />
          <template v-else>{{ project.title }}</template>
        </h2>

        <div class="work-project__details">
          <dl class="small mt0">
            <div
              v-for="(detail, detailId) in details"

              class="work-project__detail mb"
            >
              <template v-if="(project[detailId] || {}).length">
                <dt class="di h4 mt0 mb0">{{ toPlural(project[detailId].length, detail.title, detail.plural || ``) }}</dt>
                <dd class="di" v-for="(item, index) in project[detailId]">
                  <template v-if="detailId === `clients`">
                    <template v-if="(item || {}).href"><module-link :link="item.href" :label="item.name" /></template>
                    <template v-else>{{ item }}</template>
                  </template>
                  <span v-else v-html="item" />
                </dd>
              </template>
            </div>
          </dl>
        </div><!--
        --><div class="work-project__copy">
          <p
            v-for="(copy, index) in project.copy"
            :class="[
              `p`,
              {
                'mt0': index === 0,
                'mb': index === project.copy.length,
              },
            ]"
          >{{ copy }}</p>
          <module-button
            v-for="(cta, index) in project.ctas || [{ cta: project.cta || null }]"
            :key="index"

            class="mt0 mb0"

            :link="cta.link || `contact`"
            :label="cta.cta || `Got a question?`"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// Models
import meta from 'models/meta';

// Services
import { createMeta } from 'services/meta';
import { toPlural } from 'services/string';

// Modules
import ModuleBg from 'modules/Bg';
import ModuleButton from 'modules/Button';
import ModuleLink from 'modules/Link';

// Images
const images = {
  hero: require(`images/hero/work.jpg`),
};

// Export
export default {
  name: `view-terms`,

  // Meta data
  metaInfo: {
    title: meta.work.title,
    meta: createMeta(meta.work.meta),
  },

  // Components
  components: {
    ModuleBg,
    ModuleButton,
    ModuleLink,
  },

  // Data
  data() {
    const terms = {
      fed: `Frontend development`,
      design: `Web design`,
      brand: `Branding`,
      vue: `Vue 2`,
      middleman: `Middleman`,
      angular: `Angular 1.6`,
      scss: `Scss`,
      wordpress: `WordPress`,
      gulp: `Gulp`,
      js: `<span class="type--sc">ES6</span> JavaScript`,
      html: `<span class="type--sc">HTML</span>, <span class="type--sc">CSS</span>`,
    };

    return {
      images,
      details: {
        clients: {
          title: `Client`,
          plural: `Clients Include`,
        },
        roles: {
          title: `Role`,
        },
        stacks: {
          title: `Stack`,
          plural: `Stack`,
        },
      },
      projects: {
        fueled: {
          title: `Leading the frontend push`,
          link: `https://fueled.com/sterlini`,
          roles: [
            terms.fed,
            `Team management`,
          ],
          clients: [
            `Apple`,
            {
              href: `https://keetoo.com`,
              name: `Keetoo`,
            },
            {
              href: `https://bigpoint.net`,
              name: `Bigpoint`,
            },
            {
              href: `https://web.fixfix.com`,
              name: `FixFix`,
            },
            `Vanity Fair`,
          ],
          stacks: [
            terms.vue,
            terms.scss,
            terms.wordpress,
            terms.angular,
            terms.middleman,
          ],
          copy: [
            `Since joining Fueled in July 2014, I’ve progressed to lead the frontend web team in our efforts to produce high quality, polished\xa0webapps.`,
            `I have built interactive learning games for Apple, engineered web experiences to rescue you when you’re locked out for FixFix, helped visitors get the best value in London for\xa0Keetoo.`,
            `As the team-lead of the Frontend Web Team, I’ve led the charge for better code standards and structure to enable our team to flourish and develop (if you’ll pardon the\xa0pun).`,
          ],
          cta: `Want to know more about Fueled?`,
        },
        kickpush: {
          title: `Building an agency’s presence`,
          clients: [
            {
              href: `https://kickpush.co`,
              name: `Kickpush`,
            },
          ],
          roles: [
            terms.fed,
          ],
          stacks: [
            terms.middleman,
            terms.scss,
          ],
          copy: [
            `Alex & Sam came to me about building the frontend of for the second version of their agency’s site. We worked together closely to deliver a polished experience that perfectly embodied their work ethic and\xa0abilities.`,
            `Since then we have iterated on that build to streamline the user experience, and add a more tailored approach to the case\xa0studies.`,
          ],
          cta: `Like what you see?`,
          // cta: `Does your agency need a web refresh?`,
        },
        other: {
          title: `Et al`,
          abbr: `Latin – and others`,
          clients: [
            {
              href: `https://reading.ac.uk/library`,
              name: `University of Reading`,
            },
            {
              href: `https://unifie.com`,
              name: `Unifie`,
            },
            `Hotspur Related`,
            `Lion & Lamb Lodge`,
          ],
          roles: [
            terms.fed,
            terms.design,
            terms.brand,
          ],
          stacks: [
            terms.html,
            terms.scss,
            terms.js,
            terms.vue,
            terms.gulp,
          ],
          copy: [
            `Over the years I have built websites for a range of clients in a freelance capacity. Ranging from Masonic lodge sites to entire university web presence rethinks, no project is too big or\xa0small.`,
          ],
          ctas: [
            {
              cta: `Got an interesting project?`,
            },
            // {
            //   cta: `Want to see my CV?`,
            //   link: `cv`,
            // }
          ],
        },
      },
    };
  },

  // Methods
  methods: {
    toPlural(a,b,c) {
      return toPlural(a,b,c);
    },
  },
};
</script>
