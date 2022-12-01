import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 1 },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      // eslint-disable-next-line no-shadow
      const item = state
        .cartProducts
        // eslint-disable-next-line no-shadow
        .find((item) => item.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    changeProductAmount(state, { productId, amount }) {
      const item = state
        .cartProducts
        // eslint-disable-next-line no-shadow
        .find((item) => item.productId === productId);
      item.amount = amount;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
  },
});
