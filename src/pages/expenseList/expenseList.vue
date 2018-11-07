<template>
    <div class="P-list">
        <div class="M-search">
            <el-input v-model="search.carNumber" placeholder="车牌号"></el-input>
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
        <!-- <div class="addBtn M-Con-left" >
            <el-button type="primary"  class="M-Btn"  @click="add()">录入 </el-button>
        </div>
       :summary-method="getSummaries"
            show-summary 
        </div> -->
        <el-table
            :data="tableData"
            style="width: 100%;" >
            <el-table-column
            prop="tripTime"
            label="日期">
                <template slot-scope="scope">
                    {{scope.row.tripTime|timeStr}}    
                </template>
            </el-table-column>
            <el-table-column
            prop="carNumber"
            label="车牌号">
            </el-table-column>
            <el-table-column
            prop="costOilAmout"
            label="加油数量">
            </el-table-column>
            <el-table-column
            prop="costOilMoney"
            label="加油费用">
            </el-table-column>
            <el-table-column
            prop="costTyreMoney"
            label="轮胎费用">
            </el-table-column>
            <el-table-column
            prop="costPartsMoney"
            label="配件费用">
            </el-table-column>
            <el-table-column
            prop="costOtherMoney"
            label="其它费用">
            </el-table-column>
            <el-table-column
            prop="costAllMoney"
            label="总费用">
            </el-table-column>
            <el-table-column
            prop="payType"
            label="付款方式">
            </el-table-column>
            <el-table-column
            prop="remark"
            label="备注">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <!-- <el-button @click="add(scope)" type="text" size="small">编辑</el-button> -->
                    <el-button @click="deleteList(scope)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pagesSizes"
            :page-size="pagesSize"
            layout="total,prev, pager, next,sizes,jumper"
            :total="total">
            </el-pagination>
        </div>
        <!-- <div class="P-listExport">
             <el-button  type="primary" size="large" class="M-Btn" @click="exportDat">导出</el-button>
        </div> -->
    </div>
</template>

<script>
    import './expenseList.less'
    var timeString = function (value) {
        return  +new Date(value);

    }
    var Token = localStorage.getItem("_SHANDONG_PASS_IN_TOKEN")||""
    export default {
        data() {
            return {
                tableData: [],
                currentPage:1,
                total:0,
                pagesSize:100,
                pagesSizes:[100,200,500,1000],
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
            this.getData(this.currentPage,this.pagesSize);
        },
        methods: {
            getData(pageNo,pageSize,qr){
                var me = this;
                this.queryDat =qr;
                this.$request({
                    url:"/getCarTripCostList",
                    method:"get",
                    query:{
                        pageNo:pageNo,
                        pageSize:pageSize,
                        carNumber:(qr&&qr.carNumber)||'',
                        startTime:timeString(qr&&qr.startTime)||'',
                        endTime:timeString(qr&&qr.endTime)||''
                    }
                }).then(function(re){
                    me.tableData = re.items;
                    me.currentPage = re.pageNo;
                    me.pagesSize = re.pageSize;
                    me.total = re.total;
                    me.allDat = re.listStatistics;
                })
            },
            handleSizeChange(val) {
                this.getData(this.currentPage,val);
            },
            handleCurrentChange(val) {
                this.getData(val,this.pagesSize);
            }
            ,add(scope){
                var query = {};
                if(scope){
                    query.id = scope.row.id
                }
                this.$router.push({path:"/listEdit",query:query})
            },
            tip(title,type,duration){
                this.$notify({
                    title: title || '',
                    type: type||'success',
                    duration:duration||1000
                });

            },
            deleteList(scope){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    var me = this;
                    var params={}
                    params.id = scope.row.id
                    if(me.loadDelete)return
                    me.loadDelete = true;
                    me.$request({
                        url:"/deleteCarTripCost",
                        method:"delete",
                        params:params,
                        data:{}
                    }).then(function(re){
                        me.loadDelete = false;
                        me.tip( '删除成功!');
                        me.getData(me.currentPage,me.pagesSize);
                    },function(){
                        me.loadDelete = false;
                    })
                }).catch(() => {

                });
            },
            getSummaries(param) {
                var me =this
                const { columns, data } = param;
                const arrList= ["allTransportationMeter","allTotalWeight","allTransportationKilometers","allOneHundredKilometersOil","allOneKilometersOil","allTotalOil","allOverWeightExtract","allOneTripExtract",'','allMoney'];
 
                const sums=[]
                if(columns.length&&data.length){
                    columns.forEach((column, index) => {
                        if (index === 0) {
                            sums[index] = '总计';
                            return;
                        }
                        const values = data.map(item => Number(item[column.property]));
                        if(index>5&&arrList[index-6]){
                            sums[index]= me.allDat[arrList[index-6]] 
                        }else{
                            sums[index] = '';
                        }
                        
                    });

                }

                return sums;
            },
            searchData(){
                if(this.search.startTime&&this.search.endTime&&(+new Date(this.search.startTime)> +new Date(this.search.endTime))){
                    return this.tip( '开始时间不能大于结束时间');
                }               
                this.currentPage =1;
                this.getData(1,this.pagesSize,this.search);
            },
            exportDat(){
                var me =this
                var url= this.$config.protocol+"://"+this.$config.biServer+this.$config.apis["/exportCarTripList"]+"?" ;
                if(this.queryDat){
                    Object.keys(this.queryDat).forEach(function(item){
                        url+=item+"="+me.queryDat[item]+"&"
                    })
                }
                url+="X-Authorization="+Token;
                window.location.href = url;

            }
        }
    }
</script>