<template>
    <div class="P-insert">
        <div class="P-insertBase">
            <div class="P-insertBaseTip">批量默认值</div>
            <div class="P-insertBaseMain">
                <div  class="P-insertBaseCon">
                    <div>日期</div>
                    <div>车牌号</div>
                    <div>出发地</div>
                    <div>收货地</div>
                    <div>规格型号</div>
                    <div>理论重量</div>
                    <div>单趟提成</div>
                    <div>单价/吨</div>
                    
                </div>
                <div class="P-insertBaseCon">
                    <div><input type="text" v-model="base.tripTime" /></div>
                    <div><input type="text" v-model="base.carNumber" /></div>
                    <div><input type="text" v-model="base.startPlace" /></div>
                    <div><input type="text" v-model="base.endPlace" /></div>
                    <div><input type="text" v-model="base.model" /></div>
                    <div><input type="text" v-model="base.theoreticalWeight" /></div>
                    <div><input type="text" v-model="base.oneTripExtract" /></div>
                    <div><input type="text" v-model="base.unitPrice" /></div>
                </div>
            </div>
            
        </div>
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
            prop="model"
            label="规格型号">
            </el-table-column>
            <el-table-column
            prop="theoreticalWeight"
            label="理论重量">
            </el-table-column>
            <el-table-column
            prop="transportationMeter"
            label="运输米数">
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

    </div>
</template>

<script>
    import './insert.less'

    export default {
        data() {
            return {
                base:{
                    tripTime:'',
                    carNumber:'',
                    startPlace:'',
                    endPlace:'',
                    model:'',
                    theoreticalWeight:'',
                    oneTripExtract:'',
                    unitPrice:''
                }
            }
        },
        methods: {

        }
        
    }

</script>