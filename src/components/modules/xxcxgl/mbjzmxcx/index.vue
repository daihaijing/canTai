<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">点餐明细查询</span>
    </div>
    <div :class="style.content">
      <el-table :data="orderTable" border max-height="580">
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
    </div>
  </div>
</template>

<script>
import style from 'css/xxcxgl.css';
import { mapActions } from "vuex";
import { 
  getAllOrder,
} from "./mutation-types";
export default {
  data() {
    return {
      style,
      orderTable:[],
    };
  },
  methods:{
    //修改点餐记录
    modifyOrder(e){

    },
    //删除点餐记录
    deleteOrder(e){

    },
    //axios异步通信
    ...mapActions({
      getAllOrder,
    }),
    //获取全部的点餐记录
    async getOrder() {
      let result = await this.getAllOrder();
      if (!result) return;
      this.orderTable = JSON.parse(result);
      console.log(this.orderTable);
    },
  },
  created(){
    this.getOrder();
  }
};
</script>
