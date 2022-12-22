<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image"
           width="120" height="120"
           :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <FormCounter
      :amount="item.amount"
      :id="item.productId"
      @counter-change="counterChange">
    </FormCounter>

    <b class="product__price">
      {{ item.product.price * item.amount | numberFormats}} ₽
    </b>

    <button class="product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct()"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormats from '@/helpers/numberFormat';
import FormCounter from '@/components/FormCounter.vue';
// import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  props: ['item'],
  filters: { numberFormats },
  components: { FormCounter },
  methods: {
    // ...mapActions({ deleteProduct: 'deleteProductFromCart' }),
    deleteProduct() {
      this.$store.dispatch(
        'deleteProductFromCart',
        { productId: this.item.productId },
      );
    },
    counterChange({ amount, id }) {
      this.$store.dispatch(
        'updateCartProductAmount',
        { productId: id, amount },
      );
    },
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store
          .dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
};
</script>

<style scoped>

</style>
