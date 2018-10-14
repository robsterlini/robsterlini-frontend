<template>
  <component
    :is="linkTag"

    v-bind="linkProps"

    :class="[
      'btn',
      icon ? 'btn--' + (negative ? 'negative' : 'positive') : '',
      'btn--' + (button || 'secondary'),
      'btn--' + (size || 'm'),
      {
        'btn--icon': icon,
        'btn--idle': (!hover && !isHover && !active && !isActive) || (loading),
        'btn--hover': (hover ||isHover || active || isActive) && !disabled && !loading,
        'btn--active': (active || isActive) && !disabled && !hover && !loading,
        'btn--disabled': !success && !loading && disabled,
        'btn--loading': loading,
        'btn--success': success,
      }
    ]"

    :disabled="disabled || loading || success"

    @mouseover.native="onMouseEnter"
    @mouseover="onMouseEnter"
    @mouseleave.native="onMouseLeave"
    @mouseleave="onMouseLeave"
    @mousedown.native.prevent="onMouseDown"
    @mousedown.prevent="onMouseDown"
    @click="onClick"
  >
    <module-spinner :class="`btn__spinner`" :active="loading" />
    <module-icon :class="`btn__success`" icon="tick" />
    <span class="btn__inner">
      <span class="btn__content">
        <span class="btn__label">
          <slot v-if="!label" />{{ label || `` }}
        </span><!--
        --><module-icon v-if="icon" :class="`btn__icon`" :icon="icon" />
      </span>
    </span>
  </component>
</template>

<script>
// Services
import { getLinkTag, getLinkType, createLinkProps } from 'services/link';

// Modules
import ModuleIcon from 'modules/Icon';
import ModuleSpinner from 'modules/Spinner';

// Other
import VueScrollTo from 'vue-scrollto';

// Export
export default {
  name: `module-button`,

  // Components
  components: {
    ModuleIcon,
    ModuleSpinner,
  },

  // Props
  props: {
    active: Boolean,
    hover: Boolean,
    disabled: Boolean,
    loading: Boolean,
    success: Boolean,
    button: {
      type: String,
    },
    icon: String,
    link: [
      String,
      Object,
    ],
    label: String,
    negative: Boolean,
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
