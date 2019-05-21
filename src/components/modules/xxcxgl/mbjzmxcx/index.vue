<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">点餐明细查询</span>
    </div>
    <div :class="style.content">
      <el-table :data="orderTable" border max-height="580" @expand-change="openOrderItem">
        <el-table-column prop="o_expend" label="查看明细" align="center" type="expand">
          <template slot-scope="props">
            <el-table :data="orderItemTable" border max-height="300">
              <el-table-column prop="oim_number" label="菜品编号" align="center"></el-table-column>
              <el-table-column prop="oim_name" label="菜品名称" align="center"></el-table-column>
              <el-table-column prop="oim_unit" label="菜品单位" align="center"></el-table-column>
              <el-table-column prop="oim_price" label="菜品单价" align="center"></el-table-column>
              <el-table-column prop="oim_count" label="份数" align="center"></el-table-column>
              <el-table-column prop="oim_money" label="金额" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="o_time" label="点餐时间" align="center"></el-table-column>
        <el-table-column prop="o_number" label="点餐编号" align="center"></el-table-column>
        <el-table-column prop="ot_number" label="点餐桌号" align="center"></el-table-column>
        <el-table-column prop="o_customers" label="顾客人数" align="center"></el-table-column>
        <el-table-column prop="o_server" label="点菜员" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyOrder(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteOrder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="orderItemTable" border max-height="300" v-if="isClick">
        <el-table-column prop="oim_number" label="菜品编号" align="center"></el-table-column>
        <el-table-column prop="oim_name" label="菜品名称" align="center"></el-table-column>
        <el-table-column prop="oim_unit" label="菜品单位" align="center"></el-table-column>
        <el-table-column prop="oim_price" label="菜品单价" align="center"></el-table-column>
        <el-table-column prop="oim_count" label="份数" align="center"></el-table-column>
        <el-table-column prop="oim_money" label="金额" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import style from "css/xxcxgl.css";
import { mapActions } from "vuex";
import { getAllOrder, getAllOrderItemByOnumber } from "./mutation-types";
export default {
  data() {
    return {
      style,
      orderTable: [], //记录点餐信息
      tableData:[],//临时存储某一餐台的点餐明细
      orderItemTable: [], //记录点餐明细
      isClick: false //设置点餐明细表的显隐
    };
  },
  methods: {
    //点击一行表格事件
    openOrderItem(row) {
      this.getOrderItem(row.ot_number);
    },
    //修改点餐记录
    modifyOrder(e) {},
    //删除点餐记录
    deleteOrder(e) {},
    //axios异步通信
    ...mapActions({
      getAllOrder,
      getAllOrderItemByOnumber
    }),
    //获取全部的点餐记录
    async getOrder() {
      let result = await this.getAllOrder();
      if (!result) return;
      this.orderTable = JSON.parse(result);
      //console.log(this.orderTable);
    },
    //获取指定餐台号的点餐明细
    async getOrderItem(ot_number) {
      let result = await this.getAllOrderItemByOnumber({
        ot_number: ot_number
      });
      if (!result) return;
      this.tableData = JSON.parse(result);
      //////////////////////
      for(let i = 0;i<this.tableData.length;i++){

      }
      //console.log(this.orderItemTable);
    }
  },
  created() {
    this.getOrder();
  }
};
</script>
