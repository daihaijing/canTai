<template>
  <div>
    <div :class="style.logo">
      <img
        src="../../../../static/assets/slogan.jpg"
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
          <el-menu-item index="tcsz" :disabled="isUser">套餐设置</el-menu-item>
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
          <el-menu-item index="jfdh" :disabled="isUser">积分兑换</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>会员信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="blxk" :disabled="isUser">办理新卡</el-menu-item>
          <el-menu-item index="hycz" :disabled="isUser">会员充值</el-menu-item>
          <el-menu-item index="tkgl" :disabled="isUser">退卡管理</el-menu-item>
          <el-menu-item index="fkcx" :disabled="isUser">发卡查询</el-menu-item>
          <el-menu-item index="czcx" :disabled="isUser">充值查询</el-menu-item>
          <el-menu-item index="hyyecx" :disabled="isUser">会员余额查询</el-menu-item>
          <el-menu-item index="hysrcx" :disabled="isUser">会员生日查询</el-menu-item>
          <el-menu-item index="hyxfcx" :disabled="isUser">会员消费查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
          <el-menu-item index="mbjzmxcx" :disabled="isUser">每笔结账明细查询</el-menu-item>
          <el-menu-item index="ryycx" :disabled="isUser">日营业查询</el-menu-item>
          <el-menu-item index="flsrcx" :disabled="isUser">分类收入查询</el-menu-item>
          <el-menu-item index="sfxmxsfx" :disabled="isUser">收费项目销售分析</el-menu-item>
          <el-menu-item index="sptdzdcx" :disabled="isUser">商品推单增单查询</el-menu-item>
          <el-menu-item index="xsqsfx" :disabled="isUser">销售趋势分析</el-menu-item>
          <el-menu-item index="jfdhcx" :disabled="isUser">积分兑换查询</el-menu-item>
          <el-menu-item index="xfjfsccx" :disabled="isUser">消费积分生成查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="ygxxgl" :disabled="isUser">员工信息管理</el-menu-item>
          <el-menu-item index="czsqgl" :disabled="isUser">操作授权管理</el-menu-item>
          <el-menu-item index="czyrzcx" :disabled="isUser">操作员日志查询</el-menu-item>
          <el-menu-item index="bz" :disabled="isUser">帮助</el-menu-item>
          <el-menu-item index="zc" :disabled="isUser">注册</el-menu-item>
          <el-menu-item index="tc" :disabled="isUser">退出</el-menu-item>
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

