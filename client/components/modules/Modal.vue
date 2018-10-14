<template>
  <div
    :class="[
      `modal`,
      `modal--${id}`,
      `cover--fixed`,
      {
        'modal--active': active,
        'modal--auth': auth,
        'modal--auto': auto,
      },
    ]"
  >
    <div
      class="modal__bg cover"
      aria-hidden="true"

      @click="closeModal()"
    />
    <div class="modal__wrapper">

      <div v-if="hasHeader" class="modal__header">
        <module-modal-close v-if="!noClose" />
        <slot name="header" />
      </div>

      <div class="modal__content">
        <div class="modal__inner">
          <template v-if="!hasHeader && !noClose">
            <module-modal-close />
            <span class="modal__float" aria-hidden="true" />
          </template>
          <template v-if="visible">
            <ui-auth
              v-if="auth"
              :slug="auth"
              :modal="true"
              :success="() => {
                closeModal();
              }"
            />
            <slot v-else />
          </template>
        </div>
      </div>

      <div v-if="hasFooter" class="modal__footer">
        <slot name="footer" />
      </div>

    </div>
  </div>
</template>

<script>
// Vuex
import { mapGetters, mapActions } from 'vuex';

// Modules
import ModuleModalClose from 'modules/modal/Close';

// Ui
import UiAuth from 'ui/Auth';

// Export
export default {
  name: `module-modal`,

  // Components
  components: {
    ModuleModalClose,
    UiAuth,
  },

  // Props
  props: {
    id: {
      type: String,
      required: true,
    },
    auth: String,
    noClose: Boolean,
    auto: Boolean,
  },

  // Data
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    // ...mapGetters(`auth`, [
    //   `isAuthenticated`,
    // ]),
    // ...mapGetters(`modals`, [
    //   `modalActive`,
    // ]),
    active() {
      return this.modalActive === this.id;
    },
    hasHeader() {
      return !!this.$slots.header;
    },
    hasFooter() {
      return !!this.$slots.footer;
    },
  },
  watch: {
    active(active) {
      this.setActive(active);
    },
  },

  // Methods
  methods: {
    ...mapActions(`modals`, [
      `createModal`,
      `closeModal`,
    ]),
    setActive(active) {
      if (active && this.auth && this.isAuthenticated) {
        this.visible = false;
        this.closeModal();
      } else {
        setTimeout(() => {
          this.visible = active;
        }, active ? 0 : 300); // TODO: Var
      }
    },
  },

  // Lifecycle
  created() {
    if (this.active) {
      this.setActive(true);
    }

    const modal = {
      id: this.id,
    };

    if (this.auth) {
      const route = this.$router.resolve({
        name: this.auth,
      });

      modal.path = ((route || {}).route || {}).fullPath;
    }

    this.createModal(modal);
  },
};
</script>
