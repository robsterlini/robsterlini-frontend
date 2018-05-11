<template>
  <component
    :is="linkTag"

    v-bind="linkProps"

    :class="linkClass"

    v-html="labelSet"

    @click="onClick"
  />
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
      return createLinkProps(this.link, this.labelSet, this.title);
    },
    labelSet() {
      return this.label || (this.$slots.default ? (this.$slots.default[0] ? this.$slots.default[0].text : ``) : ``);
    },
    linkClass() {
      return [
        `link`,
        this.color && this.color !== `inherit` ? `link--${this.color}` : ``,
        {
          'link--anchor': this.linkType === `anchor`,
          'link--external': this.linkType === `a`,
          'link--internal': this.linkType === `router-link`,
        },
      ];
    },
  },

  // Methods
  methods: {
    onClick(e) {
      if (this.linkType === `anchor`) {
        e.preventDefault();
        VueScrollTo.scrollTo(this.link, 500, {});
      }
    },
  },
};
</script>
