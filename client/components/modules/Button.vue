<template>
  <component
    :is="tag"

    :class="[
      'btn',
      icon ? 'btn--' + (negative ? 'negative' : 'positive') : '',
      'btn--' + (button || 'light'),
      'btn--' + (level || 'primary'),
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
    :to="to"
    :href="hrefSet"
    :target="link ? `_blank` : false"

    @mouseover.native="onMouseEnter"
    @mouseover="onMouseEnter"
    @mouseleave.native="onMouseLeave"
    @mouseleave="onMouseLeave"
    @mousedown.native.prevent="onMouseDown"
    @mousedown.prevent="onMouseDown"
    @click="onClick"
  >
    <b class="btn__bg" aria-hidden="true" />
    <module-spinner :class="`btn__spinner`" :active="loading" />
    <module-icon :class="`btn__success`" icon="tick" />
    <span class="btn__inner">
      <span class="btn__content">
        <span class="btn__label">
          <slot/>
        </span><!--
        --><module-icon v-if="icon" :class="`btn__icon`" :icon="icon" />
      </span>
    </span>
  </component>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

import ModuleIcon from 'modules/Icon';
import ModuleSpinner from 'modules/Spinner';

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
    link: String,
    to: Object,
    anchor: String,
    negative: Boolean,
    level: {
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
    tag() {
      return this.to ? `router-link` : (this.anchor || this.link ? `a` : `button`);
    },
    hrefSet() {
      return this.anchor || this.link ? `${this.anchor ? `#${this.anchor}` : this.link}` : false;
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
      if (this.anchor) {
        e.preventDefault();
        VueScrollTo.scrollTo(`#${this.anchor}`, 500, {});
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
