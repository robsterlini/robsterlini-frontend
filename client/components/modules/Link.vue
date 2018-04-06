<template>
  <a
    v-if="anchor"
    :class="linkClass"
    :href="`#${anchor}`"
    v-scroll-to="`#${anchor}`"
  >
    {{ labelSet }}
  </a>
  <a
    v-else-if="!name && !to.name"
    :class="linkClass"
    :href="url"
    target="_blank"
  >
    {{ labelSet }}
  </a>
  <router-link
    :class="linkClass"
    :to="to"
    v-else
  >
    {{ labelSet }}
  </router-link>
</template>

<script>
export default {
  name: `module-link`,

  // Props
  props: {
    arrow: Boolean,
    color: {
      type: String,
      default: `inherit`,
    },
    name: String,
    href: String,
    anchor: String,
    label: String,
    component: String,
    params: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  // Data
  computed: {
    labelSet() {
      return this.label || (this.$slots.default ? (this.$slots.default[0] ? this.$slots.default[0].text : ``) : ``);
    },
    url() {
      return this.href || false;
    },
    linkClass() {
      return [
        `link`,
        this.color && this.color !== `inherit` ? `link--${this.color}` : ``,
        {
          'link--arrow': this.arrow,
        },
      ];
    },
    to() {
      const to = {};

      if (this.component) {
        to.name = `styleguideComponent`;
        to.params = {
          article: this.component,
        };
      } else if (this.name) {
        to.name = this.name;

        if (this.params) {
          to.params = this.params;
        }
      }

      return to;
    },
  },
};
</script>
