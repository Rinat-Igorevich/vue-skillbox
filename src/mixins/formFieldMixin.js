import BaseFormField from '@/components/BaseFormField.vue';

export default {
  components: { BaseFormField },
  name: 'BaseFormText',
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
