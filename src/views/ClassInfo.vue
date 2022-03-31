<template>
  <div>

    <el-row style="width:1500px ; height: 70px">
      <el-button type="success" @click="dialog2Visible = true">添加课程</el-button>
    </el-row>

    <el-table
        :data="tableData"
        border
        height = "1000"

        style="width: 100%;">
      <el-table-column
          prop="cno"
          label="课号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分"
          width = "80">
      </el-table-column>
      <el-table-column
          prop="cdept"
          label="专业"
          width = "120">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="授课老师"
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
        title="添加课程"
        :visible.sync="dialog2Visible"
        width="30%">
      <!--        :before-close="handleClose">-->
      <el-input
          style="height: 50px"
          placeholder="课号"
          v-model="cno"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="名字"
          v-model="cname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="学分"
          v-model="credit"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="专业"
          v-model="cdept"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="教师名称"
          v-model="tname"
          clearable>
      </el-input>


      <span slot="footer" class="dialog-footer">
      <el-button @click="dialog2Visible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd() ,dialog2Visible = false">确 定</el-button>
    </span>
    </el-dialog>



    <el-dialog
        title="编辑课程信息"
        :visible.sync="dialogVisible"
        width="30%">
      <!--        :before-close="handleClose">-->
      <el-input
          style="height: 50px"
          placeholder="课号"
          v-model="cno"
          :disabled="true">
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="课程名称"
          v-model="cname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="学分"
          v-model="credit"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="专业"
          v-model="cdept"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="教师名称"
          v-model="tname"
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
  name: "ClassInfo",
  methods:{
    handleAdd(){
      let _this = this
      axios.post("http://localhost:9000/clazz/add",{
        cno: _this.cno,
        cname: _this.cname,
        credit: _this.credit,
        cdept: _this.cdept,
        tname: _this.tname
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
      axios.post("http://localhost:9000/clazz/update",{
        cno: _this.cno,
        cname: _this.cname,
        credit : _this.credit,
        cdept: _this.cdept,
        tname: _this.tname
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
      this.cname = row.cname
      this.credit = row.credit
      this.cdept = row.cdept
      this.tname = row.tname

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
      this.$confirm('是否删除课程 '+row.cno+':'+row.cname+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("http://localhost:9000/clazz/delete/"+row.cno).then(function (resp){
          if(resp.data){
            _this.$alert('课程'+row.cno + ':' + row.cname +'已删除','',{
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
    axios.get("http://localhost:9000/clazz/findAll").then(function(resp){
      _this.tableData = resp.data
    })

  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialog2Visible: false,
      cno : null,
      cname: null,
      credit : null,
      cdept : null,
      tname : null
    }
  }
}
</script>
