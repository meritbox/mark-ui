<template>
  <div id="myChart" style="width: 1500px; height: 300px">

  </div>
</template>

<script>
export default {
  name: "MarkDistribution",
  data(){
    return {
      msg:'hahahaha',
      cno : [],
      grades :[],

    }
  },
  created() {
    let _this = this
    axios.get("http://localhost:9000/student/findAvgMark").then(function (resp){
      for(let i = 0; i < resp.data.length; i++){
        _this.cno[i] = resp.data[i].cno;
        _this.grades[i] = resp.data[i].aveg;
      }

      let myChart = _this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title:{text: '成绩分布'},
        tooltip:{},
        xAxis: {
          data: _this.cno
        },
        yAxis:{},
        legend:{
          data:['成绩']
        },
        series:[{
          name:'平均成绩',
          type:'bar',
          data: _this.grades
        }]
      });
      // console.log(resp.data);
      // console.log(_this.cno);
      // console.log(_this.grades);
    })

  },
  mounted() {
    // console.log(this.cno);
    // console.log(this.grades);
  },
  methods:{

  }
}
</script>

<style scoped>

</style>