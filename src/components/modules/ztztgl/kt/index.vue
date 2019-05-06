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
              <img :class="style.ktimg" src="/static/assets/empty.png" @click="toDianCan" v-if="item.t_state=='空闲'">
              <img :class="style.ktimg" src="/static/assets/used.png" @click="toDianCan" v-if="item.t_state=='占用'">
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
    <router-view @ulShow="ulShow"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import style from "css/kaitai.css";
import bus from "@/bus.js";
import { mapActions } from 'vuex';
import { getAllTable } from './mutation-types';
import { updateOneTable } from './mutation-types';
export default {
  data() {
    return {
      style,
      isUl: true,
      zhuotai: [],
    };
  },
  methods: {
    toDianCan(){
      this.$router.push({ name: "diancan" });
    },
    toYuDing(){
      this.$router.push({ name:'ctyd' });
    },
    ulShow(){
      this.isUl = false;
    },
    //异步通信
    ...mapActions({
      getAllTable,
      updateOneTable,
    }),
    //获取所有餐台
    async getTable(){
      let result = await this.getAllTable();
      if(!result) return;
      let data = JSON.parse(result);
      this.zhuotai = data;
      //console.log(this.zhuotai);
    },
    //修改餐台状态
    async updateTable(t_number,t_name,t_people,t_type,t_state){
      let result = await this.updateOneTable({
        t_number:t_number,
        t_name:t_name,
        t_people:t_people,
        t_type:t_type,
        t_state:t_state
      });
      if(result == 1) return;
    },
  },
  mounted() {
    bus.$on("yuding", num => {
      //console.log(this.zhuotai);
      for (let i = 0; i < this.zhuotai.length; i++) {
        if (num == this.zhuotai[i].t_number) {
          Vue.set(this.zhuotai, i, {
            t_number: this.zhuotai[i].t_number,
            t_name:this.zhuotai[i].t_name,
            t_people:this.zhuotai[i].t_people,
            t_type:this.zhuotai[i].t_type,
            t_state: "占用",
            src:"/static/assets/used.png",
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
  created(){
    this.getTable();
  }
};
</script>
