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
                v-if="item.t_state=='占用'"
              >
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
    <addKaiTai
      :addVisible="addVisible"
      :o_number="o_number"
      :ot_number="ot_number"
      :staffTable = "staffTable"
      @addCloseEmit="addCloseEmit"
      @newAdd="newAdd"
      v-if="addVisible"
    ></addKaiTai>
    <router-view @ulShow="ulShow"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import style from "css/kaitai.css";
import bus from "@/bus.js";
import AddKaiTai from "#com/addKaiTai";
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
      staffTable:[],
      diancanTable: []
    };
  },
  methods: {
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
      if (val.t_state == "空闲") {
        //暂定随机生成8位数字，作为点餐编号
        let number = "";
        for (let i = 0; i < 8; i++) {
          number += Math.floor(Math.random() * 10);
        }
        this.addVisible = true;

        this.o_number = number;
        this.ot_number = val.t_number;
        
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
            ot_number: val.t_number,
          }
        });
      }
      //传递当前点击的桌台号
      //console.log(val.t_number);
      // setTimeout(()=>{
      //       bus.$emit("tableNumber",val.t_number);
      // },1000)
    },
    toYuDing() {
      this.$router.push({ name: "ctyd" });
    },
    ulShow() {
      this.isUl = false;
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
    }),
    //获取所有餐台
    async getTable() {
      let result = await this.getAllTable();
      if (!result) return;
      let data = JSON.parse(result);
      this.zhuotai = data;
      //console.log(this.zhuotai);
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
    async deleteReserve(t_number) {
      let result = await this.deleteOneReserve({
        rt_number: t_number
      });
      if (result == 1) return;
      this.deleteOrder(t_number);
      this.deleteOneOrderItem(t_number);
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
    async getStaff(){
      let result = await this.getAllStaff();
      if (!result) return;
      let data = JSON.parse(result);
      this.staffTable = data;
    },
    makeArray(obj) {
      return Array.prototype.slice.call(obj, 0);
    }
  },
  mounted() {
    bus.$on("yuding", num => {
      //console.log(this.zhuotai);
      for (let i = 0; i < this.zhuotai.length; i++) {
        if (num == this.zhuotai[i].t_number) {
          Vue.set(this.zhuotai, i, {
            t_number: this.zhuotai[i].t_number,
            t_name: this.zhuotai[i].t_name,
            t_people: this.zhuotai[i].t_people,
            t_type: this.zhuotai[i].t_type,
            t_state: "占用",
            src: "/static/assets/used.png"
          });
          this.updateTable(
            this.zhuotai[i].t_number,
            this.zhuotai[i].t_name,
            this.zhuotai[i].t_people,
            this.zhuotai[i].t_type,
            this.zhuotai[i].t_state
          );
        }
      }
    });
  },
  created() {
    this.getTable();
    this.getStaff();
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
            that.deleteReserve(that.zhuotai[i].t_number);
            that.updateState(that.zhuotai[i].t_number, "空闲");
            that.zhuotai[i].t_state = "空闲";
          }
        };
      }
    });
  },
  components: {
    AddKaiTai,
  }
};
</script>
