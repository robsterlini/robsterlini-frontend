<template>
  <ul class="p navigation">
    <router-link
      v-for="route in menus"
      :key="route.path"

      :class="['navigation__item', 'navigation__item--' + route.path]"

      :to="{ name: route.path }"

      tag="li"
    >
      <a class="navigation__link link">
        <span class="navigation__label">{{ route.name }}</span>
      </a>
    </router-link>
    <module-button
      v-if="!isAuthenticated"

      button="accent"
      level="tertiary"

      @click.native="openModal(`login`)"
    >
      Log In
    </module-button>
    <module-button
      v-else

      :to="{
        name: `logout`,
      }"

      button="accent"
      level="tertiary"
    >
      Log out
    </module-button>
  </ul>
</template>

<script>
// Vuex
import { mapGetters, mapActions } from 'vuex';

// Models
import menus from 'models/global/menu';

// Modules
import ModuleButton from 'modules/Button';
// Export
export default {
  name: `ui-navigation`,

  // Components
  components: {
    ModuleButton,
  },

  // Data
  data() {
    return {
      menus,
    };
  },
  computed: {
    ...mapGetters(`auth`, [
      `isAuthenticated`,
    ]),
  },

  // Methods
  methods: {
    ...mapActions(`modals`, [
      `openModal`,
    ]),
  },
};
</script>
