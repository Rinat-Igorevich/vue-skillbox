<template>
  <div class="form__counter">
    <button type="button"
            aria-label="Убрать один товар"
            @click="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="getCount">

    <button type="button"
            aria-label="Добавить один товар"
            @click="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['amount', 'id'],
  name: 'FormCounter',
  methods: {
    increment() {
      this.$emit('counter-change', { amount: this.amount + 1, id: this.id });
    },
    decrement() {
      if (this.amount > 0) {
        this.$emit('counter-change', { amount: this.amount - 1, id: this.id });
      }
    },
  },
  computed: {
    getCount() {
      return this.amount;
    },
  },
};
</script>

<style scoped>

</style>
