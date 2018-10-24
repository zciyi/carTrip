<template>
    <div class="P-companyBalance">
        <div class="M-search">
            <el-input v-model="search.carNumber" placeholder="车牌号"></el-input>
            <el-input v-model="search.startPlace" placeholder="发货地"></el-input>
            <el-input v-model="search.endPlace" placeholder="收货地"></el-input>
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
        <el-table
            :data="tableData"
            :summary-method="getSummaries"
            show-summary
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
            prop="startPlace"
            label="发货地">
            </el-table-column>
            <el-table-column
            prop="endPlace"
            label="收货地">
            </el-table-column>
            <el-table-column
            label="规格型号">
                <template slot-scope="scope">
                   <div v-for ='n in scope.row.productDtoList'  class="tableDiv" track-by="$index">{{n.model}}</div> 
                </template>
            </el-table-column>
            <el-table-column
            label="理论重量">
                <template slot-scope="scope">
                   <div v-for ='n in scope.row.productDtoList'  class="tableDiv" track-by="$index">{{n.theoreticalWeight}}</div> 
                </template>
            </el-table-column>
            <el-table-column
            label="运输米数">
                <template slot-scope="scope">
                   <div v-for ='n in scope.row.productDtoList' class="tableDiv" track-by="$index">{{n.transportationMeter}}</div> 
                </template>
            </el-table-column>
            <el-table-column
            prop="totalWeight"
            label="总重量">
            </el-table-column>
            <el-table-column
            prop="transportationKilometers"
            label="运输公里数">
            </el-table-column>
            <el-table-column
            prop="oneHundredKilometersOil"
            label="一百公里应耗油">
            </el-table-column>
            <el-table-column
            prop="oneKilometersOil"
            label="一公里应耗油">
            </el-table-column>
            <el-table-column
            prop="totalOil"
            label="油耗">
            </el-table-column>
            <el-table-column
            prop="overWeightExtract"
            label="超吨提成">
            </el-table-column>
            <el-table-column
            prop="oneTripExtract"
            label="单趟提成">
            </el-table-column>
            <el-table-column
            prop="unitPrice"
            label="单价/吨">
            </el-table-column>
            <el-table-column
            prop="money"
            label="金额">
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
                tableData: [],
                currentPage:1,
                total:0,
                pagesSize:5,
                pagesSizes:[5,10,20,30,40,50],
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
                    url:"/getCarTripList",
                    method:"get",
                    query:{
                        pageNo:pageNo,
                        pageSize:pageSize,
                        carNumber:(qr&&qr.carNumber)||'',
                        startPlace:(qr&&qr.startPlace)||'',
                        endPlace:(qr&&qr.endPlace)||'',
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
            },
            tip(title,type,duration){
                this.$notify({
                    title: title || '',
                    type: type||'success',
                    duration:duration||1000
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
                            sums[index] = '总价';
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
            }
            
        }
    }
</script>