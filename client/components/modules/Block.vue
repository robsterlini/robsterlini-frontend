<template>
  <component
    :is="tag || 'section'"

    :class="[
      'block',
      `block--${block || 'accent'}`,
      angleSet.angle ? `angle-block--${angleSet.angle}${angleSet.reversed ? `-reversed` : `` }` : ``,
      {
        'block--cover': cover,
        'block--center': center,
        'block--grow': grow,
      },
    ]"
  >
    <b
      v-if="image"

      :class="[
        `block__bg`
      ]"

      :style="{
        backgroundImage: `url('${image}')`,
      }"
    />
    <span v-if="slug" :id="slug" class="anchor">
      <span v-if="trigger" data-header-trigger=""/>
    </span>

    <slot/>
  </component>
</template>

<script>
export default {
  name: `module-block`,

  // Props
  props: {
    block: String,
    cover: Boolean,
    center: Boolean,
    slug: String,
    trigger: Boolean,
    tag: {
      type: String,
      default: `section`,
    },
    grow: Boolean,
    angle: Number,
    image: String,
  },

  // Data
  computed: {
    angleSet() {
      const angle = this.angle;

      if (!angle || angle > 10 || angle < -10) {
        return {};
      }

      const reversed = angle < 0;

      return {
        angle: reversed ? angle * -1 : angle,
        reversed,
      };
    },
  },
};
</script>
