<template>
  <div>
    <el-table :data="tableData2" border max-height="580">
      <el-table-column prop="oi_number" label="点餐明细编号" align="center"></el-table-column>
      <el-table-column prop="ot_number" label="点餐桌号" align="center"></el-table-column>
      <el-table-column prop="oim_number" label="项目编号" align="center"></el-table-column>
      <el-table-column prop="oim_name" label="项目名称" align="center"></el-table-column>
      <el-table-column prop="oim_unit" label="单位" align="center"></el-table-column>
      <el-table-column prop="oim_price" label="单价" align="center"></el-table-column>
      <el-table-column prop="oim_count" label="数量" align="center"></el-table-column>
      <el-table-column prop="oim_taste" label="口味说明" align="center"></el-table-column>
    </el-table>
    <el-button type="info" plain @click="payment" class="xfBtn" :disabled="allPayAble">结算</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getAllOrderItemByOnumber } from "./mutation-types";
export default {
  name: "xfqd-table",
  data() {
    return {
      tableData2: [],
      allPayAble: true //结算按钮是否可以点击
    };
  },
  props: {
    tableNumber: null
  },
  methods: {
    ...mapActions({
      getAllOrderItemByOnumber
    }),
    payment() {
      this.$emit("payment");
    },
    //获取当前桌号的点餐明细,通过点餐桌号查询
    async getOrderItemByOnumber(ot_number) {
      let result = await this.getAllOrderItemByOnumber({
        ot_number: ot_number
      });
      if (!result) return;
      this.tableData2 = JSON.parse(result);
    }
  },
  mounted() { 
    if (this.tableNumber) this.getOrderItemByOnumber(this.tableNumber);
    if (this.tableData2.length > 0) {
      this.allPayAble = false;
    }
  },
  watch: {
    tableNumber() {
      if (this.tableNumber) this.getOrderItemByOnumber(this.tableNumber);
    },
    tableData2() {
      if (this.tableData2.length > 0) {
        this.allPayAble = false;
      }
    }
  }
};
</script>
