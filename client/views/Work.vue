<template>
  <main class="main main--work">
    <module-bg
      :image="images.hero"
    />
    <div class="group group--thin group--first-last">
      <h1 class="h1 mt0 mb0">A portfolio of sorts</h1>
      <p class="large">I’m a typography graduate turned frontend developer with a passion for creating web experiences as part of my role at <module-link link="#fueled">Fueled</module-link> and as a freelance developer.</p>

      <div
        v-for="(project, projectId) in projects"

        class="work-project"
        :id="projectId"
      >
        <h2 class="h2">
          <module-link
            v-if="project.link"

            :link="project.link"
            :label="project.title"
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
                  <template v-else>{{ item }}</template>
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
            class="mt0 mb0"
            link="contact"
          >
            {{ project.cta || `Got a question?` }}
          </module-button>
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
    title: meta.terms.title,
    meta: createMeta(meta.terms.meta),
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
      fed: `Frontend Development`,
      design: `Web Design`,
      vue: `Vue 3`,
      middleman: `Middleman`,
      angular: `Angular 1.6`,
      scss: `Scss`,
      wordpress: `WordPress`,
      gulp: `Gulp`,
      html: `HTML & CSS`,
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
          link: `https://fueled.com`,
          roles: [
            terms.fed,
            `Team Leadership`,
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
          ],
          stacks: [
            terms.vue,
            terms.scss,
            terms.wordpress,
            terms.angular,
            terms.middleman,
          ],
          copy: [
            `Since joining Fueled in July 2014, I’ve progressed to lead the frontend web team in our efforts to produce high quality, polished webapps.`,
            `I have built interactive learning games for Apple, engineered web experiences to rescue you when you’re locked out for FixFix, helped visitors get the best value in London for Keetoo.`,
            `As the team-lead of the Frontend Web Team, I’ve led the charge for better code standards and structure to enable our team to flourish and develop (if you’ll pardon the pun).`,
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
          cta: `Does your agency need a web refresh?`,
        },
        other: {
          title: `Size doesn’t matter`,
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
          ],
          stacks: [
            terms.html,
            terms.scss,
            terms.gulp,
          ],
          copy: [
            `To fund my triathlon addiction I make myself available for frontend development, web design, and anything else\xa0related.`,
          ],
          cta: `Got an interesting project?`,
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
