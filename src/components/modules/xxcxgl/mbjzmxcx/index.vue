<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">点餐明细查询</span>
    </div>
    <div :class="style.content">
      <el-table
        :data="orderTable"
        border
        max-height="580"
        @expand-change="openOrderItem"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
      >
        <el-table-column prop="o_expend" label="查看明细" align="center" type="expand">
          <template slot-scope="props">
            <el-table :data="orderItemTable" border max-height="300">
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
            <el-button type="text" size="small" @click="deleteOrder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import style from "css/xxcxgl.css";
import { mapActions } from "vuex";
import { 
  getAllOrder,
  getAllOrderItemByOnumber,
  deleteAllMessageByOTnumber,
  updateTableState
} from "./mutation-types";
export default {
  data() {
    return {
      style,
      expands: [], //只展开一行放入当前行id
      getRowKeys(row) {
        return row.o_number;
      },
      orderTable: [], //记录点餐信息
      orderItemTable: [] //记录点餐明细
    };
  },
  methods: {
    //点击一行表格事件
    openOrderItem(row, expandedRows) {
      this.orderItemTable = [];
      this.getOrderItem(row.ot_number);
      let that = this;
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        that.expands = [];
        if (row) {
          that.expands.push(row.o_number); //只展开当前行id
        }
      } else {
        //说明收起了
        that.expands = [];
      }
    },
    rowClose(row, expanded) {
      console.log(row, expanded);
    },
    //删除点餐记录
    deleteOrder(e) {
    for(let i = 0;i < this.orderTable.length;i++){
      if(this.orderTable[i].ot_number == e.ot_number){
        this.orderTable.splice(i,1);
        this.deleteAllMessage(e.ot_number);
      }
    }
    },
    //axios异步通信
    ...mapActions({
      getAllOrder,
      getAllOrderItemByOnumber,
      deleteAllMessageByOTnumber,
      updateTableState
    }),
    //获取全部的点餐记录
    async getOrder() {
      let result = await this.getAllOrder();
      if (!result) return;
      this.orderTable = JSON.parse(result);
    },
    //获取指定餐台号的点餐明细
    async getOrderItem(ot_number) {
      let result = await this.getAllOrderItemByOnumber({
        ot_number: ot_number
      });
      let data = JSON.parse(result);
      if (data.length == 0) {
        alert("当前餐台为空！");
      } else {
        let newData = {
          oim_name: data[0].oim_name,
          oim_unit: data[0].oim_unit,
          oim_price: data[0].oim_price,
          oim_count: data[0].oim_count,
          oim_money: data[0].oim_price * data[0].oim_count
        };
        this.orderItemTable.push(newData);
        for (let i = 1; i < data.length; i++) {
          this.flag = 0;
          for (let j = 0; j < this.orderItemTable.length; j++) {
            if (this.orderItemTable[j].oim_name == data[i].oim_name) {
              this.orderItemTable[j].oim_count += data[i].oim_count;
              this.orderItemTable[j].oim_money =
                this.orderItemTable[j].oim_count *
                this.orderItemTable[j].oim_price;
              this.flag = 1;
            }
          }
          if (this.flag == 0) {
            let newData = {
              oim_name: data[i].oim_name,
              oim_unit: data[i].oim_unit,
              oim_price: data[i].oim_price,
              oim_count: data[i].oim_count,
              oim_money: data[i].oim_price * data[i].oim_count
            };
            this.orderItemTable.push(newData);
          }
        }
      }
    },
    //删除指定餐台号的点餐记录
    async deleteAllMessage(ot_number){
      let result = await this.deleteAllMessageByOTnumber({
        ot_number:ot_number,
      });
      if(result == 1){
        this.updateState(ot_number,"空闲");
        alert("删除成功！");
      }else{
        alert("删除失败！");
      }
    },
    //修改指定餐台的状态
    async updateState(t_number, t_state) {
      let result = await this.updateTableState({
        t_number: t_number,
        t_state: t_state
      });
      if (result != 1) return;
    },
  },
  created() {
    this.getOrder();
  }
};
</script>
