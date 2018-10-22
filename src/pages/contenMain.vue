<template>
   <div class="P-layout">
        <top-header></top-header>
        <el-row :gutter="20" class="P-layoutMain">
            <el-col :span="24" class="P-layoutCon">
                <div class="P-layoutBreadcrumb">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: c.path }" v-for="c in curNav" :key="c.path">{{c.text}}</el-breadcrumb-item>
                  </el-breadcrumb>
                </div>
                <div class="P-layoutMainCon">
                  <transition name="fade"
                    mode="out-in">
                    <router-view></router-view>
                  </transition>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import TopHeader from '@/components/header'
var cur =[]
export default {
  name: 'contenMain',
  data () {
    return {
      curNav:this.getNav(this.$route.path)||[]
    }
  },
  methods:{
    forItem (dat,val,cur,curarry,isPass){
      var me = this
      dat.forEach(function(d){
        curarry = curarry || []
        if(!isPass){
          if(d.path===val) {
            cur.push(d);
            if(curarry.length){
              curarry.forEach(function(i){
                 cur.push(i);
              })
              cur.reverse();
              curarry = [];
            }
            isPass = true
          }else if(d.hasSubNav&&!isPass){
            curarry.push(d)
            me.forItem(d.subNav,val,cur,curarry,isPass)
          }
          curarry = [];
        }else{
          curarry = [];
        }
        
      })
    },

    getNav(val){
      cur = [];
      var me = this;
      var breadcrumb = [{
        text:"运输管理",
        path:"/list"
        ,hasSubNav:true
        ,subNav:[{
            text:"运输管理编辑",
            path:"/listEdit"
          }
        ]
      }]
      this.forItem(breadcrumb,val,cur,[])
      return cur
    }

  },
  components:{
    "navList":NavMenu,
     "topHeader":TopHeader
  },
  watch:{
    "$route.path":function(nval,oval){
      if(nval&&oval&&nval!==oval){
        this.curNav = []
        cur = [];
        this.curNav = this.getNav(nval)
      }

    }
  }
}
</script>
