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
                <span>{{item.num}}号桌</span>
                <br>
                <span>当前状态：{{item.status}}</span>
              </div>
              <img :class="style.ktimg" src="/static/assets/empty.png" @click="toDianCan" v-if="item.status=='空闲'">
              <img :class="style.ktimg" src="/static/assets/used.png" @click="toDianCan" v-if="item.status=='占用'">
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
export default {
  data() {
    return {
      style,
      isUl: true,
      zhuotai: [
        {
          num: 1,
          status: "空闲",
        },
        {
          num: 2,
          status: "空闲",
        },
        {
          num: 3,
          status: "空闲",
        },
        {
          num: 4,
          status: "空闲",
        },
        {
          num: 5,
          status: "空闲",
        },
        {
          num: 6,
          status: "空闲",
        },
        {
          num: 7,
          status: "空闲",
        },
        {
          num: 8,
          status: "空闲",
        },
        {
          num: 9,
          status: "空闲",
        },
        {
          num: 10,
          status: "空闲",
        },
        {
          num: 11,
          status: "空闲",
        },
        {
          num: 12,
          status: "空闲",
        },
        {
          num: 13,
          status: "空闲",
        },
        {
          num: 14,
          status: "空闲",
        },
        {
          num: 15,
          status: "空闲",
        },
        {
          num: 16,
          status: "空闲",
        }
      ]
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
    }
  },
  mounted() {
    bus.$on("yuding", num => {
      for (let i = 0; i < this.zhuotai.length; i++) {
        if (num == this.zhuotai[i].num) {
          Vue.set(this.zhuotai, i, {
            num: this.zhuotai[i].num,
            status: "占用",
            src:"/static/assets/used.png",
          });
        }
      }
    });
  }
};
</script>
