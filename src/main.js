import Vue from 'vue'
import router from './router'
router.beforeEach((to, from, next) => {
    let excludePages = ['/login', '/register' ,'/']
    let requiredLogin = !excludePages.includes(to.path)
    let user = localStorage.getItem('token')
    if (requiredLogin && !user) {
        next({ name: 'login' })
    }
    next();
});

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import App from './App.vue'





Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
