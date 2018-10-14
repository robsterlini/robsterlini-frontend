<template>
  <span
    class="bg"
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
</template>

<script>
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
    };
  },
  watch: {
    image(image) {
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

    this.loadImage(this.image)
  },
};
</script>
