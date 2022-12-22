<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
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
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name"
                          title="ФИО"
                          placeholder="Введите ваше полное имя"
                          :error="formError.name"
            />
            <label class="form__label">
              <input class="form__input"
                     v-model="formData.address"
                     type="text"
                     name="address"
                     placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
              <span class="form__error" v-if="formError.address">{{ formError.address }}</span>
            </label>

            <label class="form__label">
              <input class="form__input"
                     v-model="formData.phone"
                     type="tel" name="phone"
                     placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error" v-if="formError.phone">{{ formError.phone }}</span>
            </label>

            <label class="form__label">
              <input class="form__input"
                     v-model="formData.email"
                     type="email"
                     name="email"
                     placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
              <span class="form__error" v-if="formError.email">{{ formError.email }}</span>
            </label>

            <BaseFormTextarea v-model="formData.comment"
                              title="Комментарий к заказу"
                              :error="formError.comment"
                              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                         name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price * item.amount | numberFormats }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b>
              товара на сумму
              <b>{{ totalPrice | numberFormats }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery"
                  type="submit"
                  :disabled="orderLoading"
          >
            Оформить заказ
          </button>
        </div>
        <div v-if="orderLoading">
          <img src="@/assets/loading.gif" alt="loading...">
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters } from 'vuex';
import numberFormats from '@/helpers/numberFormat';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

export default {
  name: 'OrderPage',
  components: { BaseFormTextarea, BaseFormText },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    };
  },
  filters: { numberFormats },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalCount: 'cartProductsAmount',
    }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderLoading = true;
      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          setTimeout(() => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.orderLoading = false;
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            this.orderLoading = false;
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          }, 1000);
        });
    },
  },
};
</script>

<style scoped>

</style>
