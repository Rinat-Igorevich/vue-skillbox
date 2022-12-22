<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalCount | declensionOfNouns}}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item :item="item" v-for="item in products" :key="item.productId"></cart-item>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormats }} ₽</span>
          </p>

          <router-link tag="button"
                       :to="{name: 'order'}"
                       class="cart__button button button--primery"
                       type="submit"
                       v-if="products.length > 0"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormats from '@/helpers/numberFormat';
import declensionOfNouns from '@/helpers/declensionOfNouns';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  name: 'CartPage',
  components: { CartItem },
  filters: { numberFormats, declensionOfNouns },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalCount: 'cartProductsAmount',
    }),
  },
};
</script>

<style scoped>

</style>
