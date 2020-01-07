import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import cookies from 'vue-cookies';
import 'vue-awesome/icons';
import 'vue-awesome/icons/flag';
import Icon from 'vue-awesome/components/Icon'


Vue.config.productionTip = false;
Vue.use(cookies);
Vue.component('v-icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

