<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">合并/换餐台</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">餐台号：</span>
      <el-input :class="style.inputView"></el-input>
      <span :class="style.txtView">合并/换餐台到：</span>
      <el-input :class="style.inputView"></el-input>
      <el-button type="info" plain @click="combine">合并</el-button>
      <el-button type="info" plain @click="combine">换餐台</el-button>
      <el-button type="info" plain @click="backKT">返回</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="xh" label="序号" width="60"></el-table-column>
        <el-table-column prop="xmmc" label="项目名称" width="180"></el-table-column>
        <el-table-column prop="dw" label="单位" width="80"></el-table-column>
        <el-table-column prop="num" label="数量" width="80"></el-table-column>
        <el-table-column prop="money" label="消费金额" width="100"></el-table-column>
        <el-table-column prop="time" label="登记时间" width="180"></el-table-column>
        <el-table-column prop="fwy" label="服务员" width="80"></el-table-column>
        <el-table-column prop="czy" label="操作员" width="80"></el-table-column>
      </el-table>
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
          xmmc: "烤羊腿",
          dw: "斤",
          num: "3.0",
          money: "180",
          time: "2019-03-17",
          fwy: "服务员",
          czy: "操作员"
        },
        {
          xh: "2",
          xmmc: "中华",
          dw: "盒",
          num: "3",
          money: "150",
          time: "2019-03-17",
          fwy: "服务员",
          czy: "操作员"
        }
      ]
    };
  }
};
</script>
