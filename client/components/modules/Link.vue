<template>
  <component
    :is="linkTag"

    v-bind="linkProps"

    :class="[
      `link`,
      color && color !== `inherit` ? `link--${color}` : ``,
      {
        'link--anchor': linkType === `anchor`,
        'link--external': linkType === `a`,
        'link--internal': linkType === `router-link`,
        'link--no-underline': noUnderline,
      },
    ]"

    @click="onClick"
  >
    <span v-if="label" class="link__label" v-html="label" />
    <span v-else class="link__label">
      <slot />
    </span>
  </component>
  </component>
</template>

<script>
// Services
import { getLinkType, getLinkTag, createLinkProps } from 'services/link';

// Other
import VueScrollTo from 'vue-scrollto';

// Export
export default {
  name: `module-link`,

  // Props
  props: {
    color: String,
    label: String,
    link: [
      String,
      Object,
    ],
    title: String,
    noUnderline: Boolean,
  },

  // Data
  computed: {
    linkType() {
      return getLinkType(this.link);
    },
    linkTag() {
      return getLinkTag(this.link);
    },
    linkProps() {
      return createLinkProps(this.link, this.label, this.title);
    },
  },

  // Methods
  methods: {
    onClick(e) {
      if (this.linkType === `anchor`) {
        e.preventDefault();
        VueScrollTo.scrollTo(this.link, 500);
      }
    },
  },
};
</script>
