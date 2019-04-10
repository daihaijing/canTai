<template>
  <div>
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">产品入库</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">物品:</span>
      <el-input :class="style.inputView"></el-input>
      <el-button type="info" plain>查询</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="jsm" label="检索码" width="80"></el-table-column>
        <el-table-column prop="xmmc" label="项目名称" width="100"></el-table-column>
        <el-table-column prop="dw" label="单位" width="60"></el-table-column>
        <el-table-column prop="cplb" label="产品类别" width="100"></el-table-column>
        <el-table-column prop="jhdj" label="进货单价" width="100"></el-table-column>
        <el-table-column prop="rksl" label="入库数量" width="60"></el-table-column>
      </el-table>
      <el-button type="info" plain>确定</el-button>
      <el-button type="info" plain>返回</el-button>
    </div>
  </div>
</template>

<script>
import style from "css/kcgl.css";
export default {
  data() {
    return {
      style,
      tableData: [
        {
          jsm:"WHH",
          xmmc:"哇哈哈",
          dw:"瓶",
          cplb:"饮料",
          jhdj:"1",
          rksl:"20",
        },
         {
          jsm:"WHH",
          xmmc:"哇哈哈",
          dw:"瓶",
          cplb:"饮料",
          jhdj:"1",
          rksl:"20",
        },
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
