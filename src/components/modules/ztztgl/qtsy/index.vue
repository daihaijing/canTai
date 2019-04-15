<template>
  <div :class="style.qtsy">
    <div :class="style.title">
      <span :class="style.txtView">前台收银</span>
    </div>
    <div :class="style.content" style="text-align: center;">
      <span :class="style.txtView">桌号：</span>
      <el-input :class="style.inputView"></el-input>
      <el-button type="info" plain @click="searchZH">查询</el-button>
      <pay-table class="table" :tableData="tableData"></pay-table>
      <el-button type="info" plain @click="accounts">结账</el-button>
      <el-button type="info" plain @click="backKT">返回</el-button>
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
import PayTable from "./pay-table"
export default {
  data() {
    return {
      style,
      tableData: [
        {
          xh: "1",
          cth: "1",
          xmmc: "鱼香肉丝",
          num: "1",
          dj: "30",
          money: "30",
          time: "2019-03-17",
          jzr: "管理员"
        },
        {
          xh: "2",
          cth: "2",
          xmmc: "水煮肉片",
          num: "2",
          dj: "40",
          money: "40",
          time: "2019-03-17",
          jzr: "管理员"
        },
        {
          xh: "3",
          cth: "3",
          xmmc: "北冰洋",
          num: "6",
          dj: "6",
          money: "36",
          time: "2019-03-17",
          jzr: "管理员"
        },
        {
          xh: "4",
          cth: "4",
          xmmc: "烤羊腿",
          num: "1",
          dj: "180",
          money: "180",
          time: "2019-03-17",
          jzr: "管理员"
        }
      ]
    };
  },
  methods: {
    
    searchZH(){

    },
    accounts(){

    },
    backKT() {
      this.$router.push({ path: "kt" });
    },
  },
  components:{
    PayTable,
  }
};
</script>
