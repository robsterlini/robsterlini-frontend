<template>
  <component
    :is="linkTag"

    v-bind="linkProps"

    :class="[
      'btn',
      'btn--' + (button || 'secondary'),
      'btn--' + (size || 'm'),
      {
        'btn--idle': (!hover && !isHover && !active && !isActive),
        'btn--hover': (hover ||isHover || active || isActive) && !disabled,
        'btn--active': (active || isActive) && !disabled && !hover,
        'btn--disabled': disabled,
      }
    ]"

    :disabled="disabled"

    @mouseover.native="onMouseEnter"
    @mouseover="onMouseEnter"
    @mouseleave.native="onMouseLeave"
    @mouseleave="onMouseLeave"
    @mousedown.native.prevent="onMouseDown"
    @mousedown.prevent="onMouseDown"
    @click="onClick"
  >
    <span class="btn__inner">
      <span class="btn__content">
        <span class="btn__label">
          <slot v-if="!label" />{{ label || `` }}
        </span>
      </span>
    </span>
  </component>
</template>

<script>
// Services
import { getLinkTag, getLinkType, createLinkProps } from 'services/link';

// Other
import VueScrollTo from 'vue-scrollto';

// Export
export default {
  name: `module-button`,

  // Props
  props: {
    active: Boolean,
    hover: Boolean,
    disabled: Boolean,
    button: {
      type: String,
    },
    link: [
      String,
      Object,
    ],
    label: String,
    title: String,
    size: {
      type: String,
    },
  },

  // Data
  data() {
    return {
      isActive: false,
      isHover: false,
    };
  },
  computed: {
    linkType() {
      return getLinkType(this.link);
    },
    linkTag() {
      return getLinkTag(this.link);
    },
    linkProps() {
      return createLinkProps(this.link, ``, this.title);
    },
  },

  // Methods
  methods: {
    onMouseEnter() {
      this.isHover = true;
    },
    onMouseLeave() {
      this.isHover = false;
    },
    onMouseDown() {
      this.isActive = true;
    },
    onMouseUp() {
      this.isActive = false;
      this.isHover = false;
    },
    onClick(e) {
      if (this.linkType === `anchor`) {
        e.preventDefault();
        VueScrollTo.scrollTo(this.link, 500, {});
      }
    },
  },

  // Lifecycle
  mounted() {
    document.addEventListener(`mouseup`, this.onMouseUp, false);
  },
  destroyed() {
    document.removeEventListener(`mouseup`, this.onMouseUp, false);
  },
};
</script>
