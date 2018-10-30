<template>
    <div class="P-companyBalance">
        <div class="M-search">
            <!-- <el-input v-model="search.carNumber" placeholder="车牌号"></el-input> -->
            <el-input v-model="search.startPlace" placeholder="发货地"></el-input>
            <!-- <el-input v-model="search.endPlace" placeholder="收货地"></el-input> -->
            <el-date-picker
                v-model="search.startTime"
                type="date"
                placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
                v-model="search.endTime"
                type="date"
                placeholder="结束日期">
            </el-date-picker>
            
            <el-button  type="primary" size="large" class="M-Btn" @click="searchData">搜索</el-button>
        </div>
        <div class="P-companyBalanceCon">
            <div  class="P-companyBalanceMain">
                <div>发货地</div>
                <div>收货地</div>
                <div>规格型号</div>
                <div>理论重量</div>
                <div>运输米数</div>
                <div>总重量</div>
                <div>单价</div>
                <div>金额</div>
            </div>
            <div class="P-companyBalanceMain">
                <div>{{allDat.startPlace}}</div>
                <div>{{allDat.endPlace}}</div>
                <div>{{allDat.model|}}</div>
                <div>{{allDat.theoreticalWeight||0}}</div>
                <div>{{allDat.unitPrice||0}}</div>
                <div>{{allDat.allTransportationMeter||0}}</div>
                <div>{{allDat.allTotalWeight||0}}</div>
                <div>{{allDat.allMoney||0}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import './companyBalance.less'
    var timeString = function (value) {
        return  +new Date(value);

    }
    export default {
        data() {
            return {
                search:{
                    carNumber:"",
                    startPlace:"",
                    endPlace:"",
                    startTime:"",
                    endTime:""
                },
                allDat:{},
                queryDat:{}
            }
        },
        created:function(){
            this.getData();
        },
        methods: {
            getData(qr){
                var me = this;
                this.queryDat =qr;
                this.$request({
                    url:"/getCompanyBalance",
                    method:"get",
                    query:{
                        carNumber:(qr&&qr.carNumber)||'',
                        startPlace:(qr&&qr.startPlace)||'',
                        endPlace:(qr&&qr.endPlace)||'',
                        startTime:timeString(qr&&qr.startTime)||'',
                        endTime:timeString(qr&&qr.endTime)||''
                    }
                }).then(function(re){
                    me.allDat = re;
                })
            },
            searchData(){
                if(this.search.startTime&&this.search.endTime&&(+new Date(this.search.startTime)> +new Date(this.search.endTime))){
                    return this.tip( '开始时间不能大于结束时间');
                }               
                this.currentPage =1;
                this.getData(this.search);
            }
            
        }
    }
</script>