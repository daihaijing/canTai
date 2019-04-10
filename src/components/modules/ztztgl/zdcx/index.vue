<template>
  <div>
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">账单查询</span>
    </div>
    <div :class="style.content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cth" label="餐台号" width="40"></el-table-column>
        <el-table-column prop="jcsj" label="就餐时间" width="80"></el-table-column>
        <el-table-column prop="jzsj" label="结账时间" width="80"></el-table-column>
        <el-table-column prop="zje" label="总金额" width="80"></el-table-column>
        <el-table-column prop="btje" label="吧台金额" width="80"></el-table-column>
        <el-table-column prop="cbje" label="厨部金额" width="80"></el-table-column>
        <el-table-column prop="qtje" label="其他金额" width="80"></el-table-column>
        <el-table-column prop="rs" label="人数" width="80"></el-table-column>
        <el-table-column prop="fpje" label="发票金额" width="80"></el-table-column>
        <el-table-column prop="jzdh" label="结帐单号" width="80"></el-table-column>
        <el-table-column prop="jzfs" label="结账方式" width="80"></el-table-column>
        <el-table-column prop="zqje" label="赠券金额" width="80"></el-table-column>
        <el-table-column prop="qtyhje" label="其他优惠金额" width="80"></el-table-column>
        <el-table-column prop="sgdh" label="手工单号" width="80"></el-table-column>
      </el-table>
      <span :class="style.txtView">结帐单号：</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <br>
      <span :class="style.txtView">消费日期从：</span>
      <el-input :class="style.inputView"></el-input>
      <span :class="style.txtView">到：</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <br>
      <el-button type="info" plain>查询</el-button>
      <el-button type="info" plain>打印</el-button>
      <el-button type="info" plain>返回</el-button>
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
      ]
    };
  }
};
</script>
