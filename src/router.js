import Vue from 'vue'
import Router from 'vue-router'
import Random from './views/Random'
import Register from './views/Register'
import Wait from './views/Wait'
import Wand from './views/Wand'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/random',
      name: 'random',
      component: Random
    },
    {
      path: '/wand/:id',
      name: 'wand',
      component: Wand
    },
    {
      path: '/register/:id',
      name: 'register',
      component: Register
    }
    ,
    {
      path: '/wait/:id',
      name: 'wait',
      component: Wait
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
