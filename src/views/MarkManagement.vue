<template>
  <div>
    <el-row>
        <el-popconfirm
            style="margin-right: 30px"
            confirm-button-text='学生信息'
            cancel-button-text='课程信息'
            icon="el-icon-info"
            title="维护的具体项目？"
            @confirm="gotoStuinfo()"
            @cancel="gotoClassinfo()">
          <el-button
              slot="reference"
              type="success"
              plain
              size="mini"> 维护 </el-button>

        </el-popconfirm>

      <el-button size="mini" type="primary" style="margin-bottom: 30px" @click="dialogVisible = true">
        输入成绩
      </el-button>

      <el-button size="mini" type="primary" style="margin-bottom: 30px" @click="gotoMark() ">
        成绩分布
      </el-button>

      <el-button size="mini" type="danger" style="margin-bottom: 30px" @click="goback()">
        退出
      </el-button>

    </el-row>
    <div style="margin-bottom: 30px">
      课程：
      <el-tag style="margin-right: 30px">{{cname}}</el-tag>
      任课老师：
      <el-tag type="success">{{tname}}</el-tag>
    </div>

    <div>
      <el-select v-model="cname" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.cno"
            :label="item.cname"
            :value="item.cno"
            @click.native="handleFindGrade(item.cno), tname = item.tname">
        </el-option>
      </el-select>
    </div>

    <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 30px">
      <el-table-column
          prop="sno"
          label="学号">
      </el-table-column>
      <el-table-column
          prop="grade"
          label="分数">
      </el-table-column>

    </el-table>




    <el-dialog
        title="输入成绩"
        :visible.sync="dialogVisible"
        width="30%">
      <!--        :before-close="handleClose">-->

      <el-input
          style="height: 50px"
          placeholder="学号"
          v-model="sno">
      </el-input>
      <el-input
          style="height: 50px"

          placeholder="课程号"
          v-model="cno"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="分数"
          v-model="grade"
          clearable>
      </el-input>



      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click=" handleAddGrade() ,dialogVisible = false">确 定</el-button>

    </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "MarkManagement",
  methods:{
    gotoMark(){
      this.$router.push({
        name: "MarkDistribution",
      })
    },
    gotoClassinfo(){
      this.$router.push({
        name: "ClassInfo", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
      });
    },
    gotoStuinfo(){
      this.$router.push({
        name: "StudentInfo", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
      });
    },
    goback(){
      this.$router.push({
        name: "Login", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
      });
    },

    handleAddGrade(){
      let _this = this
      axios.post("http://localhost:9000/student/addStuGrade",{
        sno : _this.sno,
        cno : _this.cno,
        grade : _this.grade
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
    handleFindGrade(cno){
      let _this = this;
      axios.get("http://localhost:9000/student/getgradebyclass/"+ cno).then(function (resp){
        _this.tableData = resp.data

      })
    },
  },

  created() {
    let _this = this;
    axios.get("http://localhost:9000/clazz/findAll").then(function(resp){
      _this.options = resp.data;

    })
  },
  data() {
    return {
      dialogVisible: false,
      cno : '',
      sno : '',
      grade : 0,
      cname: '',
      tname: '',
      options: [],
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>