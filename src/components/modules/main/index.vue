<template>
  <div :class="style.layout">
    <left-menu :class="style.left"></left-menu>
    <header-title></header-title>
    <title-menu></title-menu>
    <router-view :class="style.content"></router-view>
    <login-view :isLogin="isLogin" @loginEmit="loginEmit"></login-view>
  </div>
</template>

<script>
import style from "@/css/main";
import { mapGetters, mapActions } from "vuex";
import LeftMenu from "./left-menu";
import HeaderTitle from "./header-title";
import TitleMenu from "./title-menu";
import LoginView from "./login-view";


export default {
  data() {
    return {
      style,
      isLogin: false
    };
  },
  components: {
    LeftMenu,
    HeaderTitle,
    TitleMenu,
    LoginView
  },
  computed: {},
  methods: {
    loginEmit() {
      this.isLogin = false;
    },
    
  },
  watch: {},
  mounted() {
    if (localStorage.getItem("user")) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }
};
</script>

