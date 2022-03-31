<template>
  <div>
    学生详细信息：
    <div style="margin-bottom: 30px">
      学号:
      <el-tag style="margin-right: 30px">{{ table1.cno }}</el-tag>
      姓名:
      <el-tag type="success" style="margin-right: 30px">{{table1.sname}}</el-tag>
      年龄:
      <el-tag type="info" style="margin-right: 30px">{{ table1.age }}</el-tag>
      性别:
      <el-tag type="warning" style="margin-right: 30px">{{table1.sex}}</el-tag>
      专业:
      <el-tag type="danger" style="margin-right: 30px">{{ table1.sdept }}</el-tag>

      <el-button size="mini" type="danger" style="margin-bottom: 30px" @click="goback()">
        退出
      </el-button>
    </div>
    可选课程：
    <el-table
        :data="tableData2"
        height=""
        border
        style="width: 100%; margin-bottom: 30px">
      <el-table-column
          prop="cno"
          label="课程号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分">
      </el-table-column>
      <el-table-column
          prop="cdept"
          label="部门">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师姓名">
      </el-table-column>
      <el-table-column label="操作"
                       width = "300">
        <template slot-scope="scope">
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='不用了'
              icon="el-icon-info"
              title="是否确定选课？"
              @confirm="handleAdd(scope.row)">
            <el-button
                slot="reference"
                type="success"
                plain
                size="mini"> 选课 </el-button>

          </el-popconfirm>
        </template>

      </el-table-column>
    </el-table>
    已修课程成绩：
    <el-table
        :data="tableData3"
        height="250"
        border
        style="width: 50%;margin-bottom: 30px;margin-left: 400px">
      <el-table-column
          prop="sno"
          label="学号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="cno"
          label="课程号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="grade"
          label="成绩">
      </el-table-column>
    </el-table>
    已选课程：
    <el-table
        :data="tableData4"
        height="250"
        border
        style="width: 100%">
      <el-table-column
          prop="clcno"
          label="课程号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分">
      </el-table-column>

      <el-table-column
          prop="cdept"
          label="学院">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师姓名">
      </el-table-column>
      <el-table-column label="操作"
                       width = "300">
        <template slot-scope="scope">
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='不用了'
              icon="el-icon-info"
              title="是否确定退课？"
              icon-color="red"
              @confirm="handleDelete(scope.row)">
            <el-button
                v-if="scope.row.grade === -1"
                slot="reference"
                type="danger"
                plain
                size="mini"> 退课 </el-button>
          </el-popconfirm>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:"CourseSelection",
  methods:{
    goback(){
      this.$router.push({
        name: "Login", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
      });
    },
    handleAdd(row){
      let _this = this;
      axios.post("http://localhost:9000/student/addStuGrade",{
        sno : _this.table1.cno,
        cno : row.cno,
        grade : -1
      }).then(function (resp){
        if(resp.data){
          _this.$alert('选课成功','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          });
        }
        else{
          _this.$alert('选课失败','提示',{
            confirmButtonText : '确定'
          });
        }
      })
    },
    handleDelete(row){
      let _this = this;
      axios.post("http://localhost:9000/student/deleteStuGrade",{
        sno : _this.table1.cno,
        cno : row.clcno,
        grade : -1
      }).then(function (resp){
        if(resp.data){
          _this.$alert('退课成功','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          });
        }
        else{
          _this.$alert('退课失败','提示',{
            confirmButtonText : '确定'
          });
        }
      })
    }
  },
  created() {
    let _this = this;
    axios.get("http://localhost:9000/student/findStuBylogn/" + _this.logn).then(function (resp){
        _this.table1 = resp.data;
        _this.tableData1[0] = resp.data;
        console.log(_this.tableData1);

      axios.get("http://localhost:9000/clazz/findClazzChoosable/"+ _this.table1.cno).then(function (resp){
        _this.tableData2 = resp.data;
      });
      axios.get("http://localhost:9000/student/findGradeMarked/"+ _this.table1.cno).then(function (resp){
        _this.tableData3 = resp.data;
      });
      axios.get("http://localhost:9000/clazz/findByCno/"+_this.table1.cno).then(function (resp){
        _this.tableData4 = resp.data;
        console.log(_this.tableData4)
      });

    });

  },
  data() {
    return {
      table1:{
        cno : '',
        sname : '',
        age: 0,
        sex: '',
        sdept: ''
      },
      table2:{
        cno : '',
        cname: '',
        credit:''
      },
      table3:{
        sno:'',
        cno:'',
        grade:0
      },
      table4:{
        cno:'',
        cname:'',
        credit:0,
        sdept: '',
        tname:''
      },
      logn : sessionStorage.getItem("logn"),
      clcno:'',

      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: []
    }
  }
}
</script>