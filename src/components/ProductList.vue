<template>
  <ul class="catalog__list">
      <productItem
        :product="product"
        v-for="(product) in products"
        :key="product.id"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  props: ['products'],
  name: 'ProductList',
};
</script>

<style scoped>

</style>
