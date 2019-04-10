<template>
  <div>
    <div :class="style.logo">
      <img
        src="../../../../static/assets/slogan.jpg"
      >
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo left"
      @open="handleOpen"
      @close="handleClose"

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
          <el-menu-item index="ctsz">餐台设置</el-menu-item>
          <el-menu-item index="sfxmsz">收费项目设置</el-menu-item>
          <el-menu-item index="tcsz">套餐设置</el-menu-item>
          <el-menu-item index="fwydj">服务员登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>餐台状态管理</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="kt">开台管理</el-menu-item>
          <el-menu-item index="zdcx">账单查询</el-menu-item>
          <el-menu-item index="ctyd">餐台预定</el-menu-item>
          <el-menu-item index="qtsy">前台收银管理</el-menu-item>
          <el-menu-item index="hbct">合并餐台</el-menu-item>
          <el-menu-item index="jfdh">积分兑换</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>会员信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="blxk">办理新卡</el-menu-item>
          <el-menu-item index="hycz">会员充值</el-menu-item>
          <el-menu-item index="tkgl">退卡管理</el-menu-item>
          <el-menu-item index="fkcx">发卡查询</el-menu-item>
          <el-menu-item index="czcx">充值查询</el-menu-item>
          <el-menu-item index="hyyecx">会员余额查询</el-menu-item>
          <el-menu-item index="hysrcx">会员生日查询</el-menu-item>
          <el-menu-item index="hyxfcx">会员消费查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>库存管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="cprk">产品入库</el-menu-item>
          <el-menu-item index="cpck">产品出库</el-menu-item>
          <el-menu-item index="kcpd">库存盘点</el-menu-item>
          <el-menu-item index="kccx">库存查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>信息查询管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="mbjzmxcx">每笔结账明细查询</el-menu-item>
          <el-menu-item index="ryycx">日营业查询</el-menu-item>
          <el-menu-item index="flsrcx">分类收入查询</el-menu-item>
          <el-menu-item index="sfxmxsfx">收费项目销售分析</el-menu-item>
          <el-menu-item index="sptdzdcx">商品推单增单查询</el-menu-item>
          <el-menu-item index="xsqsfx">销售趋势分析</el-menu-item>
          <el-menu-item index="jfdhcx">积分兑换查询</el-menu-item>
          <el-menu-item index="xfjfsccx">消费积分生成查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="ygxxgl">员工信息管理</el-menu-item>
          <el-menu-item index="czsqgl">操作授权管理</el-menu-item>
          <el-menu-item index="czyrzcx">操作员日志查询</el-menu-item>
          <el-menu-item index="bz">帮助</el-menu-item>
          <el-menu-item index="zc">注册</el-menu-item>
          <el-menu-item index="tc">退出</el-menu-item>
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
      style
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {},
  mounted() {}
};
</script>

