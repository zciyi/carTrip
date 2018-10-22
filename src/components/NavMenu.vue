
<template>
  <div class="M-navMenu">
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
          <el-tab-pane :label="n.text" :name="n.path" v-for ='n in nav' :key="n.path"></el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import './NavMenu.less'
  export default {
    name:"NavMenu",
    data(){
        return {
          nav:[{
            text:"运输管理",
            path:"/list"
          }]
          ,activeName:this.$route.path||"/list"
        }
    },
    methods: {
      handleClick(e){
        this.$router.push({path:e.name})
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }

    }
  }
</script>