<template>
  <span
    class="bg"

    id="bg"
  >
    <span
      class="cover bg__bg"

      :style="{
        transform: `translate3d(0, ${scrollY}%, 0)`,
      }"
    >
      <span
        :class="[
          `cover`,
          `bg__image`,
          {
            'bg__image--loaded': loaded,
          },
        ]"

        :style="{
          backgroundImage: `url(${imageSet})`,
        }"
      />
    </span>
  </span>
</template>

<script>
// Services
import { createScroll, destroyScroll } from 'services/scroll';
import { toFixedNumber } from 'services/numbers';

// Export
export default {
  name: `module-bg`,

  // Props
  props: {
    image: String,
  },

  // Data
  data() {
    return {
      loaded: false,
      imageSet: ``,
      scrollY: 0,
    };
  },
  watch: {
    image(image) {
      if (!image) return ``;

      this.loaded = false;

      setTimeout(() => this.loadImage(image), 250);
    },
  },

  // Methods
  methods: {
    loadImage(src) {
      this.imageSet = src;

      return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
          this.loaded = true;
          resolve();
        }

        image.onerror = () => reject();

        image.src = src;
      });
    },
  },

  // Lifecycle
  created() {
    if (!this.image) return;

    this.loadImage(this.image);
  },
  mounted() {
    createScroll(`bg`, {
      el: this.$el,
      move: e => {
        const elHeight = this.$el.clientHeight;
        this.scrollY = toFixedNumber((e.scrollY / elHeight * 100) / 5, 3);
      },
    });
  },
};
</script>
