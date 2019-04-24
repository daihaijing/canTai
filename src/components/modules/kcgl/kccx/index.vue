<template>
  <div>
    <div :class="style.title">
      <span :class="style.title_span">库存查询</span>
    </div>
    <div :class="style.content">
      <div>
        <span :class="style.txtView">商品类别：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span :class="style.txtView">拼音检索码：</span>
        <el-input :class="style.inputView" v-model="num"></el-input>
        <el-button type="info" plain @click="find">查询</el-button>
        <el-button type="info" plain @click="print">打印</el-button>
        <el-button type="info" plain @click="exportExcel">导出Excel</el-button>
        <el-button type="info" plain @click="backKT">返回</el-button>
      </div>
      <product-store :tableData="tableData" class="table" :flag="flag" @deleteData="deleteData"></product-store>
    </div>
  </div>
</template>

<script>
import style from "css/kcgl.css";
import ProductStore from "./../product-store"; 
export default {
  data() {
    return {
      style,
      options: [{
          value: '选项1',
          label: '啤酒'
        }, {
          value: '选项2',
          label: '饮料'
        }, {
          value: '选项3',
          label: '调味料'
        }, {
          value: '选项4',
          label: '面粉'
        }, {
          value: '选项5',
          label: '餐具'
        }],
      value: '',
      tableData: [
        {
          jsm: "WHH",
          xmmc: "哇哈哈",
          dw: "瓶",
          cplb: "猪",
          jhdj: "1",
          rksl: "20"
        },
        {
          jsm: "BS",
          xmmc: "哇哈哈",
          dw: "瓶",
          cplb: "饮料",
          jhdj: "1",
          rksl: "20"
        },{
          jsm: "EJL",
          xmmc: "哇哈哈",
          dw: "瓶",
          cplb: "猪",
          jhdj: "1",
          rksl: "20"
        }
      ],
      flag:"find",
      num:"",
    };
  },
  methods:{
    find(){

    },
    print(){

    },
    exportExcel(){

    },
    deleteData(e) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (e == this.tableData[i]) {
          this.tableData.splice(i, 1);
        }
      }
    },
    backKT(){
      this.$router.push({path:'kt'});
    }
  },
  components:{
    ProductStore,
  }
};
</script>
