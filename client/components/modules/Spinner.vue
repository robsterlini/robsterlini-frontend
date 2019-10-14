<template>
  <span :class="['spinner', { 'spinner--active': active }]" aria-hidden="true">
    <inline-image-icons-spinner class="spinner__svg" />
  </span>
</template>

<script>
// Inline
import InlineImageIconsSpinner from 'images/icons/spinner.svg?inline';

// Export
export default {
  name: `module-spinner`,

  // Components
  components: {
    InlineImageIconsSpinner,
  },

  // Props
  props: {
    active: Boolean,
  },
};
</script>
