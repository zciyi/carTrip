import Vue from 'vue'
import Router from 'vue-router'
import contenMain from '@/pages/contenMain'
import login from '@/pages/login/login'
import forbidden from "@/pages/forbidden"
import list from "@/pages/list/list"
import listEdit from "@/pages/list/listEdit"
import companyBalance from "@/pages/companyBalance/companyBalance"
import insert from "@/pages/insert/insert"
import expenseInsert from "@/pages/expenseInsert/expenseInsert"
import expenseList from "@/pages/expenseList/expenseList"
import expenseReport from "@/pages/expenseReport/expenseReport"
import modelList from "@/pages/model/model"



Vue.use(Router)
var routes = new Router({
  routes: [
    {
      path: '/contenMain',
      name: 'contenMain',
      component: contenMain,
      children: [
        { path: '/listEdit', component: listEdit, name: 'listEdit',text:"listEdit"},
        { path: '/insert', component: insert, name: 'insert',text:"车队运输明细录入"},
        { path: '/list', component: list, name: 'list',text:"车队运输明细列表"},
        { path: '/companyBalance', component: companyBalance, name: 'companyBalance',text:"公司对账单"},
        { path: '/expenseInsert', component: expenseInsert, name: 'expenseInsert',text:"车辆费用录入"},
        { path: '/expenseList', component: expenseList, name: 'expenseList',text:"车辆费用明细"},
        { path: '/expenseReport', component: expenseReport, name: 'expenseReport',text:"车辆工资报表"},
        { path: '/modelList', component: modelList, name: 'modelList',text:"规格"}
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
