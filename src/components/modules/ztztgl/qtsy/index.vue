<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">前台收银</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">桌号：</span>
      <el-input :class="style.inputView"></el-input>
      <el-button type="info" plain @click="searchZH">查询</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="xh" label="序号" width="60"></el-table-column>
        <el-table-column prop="cth" label="餐台号" width="80"></el-table-column>
        <el-table-column prop="xmmc" label="项目名称" width="100"></el-table-column>
        <el-table-column prop="num" label="数量" width="80"></el-table-column>
        <el-table-column prop="dj" label="单价" width="80"></el-table-column>
        <el-table-column prop="money" label="金额" width="80"></el-table-column>
        <el-table-column prop="time" label="登记时间" width="180"></el-table-column>
        <el-table-column prop="jzr" label="记账人" width="100"></el-table-column>
      </el-table>
      <el-button type="info" plain @click="accounts">结账</el-button>
      <el-button type="info" plain @click="backKT">返回</el-button>
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
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
  }
};
</script>
