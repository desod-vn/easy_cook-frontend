import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Article from './components/dashboard/Article'
import Category from './components/dashboard/Category'

import Dashboard from './components/dashboard/Dashboard'

import Logout from './components/Logout'
import Register from './components/Register'
import Login from './components/Login'


export default new VueRouter({
  mode: 'history',
  routes : [
    { 
      path: '/login', 
      component: Login, 
      name: 'login' 
    },
    { 
      path: '/register', 
      component: Register, 
      name: 'register' 
    },
    { 
      path: '/logout', 
      component: Logout, 
      name: 'logout' 
    },
    {
      path: '/dashboard', 
      component: Dashboard, 
      name: 'dashboard',
      children: [
        { 
          path: '/category', 
          component: Category, 
          name: 'category' 
        },
        { 
          path: '/article', 
          component: Article, 
          name: 'article' 
        }
      ]
    }
  ]
});
    