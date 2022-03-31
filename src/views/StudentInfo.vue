<template>
  <div>

    <el-row style="width:1500px ; height: 70px">
      <el-button type="success" @click="dialog2Visible = true">添加学生</el-button>
    </el-row>

    <el-table
      :data="tableData"
      border
      height = "1000"

      style="width: 100%;">
      <el-table-column
        prop="cno"
        label="学号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sname"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
      width = "80">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
          width = "80">
      </el-table-column>
      <el-table-column
        prop="sdept"
        label="专业"
      width = "250">
      </el-table-column>

      <el-table-column label="操作"
        width = "400">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row), dialogVisible = true">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="添加学生"
        :visible.sync="dialog2Visible"
        width="30%">
      <!--        :before-close="handleClose">-->

      <el-input
          style="height: 50px"
          placeholder="学号"
          v-model="cno"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="名字"
          v-model="sname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="性别"
          v-model="sex"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="年龄"
          v-model="age"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="所在专业"
          v-model="sdept"
          clearable>
      </el-input>


      <span slot="footer" class="dialog-footer">
      <el-button @click="dialog2Visible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd() ,dialog2Visible = false">确 定</el-button>
    </span>
    </el-dialog>



    <el-dialog
        title="编辑学生信息"
        :visible.sync="dialogVisible"
        width="30%">
<!--        :before-close="handleClose">-->

      <el-input
          style="height: 50px"

          placeholder="学号"
          v-model="cno"
          :disabled="true">
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="名字"
          v-model="sname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="性别"
          v-model="sex"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="年龄"
          v-model="age"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="所在专业"
          v-model="sdept"
          clearable>
      </el-input>


      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit2() ,dialogVisible = false">确 定</el-button>

    </span>
    </el-dialog>
  </div>
</template>


<script>
    export default {
        name: "StudentInfo",
        methods:{
            handleAdd(){
                let _this = this
              axios.post("http://localhost:9000/student/add",{
                cno: _this.cno,
                sname: _this.sname,
                sex: _this.sex,
                age: _this.age,
                sdept: _this.sdept
              }).then(function (resp){
                if(resp.data){
                  _this.$alert('添加成功','提示',{
                    confirmButtonText : '确定',
                    callback : action => {
                      location.reload();
                    }
                  });

                }
                else{
                  _this.$alert('添加失败','提示',{
                    confirmButtonText : '确定'
                  });
                }
              })
            },

            handleEdit2(){
              let _this = this
              axios.post("http://localhost:9000/student/update",{
                cno: _this.cno,
                sname: _this.sname,
                sex: _this.sex,
                age: _this.age,
                sdept: _this.sdept
              }).then(function (resp){
                if(resp.data){
                  _this.$alert('修改成功','提示',{
                    confirmButtonText : '确定',
                    callback : action => {
                      location.reload();
                    }
                  });

                }
                else{
                  _this.$alert('修改失败','提示',{
                    confirmButtonText : '确定'
                    });
                }
              })
            },
            handleEdit(index,row){
              this.cno = row.cno
              this.sname = row.sname
              this.sex = row.sex
              this.age = row.age
              this.sdept = row.sdept
            },

            handleClose(){
              let _this = this
              this.$confirm('确认关闭？')
                  .then(_ => {
                    _this.dialogVisible = false;
                  })
                  .catch(_ => {});
            },

            handleDelete(index,row){
              let _this = this
              this.$confirm('是否删除学生 '+row.cno+':'+row.sname+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                axios.delete("http://localhost:9000/student/delete/"+row.cno).then(function (resp){
                  if(resp.data){
                    _this.$alert('学生'+row.cno + ':' + row.sname +'已删除','',{
                      confirmButtonText : '确定',
                      callback : action => {
                        location.reload();
                      }
                    });

                  }
                });

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
        },
        created(){
            let _this = this
            axios.get("http://localhost:9000/student/findAll").then(function(resp){
                _this.tableData = resp.data
            })

        },
        data() {
        return {
            tableData: [],
            dialogVisible: false,
            dialog2Visible: false,
            cno : null,
            sname: null,
            sex : null,
            age : null,
            sdept : null
        }
        }
    }
</script>
