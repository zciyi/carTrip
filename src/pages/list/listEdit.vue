<template>
    <div class="P-listEdit">
            <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="日期" required>
                <el-date-picker
                    v-model="form.tripTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="车牌号" required>
                    <el-input v-model="form.carNumber" placeholder="请输入车牌号"></el-input>
            </el-form-item>
            <el-form-item label="驾驶员" required>
                <el-input v-model="form.driverName" placeholder="请输入驾驶员"></el-input>
            </el-form-item>
            <el-form-item label="发货地" required>
                <el-input v-model="form.startPlace" placeholder="请输入发货地"></el-input>
            </el-form-item>
            <el-form-item label="收货地" required>
                <el-input v-model="form.endPlace" placeholder="请输入收货地"></el-input>
            </el-form-item>
            <el-form-item label="规格" required>
                <el-button type="primary"  class="M-Btn"  @click="add()">新增规格 </el-button>
                <el-table
                    :data="form.productDtoList"
                    style="width: 100%" >
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
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button @click="add(scope)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteList(scope)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="总重量">{{form.totalWeight}}<div class="countNum">公式=理论重量*运输米数</div> </el-form-item>
            <el-form-item label="运输公里数" required>
                <el-input v-model="form.transportationKilometers" placeholder="请输入运输公里数"></el-input>
            </el-form-item>
            <el-form-item label="一百公里应耗油">{{form.oneHundredKilometersOil}}  <div class="countNum">公式=40+（总重量-40)*0.4</div></el-form-item>
            <el-form-item label="一公里应耗油">{{form.oneKilometersOil}} <div class="countNum">公式=百公里油耗/100</div> </el-form-item>
            <el-form-item label="油耗">{{form.totalOil}} <div class="countNum">公式=运输公里数*一公里应耗油</div></el-form-item>
            <el-form-item label="超吨提成">{{form.overWeightExtract}}  <div class="countNum">公式=总重量超70*5,超110*7  （总重量-70）* 5/7</div></el-form-item>
            <el-form-item label="单趟提成" required>
                <el-input v-model="form.oneTripExtract" placeholder="请输入单趟提成"></el-input>
            </el-form-item>
            <el-form-item label="单价/吨" required>
                <el-input v-model="form.unitPrice" placeholder="请输入单价"></el-input>
            </el-form-item>
            <el-form-item label="金额">{{form.money}}  <div class="countNum">公式=总重量*单价</div></el-form-item>
        </el-form>
        <div class="btnCtrl">
            <el-button  class="M-Btn" size="large" @click="goback">返回</el-button>
            <el-button class="M-Btn" type="primary" size="large" @click="onSubmit">保存</el-button>
        </div>
        <el-dialog
        :title="pop.title"
        :visible.sync="pop.visible"
        width="60%"
        :before-close="pop.close"
        center>
            <el-form ref="form" :model="form" label-width="150px" >
                <el-form-item label="规格型号" required>
                    <el-input v-model="form.tpm.model" placeholder="请输入规格型号"></el-input>
                </el-form-item>
                <el-form-item label="理论重量" required >
                    <el-input v-model="form.tpm.theoreticalWeight" placeholder="请输入理论重量"></el-input>
                </el-form-item>
                <el-form-item label="运输米数" required>
                    <el-input v-model="form.tpm.transportationMeter" placeholder="请输入运输米数"></el-input>
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
    import './listEdit.less';
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
        data(){
            var me  =this;
            return{
                form:{
                    "carNumber": "",
                    "endPlace": "",
                    "money": 0,
                    "oneHundredKilometersOil": 0,
                    "oneKilometersOil": 0,
                    "oneTripExtract": 0,
                    "overWeightExtract": 0,
                    "productDtoList":[],
                    "startPlace": "",
                    "totalOil": 0,
                    "totalWeight": 0,
                    "transportationKilometers": 0,
                    "tripTime": "",
                    "unitPrice": 0,
                    "driverName":"",
                    tpm:{
                        "model": "",
                        "theoreticalWeight": '',
                        "transportationMeter": ''
                    }
                },
                tableData:[]
                ,pop:{
                visible:false,
                item:{},
                close:(done)=>{
                    done()
                },
                confirm:function(){
                    var validate ={
                        model:"请输入规格型号",
                        theoreticalWeight:{
                            tip:"请输入理论重量",
                            validate:function(val){
                                if(!String(val).match(/^\d+(\.\d+)?$/)){
                                    this.tip = "理论重量格式不正确"
                                    return false
                                }
                                return true
                            }
                        },
                        transportationMeter:{
                            tip:"请输入运输米数",
                            validate:function(val){
                                if(!String(val).match(/^\d+(\.\d+)?$/)){
                                    this.tip = "运输米数格式不正确"
                                    return false
                                }
                                return true
                            }
                        }
                    }
                    
                    var tip = me.checkData(validate,me.form.tpm)
                    if(!tip){
                        return false
                    }
                    if(me.pop.item.index||me.pop.item.index===0){
                         me.$set(me.form.productDtoList,me.pop.item.index,me.form.tpm)
                    }else{
                        me.form.productDtoList.push(me.form.tpm)
                    }
                    me.pop.visible =false;

                }
            }
                
            }
        }
        ,created:function(){
            if(this.$route.query.id){
                var me = this;
                this.$request({
                    url:"/getCarTrip",
                    method:"get",
                    query:{
                    
                    },
                    params:{
                        id:this.$route.query.id
                    }
                }).then(function(re){
                    re.tpm = me.form.tpm;
                    me.form=re
                })
            }
            
        }
        , methods:{
            add(scope){
                this.pop.visible = true;
                this.pop.title = scope?"编辑规格":"新增规格"
                this.pop.type ="tpm"
                if(scope){
                    scope.row.index = scope.$index;
                    var row = scope.row
                    this.pop.item = row;
                    this.form.tpm ={
                        "model": row.model||"",
                        "theoreticalWeight": row.theoreticalWeight|| '',
                        "transportationMeter": row.transportationMeter||''
                    }
                }else{
                    this.form.tpm ={
                        "model": "",
                        "theoreticalWeight": '',
                        "transportationMeter": ''
                    }
                }

            },
            deleteList(scope){
                this.form.productDtoList.splice(scope.$index,1);

            },
            goback(){
                this.$router.push({path:"/list"})

            },
            onSubmit(){
                var me = this;
                var validate ={
                    tripTime:"请选择日期",
                    carNumber:"请输入车牌号",
                    startPlace:"请输入发货地",
                    endPlace:"请输入收货地",
                    transportationKilometers:{
                        tip:"请输入运输公里数",
                        validate:function(val){
                            if(!String(val).match(/^\d+(\.\d+)?$/)){
                                this.tip = "运输公里数格式不正确"
                                return false
                            }
                            return true
                        }
                    },
                    oneTripExtract:{
                        tip:"请输入单趟提成",
                        validate:function(val){
                            if(!String(val).match(/^\d+(\.\d+)?$/)){
                                this.tip = "单趟提成格式不正确"
                                return false
                            }
                            return true
                        }
                    },
                    unitPrice:{
                        tip:"请输入单价",
                        validate:function(val){
                            if(!String(val).match(/^\d+(\.\d+)?$/)){
                                this.tip = "单价格式不正确"
                                return false
                            }
                            return true
                        }
                    }
                }
                    
                var tip = me.checkData(validate,me.form)
                if(!tip){
                    return false
                }
                if(!me.form.productDtoList.length){
                    return this.tip("请添加规格型号");
                }
                if(this.load)return
                this.load =true
                var id = this.$route.query.id
                var url =id?"/updateCarTrip":"/saveCarTrip"
                var params = id?{
                    id:id
                }:{}
                var dat = this.form;
                delete dat.tpm
                this.$request({
                    url:url,
                    method:"post",
                    params:params,
                    data:dat
                }).then(function(re){
                    me.load = false;
                    if(re){
                        me.tip('保存成功');
                        me.$router.push({path:"/list"})
                        if(!id){

                        }
                    }
                },function(){
                    me.tip('保存失败',"warning");
                    me.load = false;
                })

            }
            ,checkData(validate,datas){
                var me =this;
                var tip;
                for(var key in validate){
                    if(!tip){
                        if(me.$util.isObject(validate[key])){
                            if(!datas[key]||!validate[key].validate(datas[key],datas)){
                                tip=validate[key].tip;
                            }
                        }else{
                            if(!datas[key]){
                                tip=validate[key];
                            } 
                        }
                    }  
                }
                if(tip){
                    this.tip(tip,'warning')
                    return false
                }
                return true
            }
            ,tip(title,type,duration){
                this.$notify({
                    title: title || '',
                    type: type||'success',
                    duration:duration||1000
                });

            }
            ,formatNum(val){
                return Number(val.toString().match(/^\d+(?:\.\d{0,5})?/))
            }
        }
        , watch: {
            "form.productDtoList": function (nval, oval) {
                if(nval){
                    var totalWeight=0;
                    var oneHundredKilometersOil=0;
                    for(var i=0;i<nval.length;i++){
                        totalWeight= format.add(totalWeight, format.mul(nval[i].theoreticalWeight,nval[i].transportationMeter) )
                    }
                    this.form.totalWeight = totalWeight;
                    this.form.oneHundredKilometersOil = totalWeight?format.add(40,format.mul(format.subtraciotn(totalWeight,40),0.4)):0
                    this.form.oneKilometersOil =  this.form.oneHundredKilometersOil/100;
                    this.form.totalOil = format.mul(this.form.transportationKilometers,this.form.oneKilometersOil)
                    

                    if(this.form.totalWeight && Number(this.form.totalWeight)>70){
                        if(this.form.transportationKilometers > 120){
                            this.form.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(this.form.totalWeight,70),7));
                        }else{
                            this.form.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(this.form.totalWeight,70),5));
                        }
                    }else{
                        this.form.overWeightExtract = 0;
                    }
                }
            },
            "form.transportationKilometers": function (nval, oval) {
                if(nval){
                    this.form.totalOil = format.mul(this.form.transportationKilometers,this.form.oneKilometersOil);
                    // if(Number(nval)>70&&Number(nval)<=110){
                    //     this.form.overWeightExtract = format.mul(format.subtraciotn(nval,70),5);
                    // }else if(Number(nval)>110){
                    //     this.form.overWeightExtract = format.mul(format.subtraciotn(nval,110),7);
                    // }else{
                    //     this.form.overWeightExtract = 0;
                    // }

                    if(Number(this.form.totalWeight)>70){
                        if(this.form.transportationKilometers > 120){
                            this.form.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(this.form.totalWeight,70),7));
                        }else{
                            this.form.overWeightExtract = this.formatNum(format.mul(format.subtraciotn(this.form.totalWeight,70),5));
                        }
                    }else{
                        this.form.overWeightExtract = 0;
                    }
                    
                }
            },
            "form.unitPrice":function(nval, oval){
                if(nval){
                    this.form.money = format.mul(this.form.totalWeight,nval)
                }
            }
        }

    }
</script>