<template>
  <ul class="p navigation">
    <router-link
      v-for="route in menus"
      :key="route.path"
      tag="li"
      :to="{ name: route.path }"
      :class="['navigation__item', 'navigation__item--' + route.path]"
    >
      <a class="navigation__link link">
        <span class="navigation__label">{{ route.name }}</span>
      </a>
    </router-link>
  </ul>
</template>

<script>
// Models
import menus from 'models/global/menu';

// Export
export default {
  name: `ui-navigation`,

  // Data
  data() {
    return {
      menus,
    };
  },
};
</script>
