<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">套餐设置</span>
    </div>
    <div :class="style.content">
      <el-table :data="tableData" :class="style.elTable">
        <el-table-column prop="tcmc" label="套餐名称" width="180"></el-table-column>
        <el-table-column prop="dw" label="单位" width="80"></el-table-column>
        <el-table-column prop="num" label="数量" width="40"></el-table-column>
        <el-table-column prop="tcj" label="套餐价" width="100"></el-table-column>
        <el-table-column prop="time" label="登记日期" width="180"></el-table-column>
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
      activeName: "first",
      tableData: [
        {
          tcmc: "呵呵哒",
          dw: "份",
          num: "1",
          tcj: "30",
          time: "2019-4-2",
        },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick2(row) {
      console.log(row);
    }
  },
  mounted() {}
};
</script>

