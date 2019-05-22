<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">合并/换餐台</span>
    </div>
    <div :class="style.content">
      <div style="text-align: center">
        <span :class="style.txtView">餐台号：</span>
        <el-input :class="style.inputView" v-model="num1" @change="canTaiChange"></el-input>
        <span :class="style.txtView">合并/换餐台到：</span>
        <el-input :class="style.inputView" v-model="num2" @change="canTaiChange2"></el-input>
        <el-button type="info" plain @click="combine">合并</el-button>
        <el-button type="info" plain @click="change">换餐台</el-button>
        <el-button type="info" plain @click="backKT">返回</el-button>
      </div>
      <el-table :data="tableData" class="table">
        <el-table-column prop="oim_name" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="oim_unit" label="单位" align="center"></el-table-column>
        <el-table-column prop="oim_price" label="单价" align="center"></el-table-column>
        <el-table-column prop="oim_count" label="数量" align="center"></el-table-column>
        <el-table-column prop="oim_money" label="金额" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
import { mapActions } from "vuex";
import {
  getAllOrderItemByOnumber,
  addOneOrderItem,
  updateOrderOTnumber,
  deleteOneOrder,
  updateTableState,
  updateOrderItemOTnumber,
  getTableByNumber
} from "./mutation-types";
import payTableVue from "../qtsy/pay-table.vue";
export default {
  data() {
    return {
      style,
      tableData: [], //用于显示点餐明细信息
      num1: "", //餐台号1
      num2: "", //餐台号2
      flag: 0, //标记
      tableMessage: [] //记录餐台信息
    };
  },
  methods: {
    //异步通信
    ...mapActions({
      getAllOrderItemByOnumber,
      addOneOrderItem,
      updateOrderOTnumber,
      deleteOneOrder,
      updateTableState,
      updateOrderItemOTnumber,
      getTableByNumber
    }),
    //获取指定桌号的点餐记录
    async getAllOrderItem(ot_number) {
      let result = await this.getAllOrderItemByOnumber({
        ot_number: ot_number
      });
      let data = JSON.parse(result);
      if (data.length==0) {
        alert("当前餐台空闲！");
      }else{
        let newData = {
          oim_name: data[0].oim_name,
          oim_unit: data[0].oim_unit,
          oim_price: data[0].oim_price,
          oim_count: data[0].oim_count,
          oim_money: data[0].oim_price * data[0].oim_count
        };
        this.tableData.push(newData);
        for (let i = 1; i < data.length; i++) {
          this.flag = 0;
          for (let j = 0; j < this.tableData.length; j++) {
            if (this.tableData[j].oim_name == data[i].oim_name) {
              this.tableData[j].oim_count += data[i].oim_count;
              this.tableData[j].oim_money =
                this.tableData[j].oim_count * this.tableData[j].oim_price;
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
            this.tableData.push(newData);
          }
        }
      }
    },
    //添加点餐明细
    async addOrderItem(
      oi_number,
      o_number,
      ot_number,
      oim_number,
      oim_name,
      oim_unit,
      oim_price,
      oim_count,
      oim_taste
    ) {
      let result = await this.addOneOrderItem({
        oi_number: oi_number,
        o_number: o_number,
        ot_number: ot_number,
        oim_number: oim_number,
        oim_name: oim_name,
        oim_unit: oim_unit,
        oim_price: oim_price,
        oim_count: oim_count,
        oim_taste: oim_taste
      });
      if (result != 1) return;
    },
    //修改指定餐台号的
    async updateOrder(ot_number,otNew_number) {
      let result = await this.updateOrderOTnumber({
        ot_number: ot_number,
        otNew_number: otNew_number
      });
      if (result != 1) return;
    },
    //删除指定餐台的点餐记录
    async deleteOrder(ot_number) {
      let result = await this.deleteOneOrder({
        ot_number: ot_number
      });
      if (result != 1) return;
    },
    //修改指定餐台的状态
    async updateState(t_number, t_state) {
      let result = await this.updateTableState({
        t_number: t_number,
        t_state: t_state
      });
      if (result != 1) return;
    },
    //修改点餐明细的餐台号
    async updateOTnumber(ot_number, otNew_number) {
      let result = await this.updateOrderItemOTnumber({
        ot_number: ot_number,
        otNew_number: otNew_number
      });
      if (result == 1) {
        alert("操作成功！");
        //显示合并到的餐台的点餐明细
        this.getAllOrderItem(this.num2);
        //修改之前的点餐记录
        this.updateOrder(this.num1, this.num2);
        //修改之前餐台的状态
        this.updateState(this.num1, "空闲");
        this.updateState(this.num2, "占用");
      }
    },
    //获取指定的餐台信息
    async getTable(t_number) {
      let result = await this.getTableByNumber({
        t_number: t_number
      });
      if (!result) return;
      let data = JSON.parse(result);
      this.tableMessage = data;
    },
    //餐台号输入框的值改变
    canTaiChange() {
      this.getAllOrderItem(this.num1);
    },
    canTaiChange2() {
      this.getTable(this.num2);
    },
    //合并餐台
    combine() {
      if (this.num1 == "" || this.num2 == "") {
        alert("餐台号不能为空！");
      } else {
        //将要合并的点餐明细的餐台号改为num2
        this.updateOTnumber(this.num1, this.num2);
      }
    },
    //换餐台
    change() {
      if (this.num1 == "" || this.num2 == "") {
        alert("餐台号不能为空！");
      } else {
        //判断num2对应的桌号是否被占用，如果为被占用，可以换台，否则不可以换台
        let result = this.tableMessage.t_state;
        if (result == "占用") {
          alert("当前餐台已被占用，请选择换到其他餐台！");
          this.num2 = "";
        } else {
          //将要换的点餐明细的餐台号改为num2
          this.updateOTnumber(this.num1, this.num2);
        }
      }
    },
    //返回主页面
    backKT() {
      this.$router.push({
        path: kt
      });
    }
  }
};
</script>
