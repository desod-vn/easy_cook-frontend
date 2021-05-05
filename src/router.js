import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import Article from './components/dashboard/Article'
// import newArticle from './components/dashboard/newArticle'
// import newCategory from './components/dashboard/newCategory'
// import editCategory from './components/dashboard/editCategory'

import Dashboard from './pages/Dashboard'
import Post from './pages/Post'
import View from './pages/View'
import Category from './pages/Category'

import Logout from './pages/Logout'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'



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
    // {
    //   path: '/dashboard', 
    //   component: Dashboard, 
    //   name: 'dashboard',
    //   children: [
    //     { 
    //       path: '/category', 
    //       component: newCategory, 
    //       name: 'newCategory' 
    //     },
    //     { 
    //       path: '/category/edit/:id', 
    //       component: editCategory, 
    //       name: 'editCategory',
    //       props: true
    //     },
    //     { 
    //       path: '/article', 
    //       component: newArticle, 
    //       name: 'newArticle' 
    //     },
    //     { 
    //       path: '/articles', 
    //       component: Article, 
    //       name: 'Article' 
    //     }
      // ]
    // }
  ]
});
    