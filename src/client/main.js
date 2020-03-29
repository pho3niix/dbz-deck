import Vue from 'vue';
import App from './app.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import store from './store';
export const SERVER_API = process.env.SERVER_API;

Vue.use(VueAxios, axios, Vuex);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
  });

new Vue(
    {
      store,
      router,
      render: h => h(App),
    }
).$mount('#app')
