
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
            text:"车队运输明细录入",
            path:"/insert"
          },{
            text:"车队运输明细",
            path:"/list"
          },{
            text:"公司对账单",
            path:"/companyBalance"
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