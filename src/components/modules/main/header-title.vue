<template>
  <div :class="style.title">
    <ul>
      <li>{{locationCity}} {{locationWeather}}</li>
      <li>{{nowTime}}</li>
    </ul>
    <p></p>
    <div>
      <el-dropdown v-if="userName" @command="handleCommand">
        <span class="el-dropdown-link">{{userName}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img :class="style.imgtitle" src="/static/assets/whitepeople.gif" v-if="userName">
      <span v-else @click="loginPlease">请登录</span>
    </div>
  </div>
</template>

<script>
import style from "@/css/main";
import BMap from "BMap";
import { getWeatherata} from "./mutation-types";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      locationCity: "加载中。。。",
      locationWeather:"",
      nowTime: "",
      style,
      value: "",
      userName: "",
      isLogin: false,
    };
  },
  methods: {
    //获取当前城市的天气
    ...mapActions({
      getWeatherata,
    }),
    //登录
    loginPlease(){
       this.$emit("login");
    },
    handleCommand(command) {
      if (command == "exit") {
        this.userName = "";
        localStorage.setItem("user", "");
        location.reload();
      }
      if(command == 'pwd'){
        //
      }
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
      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime =
        year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
      // console.log(this.nowTime);
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    },
    //获取当前城市
    dz() {
      var that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function getinfo(position) {
          let city = position.address.city; //获取城市信息
          let province = position.address.province;
          // console.log(city+'--'+province)
          that.locationCity = city; //将城市名称保存到locationCity中
          that.getWeather();
        },
        function(e) {
          that.locationCity = "定位失败";
        },
        {
          provider: "baidu"
        }
      );
    },
    async getWeather() {
      // 获取天气
      let result = await this.getWeatherata({
        city: this.locationCity
      });
      if (!result) return;
      let data = JSON.parse(result);
      if(data.desc=='OK'){
        this.locationWeather = data.data.forecast[0].type;
      }else{
        this.locationWeather = '天气未获取成功';
      }
    },
  },
  mounted() {
    //获取时间
    this.nowTimes();
    //获取地点
    this.dz();
    if (localStorage.getItem("user")) {
      let time = JSON.parse(localStorage.getItem("user")).time;
      if (Date.parse(new Date()) > time){
        localStorage.setItem("user", "");
      }else{
        this.userName = JSON.parse(localStorage.getItem("user")).userName;
      }
    }
  }
};
</script>

<style>
</style>
