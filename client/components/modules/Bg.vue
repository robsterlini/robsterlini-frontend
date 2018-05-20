<template>
  <span
    class="bg"
  >
    <span
      class="bg__image cover"
      :style="{
        backgroundImage: `url(${image})`,
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
};
</script>
