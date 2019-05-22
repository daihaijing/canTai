<template>
  <div>
    <div :class="style.title">
      <span :class="style.title_span">收费项目销售分析</span>
    </div>
    <div :class="style.content">
      <div :class="style.kccxEmit">
        <span :class="style.txtView">选择日期：</span>
        <el-date-picker class="dateFirst" v-model="timeSelect" type="daterange" align="right" unlink-panels 
          @change="timeChange">
        </el-date-picker>
        <span :class="style.txtView">类别：</span>
        <el-select v-model="type" placeholder="请选择" class="rkSelect" style="margin-left:10px;" @change="typeChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="timeData">
          <span class="active">数量排序</span>
          <span>金额排序</span>
        </div>
      </div>
      <Table :tableData="tableData" class="sfTable" style="margin-top:10px"></Table>
      <Trend></Trend>
    </div>
  </div>
</template>

<script>
import style from "css/kcgl.css";
import Table from "./table"
import Trend from "./trend"
export default {
  data(){
    return{
      style,
      options:[{
        value:0,
        label:'肉类'
      },{
        value:1,
        label:'蔬菜'
      }],
      timeSelect: "", //时间选择
      type:"",//类别选择
      tableData:[
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        },
        {
          d_type:"1",
          d_num:"11",
          d_price:"111",
          d_name:"1111",
        }
      ],
      begin:"",//起始时间时间戳
      end:"",//终止时间时间戳
      sort:"",
    }
  },
  methods:{
    timeChange(){
      if (this.timeSelect && this.timeSelect.length == 2) {
        this.begin = parseInt(this.timeSelect[0].getTime() / 1000);
        this.end = parseInt(this.timeSelect[1].getTime() / 1000);
      }
      this.tableData = [];
      // this.getData();调用请求
    },
    typeChange(){
      this.tableData = [];
      // this.getData();调用请求
    }
  },
  components:{
    Table,
    Trend
  },
  mounted(){
     this.$nextTick(()=>{
        var that = this;
        $('.timeData span').click(function(e){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            let sort = "";
            sort = e.target.innerHTML;
            if(sort == '数量排序'){
              this.tableData = [];
              this.sort = '1';
              // this.getData();调用请求
            }else{
              this.tableData = [];
              this.sort = '2';
              // this.getData();调用请求
            }
        })
    })
  }
}
</script>

<style>
  .active{
      background: rgb(35, 150, 147);
      color: #fff;
  }
</style>
