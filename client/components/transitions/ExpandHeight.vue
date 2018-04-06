<template>
  <transition
    name="transition-expand-height"
    mode="out-in"
    @before-enter="beforeEnter"
    @before-leave="beforeLeave"
  >
    <slot />
  </transition>
</template>

<style lang="scss">
  .transition-expand-height {
    &-enter-active,
    &-leave-active {
      transition:
        opacity 150ms,
        height 300ms;
    }
  }
</style>

<script>
// Export
export default {
  name: `transitions-expand-height`,

  data() {
    return {
      open: false,
    };
  },

  // Methods
  methods: {
    beforeEnter(el) {
      el.style.display = `block`;
      el.style.overflow = `hidden`;
      el.style.height = `auto`;
      el.style.opacity = 0;

      const height = el.clientHeight;

      el.style.height = `0px`;

      setTimeout(() => {
        el.style.height = `${height}px`;

        setTimeout(() => {
          el.style.height = `auto`;
          el.style.opacity = 1;
        }, 150);
      });
    },
    beforeLeave(el) {
      el.style.height = `${el.clientHeight}px`;
      el.style.display = `block`;
      el.style.opacity = 0;

      setTimeout(() => {
        setTimeout(() => {
          el.style.height = `0px`;
        });
      }, 150);
    },
  },
};
</script>
