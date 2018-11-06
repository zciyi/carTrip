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
        <table class="P-companyBalanceTable">
            <tr>
                <td>发货地</td>
                <td>收货地</td>
                <td>规格型号</td>
                <td>理论重量</td>
                <td>运输米数</td>
                <td>总重量</td>
                <td>单价</td>
                <td>金额</td>
            </tr>
            <tr class="row" v-show="allDat.startPlace">
                <td>{{allDat.startPlace}}</td>
                <td class="col">
                    <div  v-for="a in allDat.items" track-by="$index">
                        {{a.endPlace}}
                    </div>
                </td>
                <td class="col">
                    <div  v-for="a in allDat.items" track-by="$index" v-show="a.model">
                        {{a.model}}
                    </div>
                </td>
                <td class="col">
                    <div  v-for="a in allDat.items" track-by="$index">
                        {{a.theoreticalWeight||0}}
                    </div>
                </td>
                <td class="col">
                    <div  v-for="a in allDat.items" track-by="$index">
                        {{a.allTransportationMeter||0}}
                    </div>
                </td>
                <td class="col">
                    <div  v-for="a in allDat.items" track-by="$index">
                        {{a.allTotalWeight||0}}
                    </div>
                </td>
                <td class="col">
                    <div  v-for="a in allDat.items" track-by="$index">
                        {{a.unitPrice||0}}
                    </div>
                </td>
                <td class="col">
                    <div  v-for="a in allDat.items" track-by="$index">
                        {{a.money||0}}
                    </div>
                </td>
            </tr>
            <tr v-show="!allDat.startPlace">
                <td colspan="8">暂无数据</td>
            </tr>
            
        </table>
        <!-- <div class="P-companyBalanceCon">
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
                <div>{{allDat.model}}</div>
                <div>{{allDat.theoreticalWeight||0}}</div>
                <div>{{allDat.unitPrice||0}}</div>
                <div>{{allDat.allTransportationMeter||0}}</div>
                <div>{{allDat.allTotalWeight||0}}</div>
                <div>{{allDat.allMoney||0}}</div>
            </div>
        </div> -->
        <div class="P-companyBalanceExport">
            <el-button  type="primary" size="large" class="M-Btn" @click="exportDat">导出</el-button>
       </div>
    </div>
</template>

<script>
    import './companyBalance.less'
    var timeString = function (value) {
        return  +new Date(value);

    }
    var Token = localStorage.getItem("_SHANDONG_PASS_IN_TOKEN")||""

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
                allDat:{
                    startPlace:'',
                    endPlace:'',
                    model:'',
                    theoreticalWeight:'',
                    unitPrice:'',
                    allTransportationMeter:'',
                    allTotalWeight:'',
                    allMoney:''
                },
                queryDat:{
                    carNumber:'',
                    startPlace:'',
                    startTime:'',
                    endTime:''
            }
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
            },
            exportDat(){
                if(!this.queryDat ||!this.queryDat.startPlace){
                    return this.tip( '请搜索发货地');

                }
                var me =this
                var url= this.$config.protocol+"://"+this.$config.biServer+this.$config.apis["/exportCarTripCompanyBalance"]+"?" ;
                if(this.queryDat){
                    Object.keys(this.queryDat).forEach(function(item){
                        url+=item+"="+me.queryDat[item]+"&"
                    })
                }
                url+="X-Authorization="+Token;
                window.location.href = url;

            },
             tip(title,type,duration){
                this.$notify({
                    title: title || '',
                    type: type||'success',
                    duration:duration||1000
                });

            }
            
        }
    }
</script>