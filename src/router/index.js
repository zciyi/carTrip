import Vue from 'vue'
import Router from 'vue-router'
import contenMain from '@/pages/contenMain'
import login from '@/pages/login/login'
import forbidden from "@/pages/forbidden"
import list from "@/pages/list/list"
import listEdit from "@/pages/list/listEdit"



Vue.use(Router)
var routes = new Router({
  routes: [
    {
      path: '/contenMain',
      name: 'contenMain',
      component: contenMain,
      children: [
        { path: '/list', component: list, name: 'list',text:"list"},
        { path: '/listEdit', component: listEdit, name: 'listEdit',text:"listEdit"},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: forbidden
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/forbidden' }
    },
    {
      path: '/',
      hidden: true,
      redirect: { path: 'list' }
    }
  ]
})

routes.beforeEach(({meta, path}, from, next) => {
  const {auth = false} = meta   
  var isLogin = false;
  var getDat = localStorage.getItem("_SHANDONG_PASS_IN")
  var isPassLogin = localStorage.getItem("_SHANDONG_PASS_IN_WITHOUT_TOKEN")||true
  isPassLogin = true
  getDat = JSON.parse(getDat)
  if(getDat){
    var keep =true
    getDat._SHANDONG_PASS_IN && getDat._SHANDONG_PASS_IN.forEach(i => {
      getDat._SHANDONG_PASS_IN_VALUE &&getDat._SHANDONG_PASS_IN_VALUE.forEach(v=> {
        if(!v[i]){
          keep =false
        }
      })
     
    });
    if((new Date().getTime()-getDat.TIME)>86400*1000){
      keep =false
    }
    isLogin = keep;

  }
　　
　if (((auth && !isLogin)||(isPassLogin==='0')) && path !== '/login') {  
　　　return next({ path: '/login' })  
　}

  next();
})
export default routes
