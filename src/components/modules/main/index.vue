<template>
  <div :class="style.layout">
    <left-menu :class="style.left" :isUser="isUser"></left-menu>
    <header-title @login="login" @openXiuGai="openXiuGai"></header-title>
    <title-menu :isUser="isUser"></title-menu>
    <router-view :class="style.content"></router-view>
    <login-view :isLogin="isLogin" @loginEmit="loginEmit"></login-view>
    <set-password :settingVisible="settingVisible" @back="back" @loginEmit="back" class="xiugai" v-if="settingVisible"></set-password>
  </div>
</template>

<script>
import style from "@/css/main";
import { mapGetters, mapActions } from "vuex";
import LeftMenu from "./left-menu";
import HeaderTitle from "./header-title";
import TitleMenu from "./title-menu";
import LoginView from "./login-view";
import SetPassword from "#com/setPassword"

export default {
  data() {
    return {
      style,
      isLogin: false,
      isUser:true,
      settingVisible:false,
    };
  },
  components: {
    LeftMenu,
    HeaderTitle,
    TitleMenu,
    LoginView,
    SetPassword
  },
  computed: {},
  methods: {
    loginEmit() {
      this.isLogin = false;
    },
    login(){
      this.isLogin = true;
    },
    back(){
      this.settingVisible = false;
    },
    openXiuGai(){
      this.settingVisible = true;
    }
  },
  watch: {},
  mounted() {
    if (localStorage.getItem("user")) {
      let time = JSON.parse(localStorage.getItem("user")).time;
      if(Date.parse(new Date()) <= time){
        this.isLogin = false;
        this.isUser = false;
      }else{
        this.isLogin = true;
        this.isUser = false;
      }
    } else {
      this.isLogin = true;
      this.isUser = false;
    }
  }
};
</script>

