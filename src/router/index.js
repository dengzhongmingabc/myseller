import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods.vue'
import Mall from '../components/mall/Mall.vue'
import Ratings from '../components/ratings/Ratings.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:('/goods'),
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/malls',
      name: 'malls',
      component: Mall
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ]
})
