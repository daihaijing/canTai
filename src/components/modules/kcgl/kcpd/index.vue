<template>
  <div>
    <div :class="style.title">
      <span :class="style.title_span">库存盘点</span>
    </div>
    <div :class="style.content">
      <div :class="style.kccxEmit">
        <span :class="style.txtView">商品类别：</span>
        <el-select v-model="value" placeholder="请选择" class="rkSelect" style="margin-left:10px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div :class="style.buttonEmit">
          <el-button type="info" plain @click="find">查询</el-button>
          <el-button type="info" plain @click="finish">盘点完成</el-button>
          <el-button type="info" plain @click="backKT" style="float: right;margin-right: 5%;">返回</el-button>
        </div>
      </div>
      <product-store :tableData="tableData" class="table" :flag="flag"></product-store>
      <div :class="style.tip">
        <span>提示：先查询数据，再在盘点实际数量框内输入实际数量，最后点击”盘点完成“按钮！</span>
      </div>
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
      flag:"analy",
    };
  },
  methods:{
    find(){

    },
    finish(){

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
