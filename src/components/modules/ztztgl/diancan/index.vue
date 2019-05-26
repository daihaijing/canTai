<template>
  <div>
    <el-tabs class="dcTitle" v-model="activeName2" @tab-click="handleClick2">
      <el-tab-pane label="点餐" class="dianCanTab" name="dc">
        <el-tabs class="dcTable" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="热菜" name="热菜">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='热菜'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="凉菜" name="凉菜">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='凉菜'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="汤类" name="汤类">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='汤类'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="熟食" name="熟食">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='熟食'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="海鲜" name="海鲜">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='海鲜'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="饮料类" name="饮料类">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='饮料类'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="酒水类" name="酒水类">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='酒水类'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="待定" name="待定">
            <div v-for="item in dcSoupTable" :class="style.dcIcon">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane> -->
          <el-tab-pane label="烧烤类" name="烧烤类">
            <div v-for="item in dcSoupTable" :class="style.dcIcon" v-if="activeName=='烧烤类'">
              <img :class="style.dcimg" :src="item.m_picture" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="width: calc(35% - 20px);float: left;margin: 0 10px;margin-top: 20px;">
          <div>
            <span>当前桌号：{{ tableNumber }}</span>
            <span>点餐编号：{{ diancanNumber }}</span>
            <!-- <span>人数：{{ customers }}</span> -->
          </div>
          <!-- <div>
            <span>项目名称:</span>
            <el-input :class="style.inputView" v-model="message" @keyup.enter.native="searchXM"></el-input>
            <el-button type="info" plain @click="searchXM">查询</el-button>
          </div>-->
          <send :dcData="dcData" @submitOrder="submitOrder"></send>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消费清单" name="xf">
        <xfqd-table
          v-if="activeName2=='xf'"
          class="table"
          :tableNumber="tableNumber"
          @payment="payment"
        ></xfqd-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import bus from "@/bus.js";
import style from "css/kaitai.css";
import XfqdTable from "./xfqd-table";
import Send from "./send";
import { mapActions } from "vuex";
import {
  getAllMenuByMSname,
  addOneOrderItem,
  addOneNewOrder,
  getAllOrderItemByOnumber,
  getOneOrderByOnumber,
  addOneBill,
  addOneNewMarket
} from "./mutation-types";
export default {
  data() {
    return {
      style,
      have: 0, //标记当前桌台是否已点餐
      nowTime: "",
      tableNumber: "", //当前桌号
      diancanNumber: "", //当前点餐编号
      //customers: "",//当前桌台的点餐人数
      activeName: "热菜",
      activeName2: "dc",
      //汤类列表
      dcSoupTable: [],
      dcData: []
    };
  },
  methods: {
    //接收kt传过来的桌号
    getRouterTnumber() {
      this.tableNumber = this.$route.params.ot_number;
      this.diancanNumber = this.$route.params.o_number;
      //this.customers = this.$route.params.o_customers;
    },
    //添加菜品
    diancan(val) {
      if (this.dcData.length == 0) {
        var newData = {
          m_name: val.m_name,
          m_number: val.m_number,
          m_simplename: val.m_simplename,
          m_unit: val.m_unit,
          m_price: val.m_price,
          m_count: 1,
          m_taste: ""
        };
        this.dcData.push(newData);
      } else {
        let flag = 0;
        for (let i = 0; i < this.dcData.length; i++) {
          if (val.m_number == this.dcData[i].m_number) {
            this.dcData[i].m_count++;
            flag = 1;
            break;
          }
        }
        if (flag == 0) {
          var newData = {
            m_name: val.m_name,
            m_number: val.m_number,
            m_simplename: val.m_simplename,
            m_unit: val.m_unit,
            m_price: val.m_price,
            m_count: 1,
            m_taste: ""
          };
          this.dcData.push(newData);
        }
      }
    },
    //删除菜品
    dcRemove(val) {
      for (let i = 0; i < this.dcData.length; i++) {
        if (val.m_number == this.dcData[i].m_number) {
          if (this.dcData[i].m_count == 1) {
            this.dcData.splice(i, 1);
          } else {
            this.dcData[i].m_count--;
          }
          break;
        }
      }
    },
    submitOrder() {
      this.getOrderByOTnumber(this.tableNumber, this.dcData);
    },
    //结算当前桌台
    payment() {
      //跳转到收银界面
      //console.log("跳转之前的tableNumber：",this.tableNumber);
      this.$router.push({
        name:'qtsy',
        params:{
          tableNumber:this.tableNumber,
        }
      });
    },
    //异步通信
    ...mapActions({
      getAllMenuByMSname,
      addOneOrderItem,
      addOneNewOrder,
      getAllOrderItemByOnumber,
      getOneOrderByOnumber,
      addOneBill,
      addOneNewMarket,
    }),
    //添加一条菜品销售记录
    async addMenuMarket(mm_number,mm_type,mm_name,mm_unit,mm_price,mm_count,mmt_number){
      let result = await this.addOneNewMarket({
        mm_number:mm_number,
        mm_type:mm_type,
        mm_name:mm_name,
        mm_unit:mm_unit,
        mm_price:mm_price,
        mm_count:mm_count,
        mmt_number:mmt_number,
      });
      if(result != 1) return;
    },
    //获取指定菜系下的菜品
    async getMenu(name) {
      let result = await this.getAllMenuByMSname({
        ms_name: name
      });
      if (!result) return;
      this.dcSoupTable = JSON.parse(result);
      //console.log(this.dcSoupTable);
    },
    //添加一条点餐明细记录
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
      if (result == 1) return;
    },
    handleClick(tab, event) {
      this.getMenu(this.activeName);
    },
    handleClick2(tab, event) {
      //this.getOrderItemByOnumber(this.tableNumber);
    },
    //添加点餐记录
    async addOrder(ot_number, o_customers, o_cook) {
      let result = await this.addOneNewOrder({
        ot_number: ot_number,
        o_customers: o_customers,
        o_cook: o_cook
      });
      if (result == 1) return;
    },
    //查询指定桌台的点餐记录
    async getOrderByOTnumber(ot_number, val) {
      let result = await this.getOneOrderByOnumber({
        ot_number: ot_number
      });
      //添加点餐明细
      for (let i = 0; i < val.length; i++) {
        //暂定随机生成8位数字，作为点餐明细编号
        let oi_number = "";
        for (let i = 0; i < 8; i++) {
          oi_number += Math.floor(Math.random() * 10);
        }
        //添加一条点餐明细记录
        this.addOrderItem(
          oi_number,
          this.diancanNumber,
          this.tableNumber,
          val[i].m_number,
          val[i].m_name,
          val[i].m_unit,
          val[i].m_price,
          val[i].m_count,
          val[i].m_taste
        );
        //将当前的点餐信息添加到菜品销售表
        this.addMenuMarket(
          oi_number,
          this.activeName,
          val[i].m_name,
          val[i].m_unit,
          val[i].m_price,
          val[i].m_count,
          this.tableNumber
        );
      }
      this.dcData = [];
      this.activeName2 = "xf";
    },
    //添加一条账单信息
    async addBill(b_number, bt_number, b_ought, b_real, bs_name) {
      let result = await this.addOneBill({
        b_number: b_number,
        bt_number: bt_number,
        b_ought: b_ought,
        b_real: b_real,
        bs_name: bs_name
      });
      if (result == 1) return;
    },
    //获取当前时间函数
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime = hh + mm;
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    }
  },
  components: {
    XfqdTable,
    Send
  },
  mounted() {
    //获取时间
    this.nowTimes();
    this.getMenu(this.activeName);
    bus.$on("tableNumber", num => {
      this.tableNumber = num;
    });
  },
  created() {
    this.getRouterTnumber();
  }
};
</script>


