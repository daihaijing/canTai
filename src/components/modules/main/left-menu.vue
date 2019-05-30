<template>
  <div>
    <div :class="style.logo">
      <img
        src="../../../../static/assets/logo.jpg"
      >
    </div>
    <el-menu
      class="el-menu-vertical-demo left"
      :default-active="activeIndex"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>基础信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="ctsz" :disabled="isUser">餐台设置</el-menu-item>
          <el-menu-item index="sfxmsz" :disabled="isUser">收费项目设置</el-menu-item>
          <!-- <el-menu-item index="tcsz" :disabled="isUser">套餐设置</el-menu-item> -->
          <el-menu-item index="fwydj" :disabled="isUser">服务员登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>餐台状态管理</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="kt" :disabled="isUser">开台管理</el-menu-item>
          <el-menu-item index="zdcx" :disabled="isUser">账单查询</el-menu-item>
          <el-menu-item index="ctyd" :disabled="isUser">餐台预定</el-menu-item>
          <el-menu-item index="qtsy" :disabled="isUser">前台收银管理</el-menu-item>
          <el-menu-item index="hbct" :disabled="isUser">合并餐台</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- ///////////////////////////////////////////////////////////////////// -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>库存管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="cprk" :disabled="isUser">产品入库</el-menu-item>
          <el-menu-item index="cpck" :disabled="isUser">产品出库</el-menu-item>
          <el-menu-item index="kcpd" :disabled="isUser">库存查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>信息查询管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="mbjzmxcx" :disabled="isUser">点餐明细查询</el-menu-item>
          <el-menu-item index="sfxmxsfx" :disabled="isUser">收费项目销售分析</el-menu-item>
          <el-menu-item index="xsqsfx" :disabled="isUser">销售趋势分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="bzsm" :disabled="isUser">帮助说明</el-menu-item>
          <el-menu-item index="qxgl" :disabled="isUser">权限管理</el-menu-item>
          <el-menu-item index="xtcsh" :disabled="isUser">系统初始化</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import style from "css/main.css";
export default {
  data() {
    return {
      style,
      activeIndex:""
    };
  },
  methods: {
  
  },
  props:{
    isUser:null
  },
  mounted(){
      if(this.$route){
        this.activeIndex= this.$route.name;
      }
    },
  watch:{
    $route(){
      if(this.$route){
        this.activeIndex = this.$route.name;
      }
    },
  }
};
</script>

