<template>
  <div>
    <div :class="style.title">
      <span :class="style.title_span">收费项目销售分析</span>
    </div>
    <div :class="style.content">
      <div :class="style.kccxEmit">
        <span :class="style.txtView">选择日期：</span>
        <el-date-picker
          class="dateFirst"
          v-model="timeSelect"
          type="daterange"
          align="right"
          unlink-panels
          @change="timeChange"
        ></el-date-picker>
        <span :class="style.txtView">类别：</span>
        <el-select
          v-model="type"
          placeholder="请选择"
          class="rkSelect"
          style="margin-left:10px;"
          @change="typeChange"
        >
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
      <div id="zheXian">
        <div v-for="{item,index} in zhexian" :key="index" :class="style.zheXian">
          <Trend :item="item"></Trend>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import style from "css/kcgl.css";
import Table from "./table";
import Trend from "./trend";
import { mapActions } from "vuex";
import { getMarketByTime } from "./mutation-types";
export default {
  data() {
    return {
      style,
      options: [
        {
          value: "热菜",
          label: "热菜"
        },
        {
          value: "凉菜",
          label: "凉菜"
        }
      ],
      timeSelect: "", //时间选择
      type: "", //类别选择
      marketTable: [], //保存指定时间段的销售记录
      tableData1: [],
      tableData:[],
      begin: "", //起始时间时间戳
      end: "", //终止时间时间戳
      sort: "",
      zhexian: [
        {
          date: "2019-01-01",
          num: 500
        },
        {
          date: "2019-01-01",
          num: 500
        },
        {
          date: "2019-01-01",
          num: 500
        },
        {
          date: "2019-01-01",
          num: 500
        },
        {
          date: "2019-01-01",
          num: 500
        },
        {
          date: "2019-01-01",
          num: 500
        }
      ]
    };
  },
  methods: {
    timeChange() {
      if (this.timeSelect && this.timeSelect.length == 2) {
        this.begin = parseInt(this.timeSelect[0].getTime() / 1000);
        this.end = parseInt(this.timeSelect[1].getTime() / 1000);
      }
    },
    typeChange() {
      this.getMarket(this.begin, this.end, this.type);
       
    },
    //异步请求
    ...mapActions({
      getMarketByTime
    }),
    async getMarket(start_time, end_time, mm_type) {
      let result = await this.getMarketByTime({
        start_time: start_time,
        end_time: end_time == "" ? "" : end_time + 86340,
        mm_type: mm_type
      });
      this.marketTable = JSON.parse(result);
      this.tableData1.push(this.marketTable[0]);
      var flag = 0;
      for(let i = 1;i< this.marketTable.length;i++){
        flag = 0;
        for(let j = 0;j < this.tableData1.length;j++){
          if(this.marketTable[i].mm_name == this.tableData1[j].mm_name){
            this.tableData1[j].mm_count += this.marketTable[i].mm_count;
            this.tableData1[j].mm_money += this.marketTable[i].mm_money;
            flag = 1;
            break;
          }
        }
        if(flag == 1){
          continue;
        }else{
          this.tableData1.push(this.marketTable[i]);
        }
      }
      this.tableData = this.tableData1;
      
    }
  },
  components: {
    Table,
    Trend
  },
  mounted() {
    this.$nextTick(() => {
      // document.getElementById('zheXian').syle.width = this.zhexian.length * 283 + 'px';
      var that = this;
      $(".timeData span").click(function(e) {
        $(this)
          .siblings()
          .removeClass("active");
        $(this).addClass("active");
        let sort = "";
        sort = e.target.innerHTML;
        if (sort == "数量排序") {
          this.tableData = [];
          this.sort = "1";
          // this.getData();调用请求
        } else {
          this.tableData = [];
          this.sort = "2";
          // this.getData();调用请求
        }
      });
    });
  }
};
</script>

<style>
.active {
  background: rgb(35, 150, 147);
  color: #fff;
}
</style>
