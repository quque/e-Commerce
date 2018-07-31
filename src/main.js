import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueLazyload from "vue-lazyload";
import index from './components/index.vue';
import goodsInfo from './components/goodsInfo.vue';
import shoppingcar from './components/shoppingcar.vue';
import axios from "axios";
import moment from "moment";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from "iview"
import 'iview/dist/styles/iview.css';
import Vuex from "vuex"



axios.defaults.baseURL = 'http://47.106.148.205:8899';
Vue.prototype.axios = axios;
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueLazyload, {
  // 图片当做资源来引入
  loading: require('./assets/img/loading2.gif')
});
Vue.use(ElementUI);
Vue.use(iView);
let buyList = JSON.parse(window.localStorage.getItem("buyList")) || {};
const router = new VueRouter({
  routes: [{
      path: "/",
      redirect: "/index"
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/goodsInfo/:id',
      component: goodsInfo
    },
    {
      path: '/shoppingcar',
      component: shoppingcar
    }
  ]
})
const store = new Vuex.Store({
  state: {
    buyList
  },
  mutations: {

    buyGoods(state,info){
      if(state.buyList[info.goodsId]){
          let oldNum = parseInt(state.buyList[info.goodsId])
          oldNum+=parseInt(info.goodsNum)
          state.buyList[info.goodsId] = oldNum
      }else{
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    }
  }
})


Vue.config.productionTip = false;

Vue.filter('cutTime', function (value) {
  return moment(value).format("YYYY年MM月DD日");
});
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
})