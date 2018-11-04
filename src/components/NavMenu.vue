
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
            text:"车队运输明细列表",
            path:"/list"
          },{
            text:"公司对账单",
            path:"/companyBalance"
          },{
            text:"车辆费用录入",
            path:"/expenseInsert"
          },{
            text:"车辆费用明细",
            path:"/expenseList"
          },{
            text:"车辆工资报表",
            path:"/expenseReport"
          },{
            text:"规格",
            path:"/modelList"
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