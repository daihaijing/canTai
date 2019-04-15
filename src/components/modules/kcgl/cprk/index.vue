<template>
  <div :class="style.product">
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">产品入库</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">物品:</span>
      <el-input :class="style.inputView"></el-input>
      <el-button type="info" plain>查询</el-button>
      <product-store :tableData="tableData" class="table"></product-store>
      <el-button type="info" plain>确定</el-button>
      <el-button type="info" plain>返回</el-button>
    </div>
  </div>
</template>

<script>
import style from "css/kcgl.css";
import ProductStore from "./product-store"
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
  },
  components:{
    ProductStore
  }
};
</script>
