<template>
  <span :class="['spinner', { 'spinner--active': active }]" aria-hidden="true"/>
</template>

<script>
export default {
  name: `module-spinner`,

  // Props
  props: {
    active: Boolean,
  },
};
</script>
