<template>
  <div :class="style.qtsy">
    <div :class="style.title">
      <span :class="style.txtView">前台收银</span>
    </div>
    <div :class="style.content" style="text-align: center;">
      <span :class="style.txtView">桌号：</span>
      <el-input :class="style.inputView" v-model="tableNumber" @keyup.enter.native="searchZH"></el-input>
      <el-button type="info" plain @click="searchZH" >查询</el-button>
      <pay-table class="table" :tableData="tableData" :money="money"></pay-table>
      <el-button type="info" plain @click="accounts">结账</el-button>
      <el-button type="info" plain @click="backKT">返回</el-button>
    </div>
    <addZhangDan
      :addVisible="addVisible"
      @addCloseEmit="addCloseEmit"
      @newAdd="newAdd"
      :zhangDanData="zhangDanData"
      v-if="addVisible"
    ></addZhangDan>
  </div>
</template>

<script>
import style from "css/kaitai.css";
import PayTable from "./pay-table";
import AddZhangDan from "#com/addZhangDan";
import { mapActions } from "vuex";
import { getAllOrderItemByOnumber,addOneBill,updateTableState } from "./mutation-types";
export default {
  data() {
    return {
      style,
      num: "",
      allOrderItem: [],//保存点餐明细的数组
      tableData: [],//保存账单明细的数组
      money: 0,
      tableNumber: "",
      flag: 0, //用于标记
      addVisible: false, //控制账单结算弹框
      zhangDanData: {}
    };
  },
  methods: {
    addCloseEmit() {
      this.addVisible = false;
    },
    //接收diancan传过来的tableNumber（当前要结算的桌号）
    getTnumberFromDiancan() {
      this.tableNumber = this.$route.params.tableNumber;
    },
    //（结算界面）点击结算按钮，弹出当前桌台的账单信息
    //（账单编号（随机生成），桌台编号，应收金额，实收金额
    //，收银员），确认账单信息，点击确定按钮，向数据库添加当前的账单信息
    newAdd(b_number, bt_number, b_ought, b_real, bs_name) {
      // var newData = {
      //   b_number: b_number,
      //   bt_number: bt_number,
      //   b_ought: b_ought,
      //   b_real: b_ought,
      //   bs_name: bs_name
      // };
      //向数据库添加当前桌台的账单
      this.addBill(b_number, bt_number, b_ought, b_real,bs_name);
      
    },
    //查询指定桌号的消费信息
    searchZH() {
      this.getOrderItem(this.tableNumber);
    },
    accounts() {
      this.addVisible = true;
      //暂定随机生成8位数字，作为账单编号
      let b_number = "";
      for (let i = 0; i < 8; i++) {
        b_number += Math.floor(Math.random() * 10);
      }
      this.zhangDanData.b_number = b_number;
      this.zhangDanData.bt_number = this.tableNumber;
      this.zhangDanData.b_ought = this.money;
      this.zhangDanData.bs_name = JSON.parse(
        localStorage.getItem("user")
      ).userName;
    },
    backKT() {
      this.$router.push({ path: "kt" });
    },
    //异步通信
    ...mapActions({
      getAllOrderItemByOnumber,
      addOneBill,
      updateTableState,
    }),
    //获取当前桌号的全部点餐明细
    async getOrderItem(t_number) {
      let result = await this.getAllOrderItemByOnumber({
        ot_number: t_number
      });
      if (!result) return;
      this.allOrderItem = JSON.parse(result);
      var newData = {
        bm_name: this.allOrderItem[0].oim_name,
        bm_unit: this.allOrderItem[0].oim_unit,
        bm_price: this.allOrderItem[0].oim_price,
        bm_count: this.allOrderItem[0].oim_count,
        bm_money:
          this.allOrderItem[0].oim_price * this.allOrderItem[0].oim_count
      };
      this.tableData.push(newData);
      for (let i = 1; i < this.allOrderItem.length; i++) {
        this.flag = 0;
        for (let j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].bm_name == this.allOrderItem[i].oim_name) {
            this.tableData[j].bm_count += this.allOrderItem[i].oim_count;
            (this.tableData[j].bm_money =
              this.tableData[j].bm_count * this.tableData[j].bm_price),
              (this.flag = 1);
          }
        }
        if (this.flag == 0) {
          var newData = {
            bm_name: this.allOrderItem[i].oim_name,
            bm_unit: this.allOrderItem[i].oim_unit,
            bm_price: this.allOrderItem[i].oim_price,
            bm_count: this.allOrderItem[i].oim_count,
            bm_money:
              this.allOrderItem[i].oim_price * this.allOrderItem[i].oim_count
          };
          this.tableData.push(newData);
        }
      }
      for (let k = 0; k < this.tableData.length; k++) {
        this.money += this.tableData[k].bm_money;
      }
    },
    async addBill(b_number, bt_number, b_ought, b_real, bs_name) {
      let result = await this.addOneBill({
        b_number: b_number,
        bt_number: bt_number,
        b_ought: b_ought,
        b_real: b_ought,
        bs_name: bs_name
      });
      if(result != 1) result;
      this.addVisible = false;
      this.updateState(bt_number,"空闲");
    },
    async updateState(t_number, t_state) {
      let result = await this.updateTableState({
        t_number: t_number,
        t_state: t_state
      });
      if (!result) return;
    },
  },
  components: {
    PayTable
  },
  mounted() {
    if (this.tableNumber) {
      this.getOrderItem(this.tableNumber);
     
    }
  },
  created() {
    this.getTnumberFromDiancan();
    //console.log("收银界面接收到的tableNumber：",this.tableNumber);
  },
  components: {
    AddZhangDan,
    PayTable
  }
};
</script>
