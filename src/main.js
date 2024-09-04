import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'   // 引入axios

axios.interceptors.request.use(config => {
  let jwt = localStorage.getItem('authorization');
  if (jwt) {
    config.headers.Authorization = jwt;
  }
  return config;
  }
)
Vue.prototype.$axios = axios  // 全局注册axios
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
