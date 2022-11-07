import Vue from 'vue'
import Router from 'vue-router'
import RandomJokes from '@/components/RandomJokes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RandomJokes',
      component: RandomJokes
    }
  ]
})
