<template>
  <div>
    <el-table
      :data="tableData"
      border
      max-height="580"
    >
      <el-table-column prop="b_number" label="帐单编号" align="center"></el-table-column>
      <el-table-column prop="bt_number" label="结账桌号" align="center"></el-table-column>
      <el-table-column prop="b_time" label="结账时间" align="center"></el-table-column>
      <el-table-column prop="b_ought" label="应收金额" align="center"></el-table-column>
      <el-table-column prop="b_real" label="实收金额" align="center"></el-table-column>
      <el-table-column prop="bs_name" label="收银员" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
   
  },
  props: {
    tableData: null
  }
};
</script>
