<template>
    <div class="P-model">
        <div class="addBtn M-Con-left" >
            <el-button type="primary"  class="M-Btn"  @click="add()">新增 </el-button>
        </div>
        <el-table
          :data="tableData"
          border
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
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                  <el-button @click="add(scope)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteStore(scope)" type="text" size="small">删除</el-button>
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
         <el-dialog
          :title="pop.title"
          :visible.sync="pop.visible"
          width="60%"
          :before-close="pop.close"
          center>
            <el-form ref="form" :model="form" label-width="150px" >
                <el-form-item label="规格型号" required>
                    <el-input v-model="form.model" placeholder="请输入规格型号"></el-input>
                </el-form-item>
                <el-form-item label="理论重量" required>
                    <el-input v-model="form.theoreticalWeight" placeholder="请输入理论重量"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="M-Btn" @click="pop.visible = false">取 消</el-button>
                <el-button class="M-Btn" type="primary" @click="pop.confirm">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import './model.less'
    export default {
        data() {
            var me = this;
            return {
                tableData: [],
                currentPage:1,
                total:0,
                pagesSize:5,
                pagesSizes:[5,10,20,30,40,50],
                form: {
                    theoreticalWeight:"",
                    model:''
                },
                pop:{
                    visible:false,
                    item:{},
                    close:(done)=>{
                        done()
                    },
                    confirm:function(){
                        var validate ={
                            model:"请输入规格型号"
                        }
                        var isPass = me.checkData(validate,me.form)
                        if(!isPass||me.load) return
                    
                        var type =false
                        if(me.pop.item.index||me.pop.item.index===0){
                            me.$set(me.tableData,me.pop.item.index,me.$util.extend({},me.pop.item,me.form))
                        }else{
                            var addIndex = me.tableData.length
                            me.tableData.push(me.form)
                            type =true
                        }
                    
                        var params = type?{}:{id:me.pop.item.id}
                        var url="/saveCarTripModel"
                        me.load = true;
                        me.$request({
                        url:url,
                        method:"post",
                        params:params,
                        data:me.form
                        }).then(function(re){
                        if(re){
                            me.tip('保存成功');
                            if(type){
                                me.getData(me.currentPage,me.pagesSize);
                            }
                        }
                        me.load = false;
                        },function(){
                        me.tip('保存失败','warning');
                        me.load = false;
                        })
                        
                        me.pop.visible =false;

                    }
                }
            }
        },
        created:function(){
            this.getData(this.currentPage,this.pagesSize);
        },
        methods: {
            getData(pageNo,pageSize){
                var me = this;
                this.$request({
                    url:"/getCarTripModelList",
                    method:"get",
                    query:{
                    pageNo:pageNo,
                    pageSize:pageSize
                    }
                }).then(function(re){
                    me.tableData = re;
                    me.currentPage = re.pageNo;
                    me.pagesSize = re.pageSize;
                    me.total = re.total;
                })
            },
            handleSizeChange(val) {
                this.getData(this.currentPage,val);
            },
            handleCurrentChange(val) {
                this.getData(val,this.pagesSize);
            },
            checkData(validate,datas){
                var me =this;
                var tip;
                for(var key in validate){
                    if(!tip){
                        if(me.$util.isObject(validate[key])){
                            if((!datas[key]&&datas[key]!=0)||!validate[key].validate(datas[key],datas)){
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
                    me.tip( tip,'warning');
                    return false
                }
                return true
            }
            ,add(scope){
                this.pop.visible = true;
                this.pop.title =  scope?"编辑":"新增";
                if(scope){
                    scope.row.index = scope.$index;
                    var row = scope.row
                    this.pop.item = row;
                    this.form ={
                    "model": row.model||"",
                    "theoreticalWeight": row.theoreticalWeight||""
                    }
                }else{
                    this.pop.item={}
                    this.form ={
                    "model": "",
                    "theoreticalWeight": ""
                    }
                }
            },
            tip(title,type,duration){
                this.$notify({
                    title: title || '',
                    type: type||'success',
                    duration:duration||1000
                });

            },
            deleteStore(scope){
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
                        url:"/deleteCarTripModel",
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
            }
        }
    }
</script>