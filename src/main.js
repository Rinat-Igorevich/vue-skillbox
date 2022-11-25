import Vue from 'vue';
// import { message1, message2 } from '@/messages';
// eslint-disable-next-line import/named
// import { alertFunction } from '@/alert-function';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
// alertFunction(message1);
// alertFunction(message2);
