import Vue from 'vue'
import VueRouter from 'vue-router'
import Word from '../components/Word.vue'
import Home from '../views/Home'
import Recite from '../views/Recite'
import ChangeBook from '../views/ChangeBook'
import BookDetail from '../views/BookDetail'
import Glass from '../components/Glass'
import Search from '../views/Search'
import Set from '../components/Set'
import Mine from '../views/Mine'
//广告
import Ad from '../components/Ad'
//我的词书
import MyBooks from '../components/MyBooks'
Vue.use(VueRouter)

  const routes = [
  // 我的页面
  {
    path: '/mine',
    name: 'Mine',
    component:Mine
  },
  //设置页面
  {
    path: '/set',
    name: 'Set',
    component:Set
  },
  // 查单词
  {
    path:'/search',
    name:"Search",
    component:Search
  },
  //我的词书
  {
    path: '/mybooks',
    name: 'MyBooks',
    component: MyBooks
  },
  {
    path:'/glass',
    name:"Glass",
    component:Glass
  },
  {
    path:'/word',
    name:"Word",
    component:Word
  },
  {
    path:'/recite',
    name:'Recite',
    component:Recite
  },
  {
    path: '/',
    name:"Home",
    component:Home
  },
  {
    path: '/changebook',
    name: 'ChangeBook',
    component: ChangeBook,
    
  },
  {
    path: '/changebook/bookdetail',
    name: 'BookDetail',
    component: BookDetail,
    
  },
  {
    path: '/ad',
    name: 'Ad',
    component: Ad
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
