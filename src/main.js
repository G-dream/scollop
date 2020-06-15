import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(VueAxios,axios)
Vue.use(Vuex)
const store = {
  state:{
    type:1, //0美音，1 英音
    total: 10,
    classify: 4,
    current:{ //当前正在背的书
      // classify:1,
      // name:'好小学',
      // process:2,
      // total:5,
      // book_src:'/img/classify1_0.921d7247.jpg'
    },
    history:[ //历史背过的书
      // {
      //   classify:1,
      //   name:'好小学',
      //   process:2,
      //   total:5,
      //   book_src:'/img/classify1_0.921d7247.jpg'
      // }
      
    ]
  },
  setters:{
  }
}

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
