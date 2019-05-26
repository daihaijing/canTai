<template>
  <div>
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">账单查询</span>
    </div>
    <div :class="style.content">
      <!-- <price-select class="table" :tableData="tableData.data" ></price-select> -->
      <el-table
        class="table"
        :data="tableData.data"
        border
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
        <el-table-column prop="b_number" label="帐单编号" align="center"></el-table-column>
        <el-table-column prop="bt_number" label="结账桌号" align="center"></el-table-column>
        <el-table-column prop="b_time" label="结账时间" align="center"></el-table-column>
        <el-table-column prop="b_ought" label="应收金额" align="center"></el-table-column>
        <el-table-column prop="b_real" label="实收金额" align="center"></el-table-column>
        <el-table-column prop="bs_name" label="收银员" align="center"></el-table-column>
      </el-table>
      <!-- <common-pagination :total="total" :pageSize="pageSize" @pageNumChange="pageNumChange" :currentPage="page"
      v-if="tableData.data && tableData.data.length>0"></common-pagination> 
      <div :class="style.adcxEmit">
        <span :class="style.txtView">结帐单号：</span>
        <el-input :class="style.inputView" style="margin-left: 17px;"></el-input>
        <br>
        <br>
        <span :class="style.txtView">消费日期从：</span>
        <el-input :class="style.inputView"></el-input>
        <span :class="style.txtView">到：</span>
        <el-input :class="style.inputView"></el-input>
        <br>
        <br>
        <el-button type="info" plain style="margin-left:115px;">查询</el-button>
        <el-button type="info" plain>打印</el-button>
        <el-button type="info" plain>返回</el-button>
      </div>-->
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
import PriceSelect from "./price-select";
import CommonPagination from "#com/common-pagination";
import { mapActions } from "vuex";
import { getAllBill } from "./mutation-types";
export default {
  data() {
    return {
      style,
      // total: 0, //总数
      // pageSize:2,
      // page: 1, //当前页
      tableData: {
        data: [],
        total: 4
      },
      expands: [], //只展开一行放入当前行id
      getRowKeys(row) {
        return row.b_number;
      },
      orderItemTable: [],
    };
  },
  components: {
    PriceSelect,
    CommonPagination
  },
  methods: {
    //点击一行表格事件
    openOrderItem(row, expandedRows) {
      this.orderItemTable = [];
      //this.getOrderItem(row.ot_number);
      let that = this;
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        that.expands = [];
        if (row) {
          that.expands.push(row.b_number); //只展开当前行id
        }
      } else {
        //说明收起了
        that.expands = [];
      }
    },
    rowClose(row, expanded) {
      console.log(row, expanded);
    },
    //页数改变
    pageNumChange(val) {
      this.page = val;
      this.tableData = [];
      // this.getData();
    },
    //异步通信
    ...mapActions({
      getAllBill
    }),
    async getBill() {
      let result = await this.getAllBill();
      if (!result) return;
      this.tableData.data = JSON.parse(result);
    }
  },
  mounted() {
    //this.total = this.tableData.total;
  },
  created() {
    this.getBill();
  }
};
</script>
