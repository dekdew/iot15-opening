import Vue from 'vue'
import Router from 'vue-router'
import Random from './views/Random'
import Register from './views/Register'
import Wait from './views/Wait'
import Wand from './views/Wand'
import Home from './views/Home'
import Group from './views/Group'
import GroupControl from './views/GroupControl'

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
    },
    {
      path: '/group',
      name: 'group',
      component: Group
    },
    {
      path: '/group/control-password-334334334',
      name: 'groupcontrol',
      component: GroupControl
    }
  ]
})
