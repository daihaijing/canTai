<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">开台管理</span>
    </div>
    <div :class="style.content">
      <div>
        <ul>
          <li v-for="(item,index) in zhuotai" :key="`${index}`">
            <el-tooltip placement="top">
              <div slot="content">
                <span>{{item.t_name}}</span>
                <br>
                <span>当前状态：{{item.t_state}}</span>
              </div>
              <img
                :class="style.ktimg"
                src="/static/assets/empty.png"
                @click="toDianCan(item)"
                class="btn"
                v-if="item.t_state=='空闲'"
              >
              <img
                :class="style.ktimg"
                src="/static/assets/used.png"
                @click="toDianCan(item)"
                class="btn"
                v-if="item.t_state == '占用' || item.t_state == '预订'"
              >
            </el-tooltip>
          </li>
        </ul>
      </div>
      <Select v-if="select" :tableData="reserveData" class="yuDingSelect"></Select>
      <el-button type="info" plain :class="style.btnReserve" @click="selectEmit">预订查询</el-button>
    </div>
    <addKaiTai
      :addVisible="addVisible"
      :o_number="o_number"
      :ot_number="ot_number"
      :staffTable="staffTable"
      @addCloseEmit="addCloseEmit"
      @newAdd="newAdd"
      v-if="addVisible"
    ></addKaiTai>
    <!-- <router-view @ulShow="ulShow"></router-view> -->
  </div>
</template>

<script>
import Vue from "vue";
import style from "css/kaitai.css";
import bus from "@/bus.js";
import AddKaiTai from "#com/addKaiTai";
import Select from "./select";
import { mapActions } from "vuex";
import {
  getAllTable,
  updateOneTable,
  deleteOneReserve,
  updateTableState,
  addOneNewOrder,
  deleteOneOrder,
  deleteOneOrderItemByOTnumber,
  getOneOrderByOnumber,
  getAllStaff,
  getReserveByNowTime
} from "./mutation-types";
export default {
  data() {
    return {
      style,
      isUl: true,
      zhuotai: [],
      addVisible: false,
      o_number: "",
      ot_number: "",
      staffTable: [],
      diancanTable: [],
      reserveData: [], //保存预订信息
      nowTime: "", //记录当前时间
      flag: 0, //标记所选餐台是否已被预订
      select: false
    };
  },
  methods: {
    selectEmit() {
      if (!this.select) this.select = true;
      else this.select = false;
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(o_number, ot_number, o_customers, o_server) {
      var newData = {
        o_number: o_number,
        ot_number: ot_number,
        o_customers: o_customers,
        o_server: o_server
      };
      this.addOrder(o_number, ot_number, o_customers, o_server);
      this.diancanTable.push(newData);
      this.addVisible = false;
      this.updateState(ot_number, "占用");
      this.$router.push({
        name: "diancan",
        params: {
          o_number: o_number,
          ot_number: ot_number
        }
      });
    },
    toDianCan(val) {
      this.flag = 0;
      if (val.t_state == "空闲") {
        for (let i = 0; i < this.reserveData.length; i++) {
          if (
            this.reserveData[i].rt_number == val.t_number &&
            new Date(this.reserveData[i].r_time).getTime() / 1000 <
              new Date(this.nowTime).getTime() / 1000
          ) {
            this.flag = 1;
            this.$confirm(
              "当前餐台已被预定，请确认顾客信息是否正确！",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
              }
            )
              .then(() => {
                //暂定随机生成8位数字，作为点餐编号
                let number = "";
                for (let i = 0; i < 8; i++) {
                  number += Math.floor(Math.random() * 10);
                }
                this.addVisible = true;

                this.o_number = number;
                this.ot_number = val.t_number;
                this.$message({
                  type: "success",
                  message: "开台成功!"
                });
              })
              .catch(() => {
                this.deleteReserve(this.reserveData[i].r_number);
                this.$message({
                  type: "info",
                  message: "已取消预订"
                });
                //暂定随机生成8位数字，作为点餐编号
                let number = "";
                for (let i = 0; i < 8; i++) {
                  number += Math.floor(Math.random() * 10);
                }
                this.addVisible = true;

                this.o_number = number;
                this.ot_number = val.t_number;
              });
          }
        }
        if (this.flag == 0) {
          //暂定随机生成8位数字，作为点餐编号
          let number = "";
          for (let i = 0; i < 8; i++) {
            number += Math.floor(Math.random() * 10);
          }
          this.addVisible = true;

          this.o_number = number;
          this.ot_number = val.t_number;
        }
      } else {
        //暂定随机生成8位数字，作为点餐编号
        let number = "";
        for (let i = 0; i < 8; i++) {
          number += Math.floor(Math.random() * 10);
        }
        this.$router.push({
          name: "diancan",
          params: {
            o_number: number,
            ot_number: val.t_number
          }
        });
      }
    },
    toYuDing() {
      this.$router.push({ name: "ctyd" });
    },
    //异步通信
    ...mapActions({
      getAllTable,
      updateOneTable,
      deleteOneReserve,
      updateTableState,
      addOneNewOrder,
      deleteOneOrder,
      deleteOneOrderItemByOTnumber,
      getOneOrderByOnumber,
      getAllStaff,
      getReserveByNowTime
    }),
    //获取所有餐台
    async getTable() {
      let result = await this.getAllTable();
      if (!result) return;
      let data = JSON.parse(result);
      this.zhuotai = data;
    },
    //获取当前桌号的点餐信息
    // getOneOrder()
    //修改餐台状态
    async updateTable(t_number, t_name, t_people, t_type, t_state) {
      let result = await this.updateOneTable({
        t_number: t_number,
        t_name: t_name,
        t_people: t_people,
        t_type: t_type,
        t_state: t_state
      });
      if (result == 1) return;
    },
    async deleteOneOrderItem(ot_number) {
      let result = await this.deleteOneOrderItemByOTnumber({
        ot_number: ot_number
      });
      if (result == 1) return;
    },
    //取消预定
    async deleteReserve(r_number) {
      let result = await this.deleteOneReserve({
        r_number: r_number
      });
      if (result != 1) return;
    },
    async updateState(t_number, t_state) {
      let result = await this.updateTableState({
        t_number: t_number,
        t_state: t_state
      });
      if (!result) return;
    },
    //添加点餐记录
    async addOrder(o_number, ot_number, o_customers, o_server) {
      let result = await this.addOneNewOrder({
        o_number: o_number,
        ot_number: ot_number,
        o_customers: o_customers,
        o_server: o_server
      });
      if (result == 1) return;
    },
    //删除点餐记录
    async deleteOrder(ot_number) {
      let result = await this.deleteOneOrder({
        ot_number: ot_number
      });
      if (result == 1) return;
    },
    //获取全部员工信息
    async getStaff() {
      let result = await this.getAllStaff();
      if (!result) return;
      let data = JSON.parse(result);
      this.staffTable = data;
    },
    //获取当前日期的预订信息
    async getReserve(r_time) {
      let result = await this.getReserveByNowTime({
        r_time: r_time
      });
      let data = JSON.parse(result);
      this.reserveData = data;
      //console.log(this.reserveData);
    },
    makeArray(obj) {
      return Array.prototype.slice.call(obj, 0);
    },
    // 获取当前时间函数
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
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime =
        year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss;
      // console.log(this.nowTime);
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    }
  },
  mounted() {
    bus.$on("yuding", num => {
      this.getReserve(this.nowTime.substring(0, 10));
      // console.log(this.zhuotai);
      // for (let i = 0; i < this.zhuotai.length; i++) {
      //   if (num == this.zhuotai[i].t_number) {
      //     Vue.set(this.zhuotai, i, {
      //       t_number: this.zhuotai[i].t_number,
      //       t_name: this.zhuotai[i].t_name,
      //       t_people: this.zhuotai[i].t_people,
      //       t_type: this.zhuotai[i].t_type,
      //       t_state: "预订",
      //       src: "/static/assets/used.png"
      //     });
      //     this.updateTable(
      //       this.zhuotai[i].t_number,
      //       this.zhuotai[i].t_name,
      //       this.zhuotai[i].t_people,
      //       this.zhuotai[i].t_type,
      //       this.zhuotai[i].t_state
      //     );
      //   }
      // }
    });
  },
  created() {
    this.getTable();
    this.getStaff();
    //获取时间
    this.nowTimes();
    this.getReserve(this.nowTime.substring(0, 10));
  },
  updated() {
    this.$nextTick(() => {
      let a = document.getElementsByClassName("btn");
      for (let i = 0; i < a.length; i++) {
        //这一步是为了阻止右击时系统默认的弹出框
        a[i].oncontextmenu = function(e) {
          e.preventDefault();
        };
        //在这里你就可以自己定义事件的函数啦
        var that = this;
        a[i].onmouseup = function(oEvent) {
          if (!oEvent) oEvent = window.event;
          if (oEvent.button == 2) {
            that.deleteOrder(that.zhuotai[i].t_number);
            that.deleteOneOrderItem(that.zhuotai[i].t_number);
            that.updateState(that.zhuotai[i].t_number, "空闲");
            that.zhuotai[i].t_state = "空闲";
          }
        };
      }
    });
  },
  beforeDestroy() {
    bus.$off("yuding");
  },
  components: {
    AddKaiTai,
    Select
  }
};
</script>
