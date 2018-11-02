<template>
    <div class="P-insert">
        <div class="P-insertBase">
            <div class="P-insertBaseTip">批量默认值</div>
            <div class="P-insertBaseMain">
                <div  class="P-insertBaseCon">
                    <div>日期</div>
                    <div>车牌号</div>
                    <div>加油数量</div>
                    <div>加油费用</div>
                    <div>轮胎费用</div>
                    <div>配件费用</div>
                    <div>其它费用</div>
                    <div>总费用</div>
                    <div>付款方式</div>
                    
                </div>
                <div class="P-insertBaseCon">
                    <div>
                        <el-date-picker
                            v-model="base.tripTime" 
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div><input type="text" v-model="base.carNumber" /></div>
                    <div><input type="text" v-model="base.costOilAmout" /></div>
                    <div><input type="text" v-model="base.costOilMoney"/></div>
                    <div><input type="text" v-model="base.costTyreMoney" /></div>
                    <div><input type="text" v-model="base.costPartsMoney" /></div>
                    <div><input type="text" v-model="base.costOtherMoney" /></div>
                    <div><input type="text" v-model="base.costAllMoney" /></div>
                    <div><input type="text" v-model="base.payType" /></div>
                </div>
            </div>
            
        </div>
        <div class="addBtn M-Con-left">
            <el-button class="M-Btn" type="primary" @click="add">添加一行记录</el-button>
        </div>
        <!--  @cell-mouse-leave ="leaveTable" -->
        <el-table
            :data="tableData"
           
            style="width: 100%;" >
            <el-table-column
            prop="tripTime"
            label="日期">
                <template slot-scope="scope">
                    <!-- {{scope.row.tripTime|timeStr}}    -->
                    <el-date-picker
                        v-model="scope.row.tripTime" 
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
            prop="carNumber"
            label="车牌号">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.carNumber" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="costOilAmout"
            label="加油数量">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.costOilAmout"/> 
                </template>
            </el-table-column>
            <el-table-column
            prop="costOilMoney"
            label="加油费用">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.costOilMoney"/> 
                </template>
            </el-table-column>
            <el-table-column
            prop="costTyreMoney"
            label="轮胎费用">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.costTyreMoney" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="costPartsMoney"
            label="配件费用">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.costPartsMoney" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="costOtherMoney"
            label="其它费用">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.costOtherMoney" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="costAllMoney"
            label="总费用">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.costAllMoney" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="payType"
            label="付款方式">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.payType" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="remark"
            label="备注">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.remark" /> 
                </template>
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
        <div>
            <el-button class="M-Btn" type="primary" @click="save">保存</el-button>

        </div>
        <el-dialog
            :title="pop.title"
            :visible.sync="pop.visible"
            width="60%"
            :before-close="pop.close"
            center>
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item  >
                <span slot="label">{{form.text}}</span>
                <el-input v-model="form.value" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button class="M-Btn" @click="pop.visible = false">取 消</el-button>
                <el-button class="M-Btn" type="primary" @click="pop.confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import './expenseInsert.less'
    var format  ={
        // 乘法精度问题
        mul:function(a, b) {
            var c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) {}
            try {
                c += e.split(".")[1].length;
            } catch (f) {}
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        },
        // 加法
        add:function(num1, num2) {  
            var baseNum, baseNum1, baseNum2;  
            try {  
                baseNum1 = num1.toString().split(".")[1].length;  
            } catch (e) {  
                baseNum1 = 0;  
            }  
            try {  
                baseNum2 = num2.toString().split(".")[1].length;  
            } catch (e) {  
                baseNum2 = 0;  
            }  
            baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));  
            return (num1 * baseNum + num2 * baseNum) / baseNum;  
        },
        //减法函数
        subtraciotn:function(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            //last modify by deeka
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        //除法函数
        // accDiv:function(arg1, arg2) {
        //     var t1 = 0, t2 = 0, r1, r2;
        //     try {
        //         t1 = arg1.toString().split(".")[1].length;
        //     }
        //     catch (e) {
        //     }
        //     try {
        //         t2 = arg2.toString().split(".")[1].length;
        //     }
        //     catch (e) {
        //     }
        //     with (Math) {
        //         r1 = Number(arg1.toString().replace(".", ""));
        //         r2 = Number(arg2.toString().replace(".", ""));
        //         return (r1 / r2) * pow(10, t2 - t1);
        //     }
        // } 
    };
    export default {
        data() {
            var me =this;
            var base= localStorage.getItem("_CARTRIP_EXPENSE_INSERT_") && JSON.parse(localStorage.getItem("_CARTRIP_EXPENSE_INSERT_")) 
            return {
                base:{
                    tripTime: (base&&base.tripTime)||'',
                    carNumber:(base&&base.carNumber)||'',
                    costOilAmout:(base&&base.costOilAmout)||'',
                    costOilMoney:(base&&base.costOilMoney)||'',
                    costTyreMoney:(base&&base.costTyreMoney)||'',
                    costPartsMoney:(base&&base.costPartsMoney)||'',
                    costOtherMoney:(base&&base.costOtherMoney)||'',
                    costAllMoney:(base&&base.costAllMoney)||'',
                    payType:(base&&base.payType)||'',
                },
                tableData:[]
                ,pop:{
                    visible:false,
                    item:null,
                    type:'',
                    key:"",
                    close:(done)=>{
                        done()
                    },
                    confirm:function(){
                        switch( me.pop.type){
                            case"base":
                                me.base[me.pop.key] = me.form.value;
                                break
                            case"table":
                                me.tableData[me.pop.item.$index][me.pop.key]=me.form.value;
                                me.$set(me.tableData,me.tableData[me.pop.item.$index],me.tableData[me.pop.item.$index])
                                break
                        }
                        me.pop.visible = false;

                    }
                },
                form:{
                    value:"",
                    text:''
                }
            }
        },
        destroyed: function () {
            localStorage.setItem("_CARTRIP_EXPENSE_INSERT_",JSON.stringify(this.base) )
        },
        methods: {
            formatNum(val){
                return Number(val.toString().match(/^\d+(?:\.\d{0,5})?/))
            },
            leaveTable(row, column, cell, event){
                row.totalWeight=this.formatNum(format.mul(row.theoreticalWeight,row.transportationMeter)) 
                row.oneHundredKilometersOil = this.formatNum(row.totalWeight?format.add(40,format.mul(format.subtraciotn(row.totalWeight,40),0.4)):0)
                row.oneKilometersOil =  this.formatNum(row.oneHundredKilometersOil/100);
                row.totalOil = this.formatNum(format.mul(row.transportationKilometers,row.oneKilometersOil));
                
                if(Number(row.totalWeight)>70){
                    if(row.transportationKilometers > 120){
                        row.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(row.totalWeight,70),7));
                    }else{
                        row.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(row.totalWeight,70),5));
                    }
                }else{
                    row.overWeightExtract = 0;
                }

                // if(Number(row.transportationKilometers)>70&&Number(row.transportationKilometers)<=110){
                //     row.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(row.transportationKilometers,70),5));
                // }else if(Number(row.transportationKilometers)>110){
                //     row.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(row.transportationKilometers,110),7));
                // }else{
                //     row.overWeightExtract = 0;
                // }
                row.totalOil = this.formatNum(format.mul(row.transportationKilometers,row.oneKilometersOil));
                row.money = this.formatNum(format.mul( row.totalWeight,row.unitPrice));
            },
            add(){
                this.tableData.push({
                    tripTime:this.base.tripTime||'',
                    carNumber:this.base.carNumber||'',
                    costOilAmout:this.base.costOilAmout||'',
                    costOilMoney:this.base.costOilMoney||'',
                    costTyreMoney:this.base.costTyreMoney||'',
                    costPartsMoney:this.base.costPartsMoney||'',
                    costOtherMoney:this.base.costOtherMoney||'',
                    costAllMoney:this.base.costAllMoney||'',
                    payType:this.base.payType||'',
                    remark:""
                })
            },
            deleteList(scope){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.tableData.splice(scope.$index,1)
                })
            },
            save(){
                if(!this.tableData.length){
                    return this.tip('请添加数据');
                }
                var me =this;
                if(me.load)return
                me.load = true
                this.$request({
                    url:"/batchCarTripCost",
                    method:"post",
                    params:{},
                    data:{
                        items:this.tableData
                    }
                }).then(function(re){
                    me.load = false;
                    if(re){
                        me.tip('保存成功');
                        me.tableData=[]
                    }
                },function(){
                    me.tip('保存失败',"warning");
                    me.load = false;
                })
            },
            tip(title,type,duration){
                this.$notify({
                    title: title || '',
                    type: type||'success',
                    duration:duration||1000
                });

            },
            showPop(row,type,name,key){
               
                this.pop.title = name;
                this.form.text = name;
                this.pop.type = type;
                switch(type){
                    case"base":
                        this.form.value = row;
                        this.pop.title = "批发默认值"+name;
                        this.form.text = "批发默认值"+name;
                        break
                    case"table":
                        this.form.value = row[key];
                        break
                }
                this.pop.item = row;
                this.pop.key = key;
                this.pop.visible = true;
            }

        }
        
    }

</script>