import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Dashboard from './pages/User/Dashboard'
import Love from './pages/User/Love'


import Create from './pages/Post/Create'
import Post from './pages/Post/Post'
import View from './pages/Post/View'
import Category from './pages/Post/Category'

import Logout from './pages/Auth/Logout'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'

import Home from './pages/Home'
import Search from './pages/Search'




export default new VueRouter({
  mode: 'history',
  routes : [
    { 
      path: '/', 
      component: Home, 
      name: 'home' 
    },
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
      name: 'dashboard' 
    },
    { 
      path: '/create/', 
      component: Create, 
      name: 'Create' 
    },
    { 
      path: '/post/:id', 
      component: Post, 
      name: 'post' 
    },
    { 
      path: '/view/:id-:slug', 
      component: View, 
      name: 'view' 
    },
    { 
      path: '/category/:id', 
      component: Category, 
      name: 'category' 
    },
    { 
      path: '/love', 
      component: Love, 
      name: 'love' 
    },
    { 
      path: '/search/:search', 
      component: Search, 
      name: 'search' 
    },
  ]
});


