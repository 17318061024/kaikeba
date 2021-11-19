import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('./views/test2.vue')
    },
  ]
})
