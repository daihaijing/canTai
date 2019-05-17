<template>
  <div>
    <el-table :data="orderItemTable" border max-height="580">
      <el-table-column prop="oi_number" label="点餐明细编号" align="center"></el-table-column>
      <el-table-column prop="ot_number" label="点餐桌号" align="center"></el-table-column>
      <el-table-column prop="oim_number" label="项目编号" align="center"></el-table-column>
      <el-table-column prop="oim_name" label="项目名称" align="center"></el-table-column>
      <el-table-column prop="oim_unit" label="单位" align="center"></el-table-column>
      <el-table-column prop="oim_price" label="单价" align="center"></el-table-column>
      <el-table-column prop="oim_count" label="数量" align="center"></el-table-column>
      <el-table-column prop="oim_taste" label="口味说明" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="modifyData(scope.row)">修改</el-button> -->
          <el-button type="text" size="small" @click="deleteOrderItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="info" plain @click="payment" class="xfBtn" :disabled="allPayAble">结算</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { 
  getAllOrderItemByOnumber,
  deleteOneOrderItemByOInumber,
} from "./mutation-types";
export default {
  name: "xfqd-table",
  data() {
    return {
      orderItemTable: [],
      allPayAble: true //结算按钮是否可以点击
    };
  },
  props: {
    tableNumber: null
  },
  methods: {
    ...mapActions({
      getAllOrderItemByOnumber,
      deleteOneOrderItemByOInumber,
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
      this.orderItemTable = JSON.parse(result);
    },
    //通过点餐明细编号，删除一条对应的点餐明细信息
    async deleteOneOrderItem(oi_number){
      let result = await this.deleteOneOrderItemByOInumber({
        oi_number:oi_number,
      });
      if(result != 1){
        alert('删除失败，请重试');
      }else{
        alert('删除成功');
      }
    },
    //删除一条点餐明细
    deleteOrderItem(e) {
      for (let i = 0; i < this.orderItemTable.length; i++) {
        if (e == this.orderItemTable[i]) {
          this.deleteOneOrderItem(e.oi_number);
          this.orderItemTable.splice(i, 1);
        }
      }
    }
  },
  mounted() {
    if (this.tableNumber) this.getOrderItemByOnumber(this.tableNumber);
    if (this.orderItemTable.length > 0) {
      this.allPayAble = false;
    }
  },
  watch: {
    tableNumber() {
      if (this.tableNumber) this.getOrderItemByOnumber(this.tableNumber);
    },
    orderItemTable() {
      if (this.orderItemTable.length > 0) {
        this.allPayAble = false;
      }
    }
  }
};
</script>
