<script>
// Vuex
import { mapGetters } from 'vuex';

// Dependencies
import autosize from 'autosize';

// Services
import { arrayIncludes } from 'services/array';

// Modules
import ModuleIcon from 'modules/Icon';

// Export
export default {
  name: `module-form-field`,

  // Components
  components: {
    ModuleIcon,
  },

  // Props
  props: {
    id: String,
    field: Object,
    formId: String,
  },

  // Data
  computed: {
    ...mapGetters(`forms`, [
      `getModel`,
    ]),
    isResizeable() {
      const field = this.field;

      return field.type === `textarea` && field.resize === true;
    },
    storeValue() {
      const model = this.getModel(this.formId) || {};
      return model[this.id] || null;
      // return this.$store.state.forms[this.formId].model[this.id];
    },
  },
  watch: {
    isResizeable(val) {
      if (this.field.type === `textarea`) {
        if (val) {
          autosize(this.$el);
        } else {
          autosize.destroy(this.$el);
        }
      }
    },
    storeValue(val) {
      if (this.field.type === `file` && val.length === 0) {
        let resetValue = [];

        if (this.field.existing && this.$store.getters[this.field.existing]) {
          resetValue = this.$store.getters[this.field.existing];
        }

        this.$emit(`change`, {
          files: resetValue,
        });
      }
    },
  },

  // Render
  render(createElement) {
    const self = this;

    const field = this.field;
    const fieldType = field.type;
    const attrs = {};
    const children = [];

    let tag = `input`;
    let value = this.storeValue;

    const eventObj = {
      event: `input`,
      form: this.formId,
      field: this.id,
    };

    if (!value && fieldType === `color`) {
      value = `#ae0000`; // TODO: Var
    } else if (fieldType === `number` && value === 0) {
      value = `0`;
    } else if (!value) {
      value = ``;
    }

    const dataObj = {
      domProps: {
        name: this.id,
        placeholder: field.placeholder || ``,
      },
      class: [],
      on: {
        input(event) {
          let newValue = event.target.value;

          if (field.contentType === `Number` || fieldType === `number`) {
            // Keep zero as a string to allow the FE to show it, getModel() will convert this back to a number
            newValue = newValue === `0` ? newValue : parseInt(newValue, 10);
          }

          const change = self.value === newValue;

          self.value = newValue;

          self.$store.dispatch(`forms/event`, {
            ...eventObj,
            value: newValue,
            change,
          });

          if (field.type === `textarea` && field.resize) {
            autosize.update(self.$el);
          }
        },
        focus() {
          self.$emit(`focusBlur`, true);
        },
        blur() {
          self.$emit(`focusBlur`, false);
        },
        change() {
          const args = {};

          if (field.type === `file`) {
            let files = self.$el.files;

            if (!files.length && self.field.existing && self.$store.getters[self.field.existing]) {
              files = self.$store.getters[self.field.existing];
            }

            self.$store.dispatch(`forms/event`, {
              ...eventObj,
              value: files.length ? files : [],
            });

            args.files = files;
          }

          self.$emit(`change`, args);
        },
      },
    };

    if (value && fieldType !== `file`) {
      self.$store.dispatch(`forms/event`, {
        ...eventObj,
        value,
      });
    }

    if (fieldType === `file`) {
      // const validations = self.field.validations || {};
      // const maxLength = validations.maxLength || 1;
      if (field.multiple) {
        dataObj.domProps.multiple = true;
      }
    } else {
      dataObj.domProps.value = value;
    }

    if (field.autoComplete === false) {
      dataObj.domProps.autocomplete = `off`;
    }

    if (!arrayIncludes([`checkbox`, `radio`, `boolean`], fieldType)) {
      dataObj.domProps.id = this.id;
    }

    if (!arrayIncludes([`textarea`, `select`, `checkbox`, `radio`, `boolean`], fieldType)) {
      dataObj.domProps.type = fieldType || `text`;
    }

    if (fieldType === `textarea`) {
      tag = `textarea`;
      const minRows = 3;
      const maxRows = 10;

      const rows = field.rows || 4;

      dataObj.domProps.rows = rows >= maxRows ? maxRows : (rows <= minRows ? minRows : rows);

      if (field.resize) {
        autosize(this.$el);
      }
    }

    if (fieldType === `select`) {
      tag = `select`;

      const items = field.items || [];
      const itemsArr = [];

      items.forEach(v => {
        const isStr = typeof(v) === `string`;
        const value = isStr ? v : v.value;
        const label = isStr ? v : v.option;
        const itemAttrs = {
          value,
        };

        itemsArr.push(createElement(`option`, { attrs: itemAttrs }, label));
      });

      const placeholderAttrs = {
        value: `_NULL`,
        disabled: `disabled`,
      };

      children.push(createElement(`option`, { attrs: placeholderAttrs }, `${field.placeholder || `Select`}…`));

      Array.prototype.push.apply(children, itemsArr);
    }

    if (arrayIncludes([`checkbox`, `radio`, `boolean`], fieldType)) {
      tag = `fieldset`;

      const isCheckbox = fieldType === `checkbox`;
      const isRadio = fieldType === `radio`;
      const isBoolean = fieldType === `boolean`;

      const booleanItems = [
        {
          option: field.label,
          value: true,
        },
      ];
      const items = isBoolean ? booleanItems : field.items || [];

      items.forEach(v => {

        const inputAttrs = {
          class: [
            `visuallyhidden`,
          ],
          domProps: {
            name: self.id,
            checked: isCheckbox ? value.indexOf(v.value) >= 0 : value === v.value,
          },
          on: {
            change(event) {
              if (field.readonly) {
                event.preventDefault();
                return false;
              }

              if (isCheckbox) {

                const val = event.target.value;
                const checked = value.indexOf(val) >= 0;

                if (!checked) {
                  value.push(val);
                } else {
                  const i = value.indexOf(val);
                  if (i >= 0) {
                    value.splice(i, 1);
                  }
                }

                self.$store.dispatch(`forms/event`, {
                  event: `input`,
                  form: self.formId,
                  field: self.id,
                  value,
                });

                self.$emit(`fieldTouch`, self.id);
              }

              if (isRadio || isBoolean) {
                if (isBoolean) {
                  value = !value;
                } else if (v.value === value) {
                  value = null;
                } else {
                  value = v.value;
                }

                self.$store.dispatch(`forms/event`, {
                  ...eventObj,
                  value,
                });
              }
            },
          },
          attrs: {
            type: `checkbox`,
            value: v.value,
          },
        };

        const input = createElement(`input`, inputAttrs);

        let isChecked = false;
        if (isCheckbox) {
          isChecked = value.indexOf(v.value) >= 0;
        } else if (isBoolean) {
          isChecked = !!value;
        } else {
          isChecked = v.value === value;
        }

        const labelAttrs = {
          class: [
            `form__checkbox`,
            {
              'is--checked': isChecked,
              'is--readonly': field.readonly,
            },
          ],
        };

        const labelIcon = createElement(ModuleIcon, {
          props: {
            icon: `tick`,
          },
        });

        const checkboxToggle = createElement(
          `span`,
          {
            class: [
              `form__toggle`,
              `form__toggle--${fieldType}`,
              {
                'is--checked': isChecked,
              },
            ],
          },
          [
            isCheckbox ? labelIcon : ``,
          ],
        );

        const spanAttrs = {
          class: [
            `form__label`,
            `form__label--checkbox`,
          ],
        };

        const labelChildren = [
          input,
          createElement(`span`, spanAttrs, v.option),
          checkboxToggle,
        ];

        const label = createElement(`label`, labelAttrs, labelChildren);

        children.push(label);
      });

    }

    dataObj.attrs = attrs;

    return createElement(tag, dataObj, children);
  },
};
</script>
