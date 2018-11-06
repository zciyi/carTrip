<template>
    <div class="P-insert">
        <div class="P-insertBase">
            <div class="P-insertBaseTip">批量默认值</div>
            <div class="P-insertBaseMain">
                <div  class="P-insertBaseCon">
                    <div>日期</div>
                    <div>车牌号</div>
                    <div>驾驶员</div>
                    <div>发货地</div>
                    <div>收货地</div>
                    <div>规格型号</div>
                    <div>理论重量</div>
                    <div>单趟提成</div>
                    <div>单价/吨</div>
                    
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
                    <div><input type="text" v-model="base.driverName" /></div>
                    <div><input type="text" v-model="base.startPlace" @click="showPop(base.startPlace,'base','发货地','startPlace')" /></div>
                    <div><input type="text" v-model="base.endPlace" @click="showPop(base.endPlace,'base','收货地','endPlace')" /></div>
                    <div>
                        <el-select v-model="base.model" placeholder="请选择" 
                        @change="modelChange">
                            <el-option
                                v-for="item in modelOptions"
                                :key="item.id"
                                :label="item.model"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <!-- <input type="text" v-model="base.model" /> -->
                    </div>
                    <div><input type="text" v-model="base.theoreticalWeight" /></div>
                    <div><input type="text" v-model="base.oneTripExtract" /></div>
                    <div><input type="text" v-model="base.unitPrice" /></div>
                </div>
            </div>
            
        </div>
        <div class="addBtn M-Con-left">
            <el-button class="M-Btn" type="primary" @click="add">添加一行记录</el-button>
        </div>
        <el-table
            :data="tableData"
            @cell-mouse-leave ="leaveTable"
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
            prop="driverName"
            label="驾驶员">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.driverName" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="startPlace"
            label="发货地">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.startPlace" @click="showPop(scope,'table','发货地','endPlace')"/> 
                </template>
            </el-table-column>
            <el-table-column
            prop="endPlace"
            label="收货地">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.endPlace" @click="showPop(scope,'table','收货地','endPlace')"/> 
                </template>
            </el-table-column>
            <el-table-column
            prop="model"
            label="规格型号">
                <template slot-scope="scope">
                    <!-- <input type="text" v-model="scope.row.model" />  -->
                    <el-select v-model="scope.row.model" placeholder="请选择" 
                    @change="modelListChange(scope)">
                        <el-option
                            v-for="item in modelOptions"
                            :key="item.id"
                            :label="item.model"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
            prop="theoreticalWeight"
            label="理论重量">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.theoreticalWeight" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="transportationMeter"
            label="运输米数">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.transportationMeter" /> 
                </template>
            </el-table-column>

            <el-table-column
            prop="totalWeight"
            label="总重量">
                <template slot-scope="scope">
                    {{scope.row.totalWeight}}
                </template>
            </el-table-column>
            <el-table-column
            prop="transportationKilometers"
            label="运输公里数">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.transportationKilometers" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="oneHundredKilometersOil"
            label="一百公里应耗油">
                <template slot-scope="scope">
                    {{scope.row.oneHundredKilometersOil}}
                </template>
            </el-table-column>
            <el-table-column
            prop="oneKilometersOil"
            label="一公里应耗油">
                <template slot-scope="scope">
                    {{scope.row.oneKilometersOil}}
                </template>
            </el-table-column>
            <el-table-column
            prop="totalOil"
            label="油耗">
                <template slot-scope="scope">
                    {{scope.row.totalOil}} 
                </template>
            </el-table-column>
            <el-table-column
            prop="overWeightExtract"
            label="超吨提成">
                <template slot-scope="scope">
                    {{scope.row.overWeightExtract}}
                </template>
            </el-table-column>
            <el-table-column
            prop="oneTripExtract"
            label="单趟提成">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.oneTripExtract" /> 
                </template>
            </el-table-column>
            <el-table-column
            prop="unitPrice"
            label="单价/吨">
                <template slot-scope="scope">
                    <input type="text" v-model="scope.row.unitPrice" /> 
                </template>                                                                                 
            </el-table-column>
            <el-table-column
            prop="money"
            label="金额">
                <template slot-scope="scope">
                    {{scope.row.money}}
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
                <el-autocomplete
                class="inline-input"
                v-model="form.value"
                :fetch-suggestions="querySearch"
                placeholder="请输入"
                @select="handleSelect"
                @blur="changeValue"
                ></el-autocomplete>
                <!-- <el-input v-model="form.value" placeholder="请输入"></el-input> -->
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
    import './insert.less'
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
            var base= localStorage.getItem("_CARTRIP_INSERT_") && JSON.parse(localStorage.getItem("_CARTRIP_INSERT_")) 
            var options = localStorage.getItem("_CARTRIP_INSERT_OPSTIONS_")&& JSON.parse(localStorage.getItem("_CARTRIP_INSERT_OPSTIONS_")) 
            return {
                base:{
                    tripTime: (base&&base.tripTime)||'',
                    carNumber:(base&&base.carNumber)||'',
                    driverName:(base&&base.driverName)||'',
                    startPlace:(base&&base.startPlace)||'',
                    endPlace:(base&&base.endPlace)||'',
                    model:(base&&base.model)||'',
                    theoreticalWeight:(base&&base.theoreticalWeight)||'',
                    oneTripExtract:(base&&base.oneTripExtract)||'',
                    unitPrice:(base&&base.unitPrice)||''
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
                },
                options:{
                    startPlace:(options&&options.startPlace)||[],
                    endPlace:(options&&options.endPlace)||[]
                },
                modelOptions:[]
            }
        },
        destroyed: function () {
            localStorage.setItem("_CARTRIP_INSERT_",JSON.stringify(this.base) )
            localStorage.setItem("_CARTRIP_INSERT_OPSTIONS_",JSON.stringify(this.options) )
        },
        created:function(){
            this.getData();
        },
        methods: {
            getData(){
                var me = this;
                this.$request({
                    url:"/getCarTripModelList",
                    method:"get",
                    query:{
                    }
                }).then(function(re){
                    me.modelOptions = re;
                })
            },
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
                    driverName:this.base.driverName||'',
                    startPlace:this.base.startPlace||'',
                    endPlace:this.base.endPlace||'',
                    model:this.base.model||'',
                    theoreticalWeight:this.base.theoreticalWeight||'',
                    oneTripExtract:this.base.oneTripExtract||'',
                    unitPrice:this.base.unitPrice||'',
                    transportationMeter:'',
                    totalWeight:'',
                    transportationKilometers:'',
                    oneHundredKilometersOil:'',
                    oneKilometersOil:'',
                    totalOil:'',
                    overWeightExtract:'',
                    money:''
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
                this.tableData.forEach(function(t){
                    var model;
                    me.modelOptions.forEach(function(m){
                        if(t.model===m.id){
                            model = m.model;
                        }
                    })
                    t.model = model;
                })
                if(me.load)return
                me.load = true
                this.$request({
                    url:"/batchCarTrip",
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
            ,querySearch(queryString, cb) {
                var restaurants = this.options[this.pop.key];
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            },
            changeValue(){
                if(!this.options[this.pop.key].length){
                    this.options[this.pop.key].push({value:this.form.value})
                }else{
                    var me =this;
                    var keep =false
                    this.options[this.pop.key].forEach(el => {
                        if(el&el.value===me.form.value&&!keep){
                           keep = true
                        }
                    });
                    if(!keep){
                        this.options[this.pop.key].push({value:this.form.value})
                    }
                }
                
               
            },
            modelChange(nval){
                var me = this;
                this.modelOptions.forEach(function(m){
                    if(m.id===nval){
                        me.base.theoreticalWeight = m.theoreticalWeight;
                    }
                })
            },
            modelListChange(scope){
                var theoreticalWeight
                this.modelOptions.forEach(function(m){
                    if(m.id===scope.row.model){
                        theoreticalWeight = m.theoreticalWeight;
                    }
                })
                this.tableData[scope.$index].theoreticalWeight = theoreticalWeight||0;

            }
        }
        
    }

</script>