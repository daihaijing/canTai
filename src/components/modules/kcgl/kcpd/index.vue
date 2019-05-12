<template>
  <div>
    <div :class="style.title">
      <span :class="style.title_span">库存盘点</span>
    </div>
    <div :class="style.content">
      <div :class="style.kccxEmit">
        <span :class="style.txtView">商品类别：</span>
        <el-select v-model="type" placeholder="请选择" class="rkSelect" style="margin-left:10px;" @change="typeChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span :class="style.txtView">项目编号/检索码：</span>
        <el-input :class="style.inputView" v-model="msg" @keyup.enter.native="find(msg)"></el-input>
        <el-button type="info" plain @click="find(msg)">查询</el-button>
        <el-button type="info" plain @click="backKT" style="float: right;margin-right: 5%;">返回</el-button>
      </div>
      <product-store  :tableData="tableData" class="pdTable" style="margin-top:10px" :flag="flag"></product-store>
    </div>
  </div>
</template>

<script>
import style from "css/kcgl.css";
import ProductStore from "./../product-store"; 
import { mapActions } from "vuex";
import { getOneDepository,getSomeDepositoryByDtype } from "../cprk/mutation-types";
export default {
  data() {
    return {
      style,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "后厨",
          label: "后厨"
        },
        {
          value: "前台",
          label: "前台"
        },
        {
          value: "保洁",
          label: "保洁"
        },
      ],
      value: '',
      tableData: [],
      flag:"analy",
      type:"",
      msg:"",
    };
  },
  methods:{
    ...mapActions({
      getOneDepository,
      getSomeDepositoryByDtype,
    }),
    //根据编号或者检索码查询
    async getDepository(msg){
      let result = await this.getOneDepository({
        msg:msg,
      });
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
    },
    //根据类别查询
    async getDepositoryDtype(d_type){
      let result = await this.getSomeDepositoryByDtype({
        d_type:d_type,
      });
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
    },
    //类型改变
    typeChange(val){
      this.type = val;
      this.tableData = [];
      this.getDepositoryDtype(val);
    },
    //按项目编号或者检索码查询
    find(val){
      this.simplename = val;
      this.tableData = [];
      this.getDepository(val);
    },
    backKT(){
      this.$router.push({path:'kt'});
    }
  },
  components:{
    ProductStore,
  },
  created(){
    this.getDepositoryDtype(this.type);
  }
};
</script>
