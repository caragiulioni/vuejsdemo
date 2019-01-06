import Vue from 'vue'
import Router from 'vue-router'
import GitSearch from '@/components/GitSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GitSearch',
      component: GitSearch
    }
  ]
})
