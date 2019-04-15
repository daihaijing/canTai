<template>
  <div>
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">账单查询</span>
    </div>
    <div :class="style.content">
      <price-select class="table" :tableData="tableData.data"></price-select>
      <common-pagination :total="total" :pageSize="pageSize" @pageNumChange="pageNumChange" :currentPage="page"
      v-if="tableData.data && tableData.data.length>0"></common-pagination> 
      <div :class="style.adcxEmit">
        <span :class="style.txtView">结帐单号：</span>
        <el-input :class="style.inputView" style="margin-left: 17px;"></el-input>
        <br>
        <br>
        <span :class="style.txtView">消费日期从：</span>
        <el-input :class="style.inputView"></el-input>
        <span :class="style.txtView">到：</span>
        <el-input :class="style.inputView"></el-input>
        <br>
        <br>
        <el-button type="info" plain style="margin-left:115px;">查询</el-button>
        <el-button type="info" plain>打印</el-button>
        <el-button type="info" plain>返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
import PriceSelect from "./price-select"
import CommonPagination from "#com/common-pagination";
export default {
  data() {
    return {
      style,
      total: 0, //总数
      pageSize:2,
      page: 1, //当前页
      tableData: {
        'data':[
        {
          cth: "1",
          jcsj: "17:00",
          jzsj: "20:00",
          zje: "500",
          btje: "500",
          cbje: "500",
          qtje: "0",
          rs: "4",
          fpje: "500",
          jzdh: "01",
          jzfs: "微信",
          zqje: "0",
          qtyhje: "0",
          sgdh: "01"
        },
        {
          cth: "2",
          jcsj: "17:00",
          jzsj: "20:00",
          zje: "500",
          btje: "500",
          cbje: "500",
          qtje: "0",
          rs: "4",
          fpje: "500",
          jzdh: "02",
          jzfs: "微信",
          zqje: "0",
          qtyhje: "0",
          sgdh: "02"
        },
        {
          cth: "3",
          jcsj: "17:00",
          jzsj: "20:00",
          zje: "500",
          btje: "500",
          cbje: "500",
          qtje: "0",
          rs: "4",
          fpje: "500",
          jzdh: "03",
          jzfs: "微信",
          zqje: "0",
          qtyhje: "0",
          sgdh: "03"
        }
        ],
        'total':3
      }
    };

  },
  components:{
    PriceSelect,
    CommonPagination
  },
  methods:{
    //页数改变
    pageNumChange(val) {
      this.page = val;
      this.tableData = [];
      // this.getData();
    },
  },
  mounted(){
    this.total = this.tableData.total;
  }
};
</script>
