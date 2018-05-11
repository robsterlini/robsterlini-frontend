<template>
  <span
    :class="[
      'logo',
    ]"
  >
    <span class="logo__inner">
      <image-brand-logo class="logo__image" />
      <span class="visuallyhidden">{{ label }}</span>
    </span>
  </span>
</template>

<script>
// Models
import config from 'config';

// Images
import ImageBrandLogo from 'images/brand/logo.svg?inline';

// Export
export default {
  name: `module-logo`,

  // Components
  components: {
    ImageBrandLogo,
  },

  // Data
  computed: {
    label() {
      return config.name;
    },
  },
};
</script>
