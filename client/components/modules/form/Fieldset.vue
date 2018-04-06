<template>
  <div
    :class="[
      'form__fieldset',
      {
        'fieldset--is-dirty': valid.$dirty || value,
        'fieldset--is-dirty-select': !isPlaceholder,
        'fieldset--is-focus': focus && !isReadonly,
        'fieldset--has-errors': valid.$error || serverError,
        'fieldset--is-conditional': conditionalTrue,
        'fieldset--is-hidden': field.hidden,
        'form__fieldset--conditional': field.conditional,
      }
    ]"
    :data-form-fieldset="fieldId"
    v-if="!field.conditional || (field.conditional && conditionalTrue)"
  >

    <!-- Label -->
    <div
      :class="[
        `form__label-wrapper`,
        {
          'form__label-wrapper--hidden': field.labelHidden,
        },
      ]"
    >
      <component
        v-if="!field.labelHidden"
        :is="labelTag"
        :class="[
          `form__label`,
          {
            'form__label--is-placeholder': isPlaceholder,
            'form__label--hidden': field.noLabel || fieldType === `boolean`,
          },
        ]"
        :for="fieldId"
      >
        {{ field.label }}
      </component>

      <!-- Label Helper -->
      <span class="form__helper" v-if="!field.labelHidden">
        <template v-if="field.helper">{{ field.helper }}</template>
        <template v-else-if="fieldValidations.max && fieldValidations.min">{{ `${fieldValidations.min}–${fieldValidations.max} ${isType(`file`) ? `file` : `character`}(s)` }}</template>
        <template v-else-if="fieldValidations.max">{{ `${fieldValidations.max} ${isType(`file`) ? `file` : `character`}(s)` }} <abbr title="maximum">max.</abbr></template>
        <template v-else-if="fieldValidations.min">{{ `${fieldValidations.min} ${isType(`file`) ? `file` : `character`}(s)` }} <abbr title="maximum">min.</abbr></template>
        <template v-else-if="!required">Optional</template>
      </span>

      <router-link
        v-if="field.forgot"
        class="link"
        :to="{
          name: 'authReset',
        }"
        tabindex="-1"
      >
        Forgot?
      </router-link>
    </div>

    <div
      :class="[
        'form__field',
        `form__field--${fieldType}`,
        {
          'form__field--toggle': isType(`toggle`),
        }
      ]"
      @click="focusField()"
    >
      <!-- Background -->
      <b
        :class="[
          'form__field-bg',
          {
            'form__field-bg--is-focus': focus && !isReadonly,
            'form__field-bg--has-errors': valid.$error || serverError,
          }
        ]"
        v-if="!isType(`toggle`)"
      />

      <b
        v-if="field.icon"
        :class="[
          `form__icon`,
          `form__icon--${field.icon}`,
        ]"
      >
        <module-icon
          :icon="field.icon"
          color="f-tertiary"
          :width="48"
          :height="48"
        />
      </b>

      <!-- Prefix -->
      <span
        class="form__prefix"
        v-if="field.prefix"
        v-html="field.prefix"
      />

      <!-- Field -->
      <module-form-field
        :id="fieldId"
        :class="[
          'form__input',
          'form__input--' + fieldType,
          {
            'form__input--toggle': isType(`toggle`),
            'form__input--prefix': field.prefix,
            'form__input--readonly': isReadonly,
          }
        ]"
        :field="field"
        :form-id="formId"
        :min="numberMin"
        :max="numberMax"
        :step="numberStep"
        @focusBlur="onFocusBlur"
        @keydown.native="onKeydown($event)"
        @change="onChange"
        @fieldTouch="onFieldTouch"
        :readonly="isReadonly"
        ref="field"
      />

      <!-- Counter -->
      <!-- <span class="small form__counter" v-if="isType('textarea')">{{ (value || '').length }}{{ (field.validations || {}).maxLength ? '/' + (field.validations || {}).maxLength : '' }}</span> -->

      <!-- Faux (Files) -->
      <module-button
        v-if="isType(`file`)"
        tag="span"
        button="tertiary"
        size="xs"
        :ghosted="true"
        :uppercase="true"
      >
        Choose file
      </module-button>
      <span
        class="form__input form__input--faux form__input--file-faux"
        v-if="isType(`file`)"
      >
        <template v-if="!previewEncoded.length">No file{{ field.multiple ? `s` : `` }} selected</template>
        <!-- <template v-else-if="!previewEncoded.length && previewImages.length">Choose other file{{ fieldValidations.maxLength > 1 ? `(s)` : `` }}</template> -->
        <template v-else-if="previewEncoded.length === 1 && previewEncoded[0].name">
          {{ previewEncoded[0].name }}
          <!-- <span v-for="(image, index) in previewEncoded">{{ `${index >= 1 ? `, ` : ``}${image.name || `Image`}` }}</span> -->
        </template>
        <template v-else>{{ previewEncoded.length }} files selected</template>
      </span>

      <!-- Faux (Color) -->
      <span class="p form__input form__input--faux" v-if="isType('color')">
        <b aria-hidden="true">
          <b :style="{ backgroundColor: value }"/>
        </b><!--
        --><span>{{ value }}</span>
      </span>

    </div>

    <div
      v-if="isType(`file`)"
      class="form-preview"
    >
      <div class="form-preview__item" v-for="(image, index) in previewImages" :key="index">
        <span
          class="form-preview__image"
          :style="{
            backgroundImage: `url(${image.thumbnail || image.image})`,
          }"
        />
        <span class="form-preview__remove" v-if="field.remove && image.id" @click="$store.dispatch(field.remove, image.id)">
          <span class="visuallyhidden">Delete image</span>
          <module-icon
            icon="cross"
            color="f-tertiary"
            :width="32"
            :height="32"
          />
        </span>
      </div>
    </div>

    <!-- Label Errors -->
    <module-form-errors
      :server-error="serverError"
      :errors="valid"
      :label="field.errorLabel || field.label"
    />


    <!-- <pre>{{ field }}</pre> -->
    <!-- <pre>{{ valid }}</pre> -->

  </div>
</template>

<script>
// Vuex
import { mapActions, mapGetters } from 'vuex';

// Services
import { arrayIncludes, arrayLoop } from 'services/array';

// Modules
import ModuleButton from 'modules/Button';
import ModuleIcon from 'modules/Icon';
import ModuleFormField from 'modules/form/Field';
import ModuleFormErrors from 'modules/form/Errors';

// Export
export default {
  name: `module-form-fieldset`,

  // Components
  components: {
    ModuleButton,
    ModuleIcon,
    ModuleFormField,
    ModuleFormErrors,
  },

  // Props
  props: {
    field: Object,
    fieldId: String,
    formId: String,
    serverError: {
      type: String,
      default: ``,
    },
  },

  // Data
  data() {
    return {
      focus: false,
      preview: [],
      previewEncoded: [],
    };
  },
  computed: {
    ...mapGetters(`forms`, [
      `getStatus`,
      `getModel`,
      `getForm`,
    ]),
    model() {
      return this.getModel(this.formId);
    },
    fieldType() {
      const type = this.field.type || `text`;
      if (type === `radio`) {
        return this.field.boolean || (this.field.items || []).length === 1 ? `checkbox` : type;
      }
      return type;
    },
    required() {
      return (this.field.validations || {}).required;
    },
    value() {
      return this.model[this.fieldId];
    },
    hasValue() {
      if (this.fieldType === `number`) {
        return this.value || this.value === 0;
      }
      return !!this.value;
    },
    valid() {
      return this.getForm(this.formId).valid[this.fieldId];
    },
    labelTag() {
      return this.isType(`toggle`) ? `legend` : `label`;
    },
    conditionalTrue() {
      if (this.field.conditional) {
        const conditional = this.field.conditional;

        return this.model[conditional.parent] === conditional.value;
      }
      return null;
    },
    isPlaceholder() {
      if (this.isType(`select`)) {
        return (!this.value && this.value !== ``);
      }
      return !this.hasValue && !this.focus && !this.isType(`toggle`) && !this.valid.$error && !this.serverError;
    },
    fieldValidations() {
      return this.field.validations || {};
    },
    numberMin() {
      if (this.fieldValidations.min) {
        return this.fieldValidations.min;
      }
      const min = (this.fieldValidations.between || [])[0];
      return min || min === 0 ? 0 : false || false;
    },
    numberMax() {
      if (this.fieldValidations.max) {
        return this.fieldValidations.max;
      }
      return (this.fieldValidations.between || [])[1] || false;
    },
    numberStep() {
      return this.field.step || false;
    },
    status() {
      return this.getStatus(this.formId);
    },
    isReadonly() {
      return this.field.hidden || this.field.readonly || this.status.loading || this.status.success;
    },
    previewImages() {
      if (this.fieldType !== `file`) {
        return [];
      }

      if (this.field.preview && this.previewEncoded.length) {
        return this.previewEncoded;
      }

      let arr = this.field.preview ? (this.previewEncoded || []) : [];
      const existing = this.field.existing || ``;

      if (existing) {
        arr = [
          ...arr,
          ...this.$store.getters[existing],
        ];
      }

      return arr || [];
    },
  },
  watch: {
    conditionalTrue(value) {
      this.checkConditional(value);
    },
    preview(preview) {
      this.previewEncoded = [];

      arrayLoop(preview, (index, file) => {
        const reader = new FileReader();
        const name = file.name;

        reader.addEventListener(`load`, () => {
          this.previewEncoded.push({
            image: reader.result,
            name,
          });
        }, false);

        if (file) {
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            reader.readAsDataURL(file);
          }
        }
      });

    },
  },

  // Methods
  methods: {
    ...mapActions(`forms`, {
      'formEvent': `event`,
    }),
    isType(fieldType) {
      if (fieldType === `toggle`) {
        return arrayIncludes([`checkbox`, `radio`, `boolean`], this.fieldType);
      }
      return this.fieldType === fieldType;
    },
    onChange(args) {
      if (args.files) {
        this.preview = args.files;
      }

      this.$emit(`fieldTouch`, this.fieldId);

      this.formEvent({
        event: `serverError`,
        form: this.formId,
        field: this.fieldId,
        error: ``,
      });
    },
    onFocusBlur(focus) {
      this.focus = focus;

      if (focus === false) {
        this.onFieldTouch(this.fieldId);
      }
    },
    onKeydown(event) {
      if (event.key === `e` && this.fieldType === `number`) {
        event.preventDefault();
      }
    },
    onFieldTouch(id) {
      this.$emit(`fieldTouch`, id);
    },
    checkConditional(value) {
      if (value === null) { return false; }

      this.$store.commit(`forms/toggleValidation`, { // TODO: mapMutations
        form: this.formId,
        key: this.fieldId,
        field: this.field,
        type: this.fieldType,
        value,
      });

      if (!value) {
        this.$store.commit(`forms/updateValue`, { // TODO: mapMutations
          form: this.formId,
          field: this.fieldId,
          value: null, // TODO: Make based on field type
        });

        this.$emit(`fieldReset`, this.fieldId);
      } else if (this.field.value && value) {
        this.$store.commit(`forms/updateValue`, { // TODO: mapMutations
          form: this.formId,
          field: this.fieldId,
          value: this.field.value, // TODO: Make based on field type
        });
      }
    },
    focusField() {
      this.$refs.field.$el.focus();
    },
  },

  // Lifecycle
  mounted() {
    this.checkConditional(this.conditionalTrue);
  },
};
</script>
