<template>
  <div>
    <div :class="style.title">
      <span :class="style.title_span">{{keyName}}</span>
    </div>
    <div :class="style.content">
      <div :class="style.rkLeft">
        <span :class="style.txtView">项目清单</span>
        <div style="margin-top:5px;">
          <span :class="style.txtView">编号/检索码：</span>
          <el-input :class="style.inputView" v-model="name" @change="nameChange"></el-input>
        </div>
        <div style="margin-top:5px;">
          <span :class="style.txtView">入库数量：</span>
          <el-input :class="style.inputView" v-model="num" style="margin-left:23px;"></el-input>
        </div>
        <div style="margin-top:5px;">
          <span :class="style.txtView">单价：</span>
          <el-input :class="style.inputView" v-model="price" style="margin-left:55px;"></el-input>
        </div>
        <div style="margin-top:5px;">
          <span :class="style.txtView">查看类别:</span>
          <el-select v-model="type" placeholder="请选择" class="rkSelect" @change="typeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="info" plain @click="select">-></el-button>
        </div>
        <product-store :tableData="tableData" class="table" @deleteData="deleteData" v-loading="loading"></product-store>
      </div>
      <div :class="style.rkRight">
        <span :class="style.txtView">产品入库单</span>
        <div style="margin-top:10px;">
          <span :class="style.txtView">单据号：</span>
          <span>{{nowNum}}</span>
          <span :class="style.txtView">入库人员：</span>
          <span>{{people}}</span>
          <span :class="style.txtView">入库日期：</span>
          <span>{{nowTime}}</span>
        </div>
        <product-store :tableData="tableData2" class="table" @deleteData="deleteData2"></product-store>
        <div style="text-align:center;">
          <el-button type="info" plain @click="add" v-if="flag =='add'">入库</el-button>
          <el-button type="info" plain @click="del" v-else-if="flag=='del'">出库</el-button>
          <el-button type="info" plain>返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import style from "@/css/kcgl.css";
import ProductStore from "./product-store";
export default {
  data() {
    return {
      style,
      name: "",
      num: 0,
      price: 0,
      type: "all",
      people: "",
      date: "",
      nowTime:"",
      nowNum:"",
      // tableData: [
      //   {
      //     jsm: "WHH",
      //     xmmc: "哇哈哈",
      //     dw: "瓶",
      //     cplb: "猪",
      //     jhdj: "1",
      //     rksl: "20"
      //   },
      //   {
      //     jsm: "BS",
      //     xmmc: "哇哈哈",
      //     dw: "瓶",
      //     cplb: "饮料",
      //     jhdj: "1",
      //     rksl: "20"
      //   },{
      //     jsm: "EJL",
      //     xmmc: "哇哈哈",
      //     dw: "瓶",
      //     cplb: "猪",
      //     jhdj: "1",
      //     rksl: "20"
      //   },{
      //     jsm: "EJL",
      //     xmmc: "哇哈哈",
      //     dw: "瓶",
      //     cplb: "饮料",
      //     jhdj: "1",
      //     rksl: "20"
      //   }
      // ],
      options: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "pig",
          label: "猪"
        },
        {
          value: "water",
          label: "饮料"
        },
      ],
      tableData2: [],
    };
  },
  methods: {
    //检索码改变
    nameChange(){
      this.$emit("nameChange",this.name);
    },
    //类别改变
    typeChange(){
      this.$emit("typeChange",this.type);
    },
    //选择
    select() {
      // this.tableData2 = this.tableData;这样写会使两个数据占据同样位置的内存，操纵一个另外一个也会跟着改变
      this.tableData.map((item,index)=>{
        let a = {};
        a.jsm = item.jsm;
        a.xmmc = item.xmmc;
        a.dw = item.dw;
        a.cplb = item.cplb;
        a.jhdj = item.jhdj;
        a.rksl = item.rksl;
        this.tableData2.push(a);
      })
      this.tableData2.map((item, index) => {
        item.jhdj = this.price == '' ? 0 : this.price;
        item.rksl = this.num == '' ? 0 :this.num;
      });
    },
    //入库
    add(){
      
    },
    //出库
    del(){

    },
    //查询
    find(){

    },
    //盘点
    analy(){

    },
    //删除一条记录
    deleteData(val) {
      this.$emit("deleteData",val);
    },
    deleteData2(e) {
      for (let i = 0; i < this.tableData2.length; i++) {
        if (e == this.tableData2[i]) {
          this.tableData2.splice(i, 1);
        }
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
        year +"-"+ month + "-" + date + " " + hh + ":" + mm;
      // console.log(this.nowTime);
      this.nowNum = 
        year+month+date +hh+mm;
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    }
  },
  props:{
    keyName:null,
    flag:null,
    tableData:null,
    loading:null,
  },
  mounted() {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.people = user.userName;
    }
    this.nowTimes();
  },
  components: {
    ProductStore
  }
};
</script>
