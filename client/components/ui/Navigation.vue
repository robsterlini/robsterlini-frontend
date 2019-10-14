<template>
  <ul class="p navigation">
    <li
      v-for="route in menus"
      :key="route.link"

      :class="[
        `navigation__item`,
        `navigation__item--${route.link}`,
        {
          'navigation__item--active': route.link === $route.name,
        },
      ]"
    >
      <module-link
        class="navigation__link link"

        :link="route.link"
        :no-underline="true"
      >
        <b class="navigation__marker" />
        <span class="navigation__label">{{ route.name }}</span>
      </module-link>
    </li>
    <module-button
      link="contact"

      button="tertiary"
      level="tertiary"
    >
      Say hi
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
import ModuleLink from 'modules/Link';

// Export
export default {
  name: `ui-navigation`,

  // Components
  components: {
    ModuleButton,
    ModuleLink,
  },

  // Data
  data() {
    return {
      menus,
    };
  },
  computed: {
    ...mapGetters(`app`, [
      `appPage`,
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
