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
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <li class="cart__item product"
                v-for="item in products"
                :key="item.productId"
            >
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
                :count="item.amount"
                :id="item.product.id"
                @counter-change="counterChange">
              </FormCounter>

              <b class="product__price">
                {{ item.product.price * item.amount | numberFormats}} ₽
              </b>

              <button class="product__del button-del"
                      type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>32 970 ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormats from '@/helpers/numberFormat';
import FormCounter from '@/components/FormCounter.vue';

export default {
  name: 'CartPage',
  components: { FormCounter },
  filters: { numberFormats },
  computed: {
    products() {
      return this.$store.getters.cartDetailProducts;
    },
  },
  methods: {
    counterChange({ amount, id }) {
      this.$store.commit(
        'changeProductAmount',
        { productId: id, amount },
      );
    },
  },
};
</script>

<style scoped>

</style>
