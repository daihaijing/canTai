<template>
  <div>
    <el-tabs class="dcTitle" v-model="activeName2">
      <el-tab-pane label="点餐" class="dianCanTab" name="dc">
        <el-tabs class="dcTable" v-model="activeName" type="card">
          <el-tab-pane label="特色菜系" name="1">
            <div v-if="item.index==1" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="热菜菜系" name="2">
            <div v-if="item.index==2" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="凉菜菜系" name="3">
            <div v-if="item.index==3" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="酒水饮料" name="4">
            <div v-if="item.index==4" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="5">
            <div v-if="item.index==5" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="6">
            <div v-if="item.index==6" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="7">
            <div v-if="item.index==7" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="8">
            <div v-if="item.index==8" v-for="(item,index) in dcData2" :class="style.dcIcon" :key="index">
              <img :class="style.dcimg" :src="item.img" class="dcimg">
              <i class="el-icon-minus dcRight" @click="dcRemove(item)"></i>
              <i class="el-icon-plus dcLeft" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="width: calc(35% - 20px);float: left;margin: 0 10px;margin-top: 20px;">
          <span>项目名称:</span>
          <el-input :class="style.inputView" v-model="message" @keyup.enter.native="searchXM"></el-input>
          <el-button type="info" plain @click="searchXM">查询</el-button>
          <send :dcData="dcData"></send>
          <div :class="style.sendDiv">
            <el-button type="info" plain @click="submitOrder(dcData)" :class="style.send" :disabled="sendAble">发送</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消费清单" name="xf">
        <xfqd-table class="table" :tableData="tableData" :allPayAble="allPayAble" @payment="payment(tableData)"></xfqd-table>
      </el-tab-pane>  
    </el-tabs>
  </div>
</template>
<script>
import style from "css/kaitai.css";
import Vue from "vue";
import XfqdTable from "./xfqd-table"
import Send from "./send"
export default {
  data() {
    return {
      style,
      activeName: "1",
      activeName2:"dc",
      tableData: [],
      dcData: [],
      dcData2: [
        {
          index: "1",
          img: "static/assets/empty.png",
          name: "点心",
          num: "001",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "1",
          img: "static/assets/empty.png",
          name: "点心",
          num: "002",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "1",
          img: "static/assets/empty.png",
          name: "点心",
          num: "003",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "1",
          img: "static/assets/empty.png",
          name: "点心",
          num: "004",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "1",
          img: "static/assets/empty.png",
          name: "点心",
          num: "005",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "1",
          img: "static/assets/empty.png",
          name: "点心",
          num: "006",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "1",
          img: "static/assets/empty.png",
          name: "点心",
          num: "007",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "2",
          img: "static/assets/empty.png",
          name: "点心",
          num: "008",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "2",
          img: "static/assets/empty.png",
          name: "点心",
          num: "009",
          code: "DX",
          dw: "盘",
          count: "1",
          price: "20"
        },
        {
          index: "3",
          img: "static/assets/name.jpg",
          name: "点心",
          num: "010",
          code: "DDD",
          dw: "盘",
          count: "1",
          price: "20"
        }
      ],
      message: "",
      sendAble:true,//发送按钮是否可以点击
      allPayAble:true,//结算按钮是否可以点击
    };
  },
  methods: {
    //添加菜品
    diancan(val) {
      if (this.dcData.length == 0) {
        var newData = {
          name: val.name,
          num: val.num,
          code: val.code,
          dw: val.dw,
          count: val.count,
          price: val.price
        };
        this.dcData.push(newData);
      } else {
        let flag = 0;
        for (let i = 0; i < this.dcData.length; i++) {
          if (val.num == this.dcData[i].num) {
            this.dcData[i].count++;
            flag = 1;
            break;
          }
        }
        if (flag == 0) {
          var newData = {
            name: val.name,
            num: val.num,
            code: val.code,
            dw: val.dw,
            count: val.count,
            price: val.price
          };
          this.dcData.push(newData);
        }
      }
    },
    //删除菜品
    dcRemove(val) {
      for (let i = 0; i < this.dcData.length; i++) {
        if (val.num == this.dcData[i].num) {
          if (this.dcData[i].count == 1) {
            this.dcData.splice(i, 1);
          } else {
            this.dcData[i].count--;
          }
          break;
        }
      }
    },
    searchXM() {
      let a = document.getElementsByClassName("dcimg");
      for (let i = 0; i < a.length; i++) {
        a[i].style.border = "0";
      }
      this.dcData2.map((item, index) => {
        if (this.message == item.num || this.message == item.code) {
          this.activeName = item.index;
          for (let i = 0; i < a.length; i++) {
            if (item.img == a[i].attributes[0].nodeValue) {
              a[i].style.border = "2px dashed #aaa";
            }
          }
        }
      });
    },
    submitOrder(val) {
      for (let i = 0; i < val.length; i++) {
        var newData = {
          num: val[i].num,
          name: val[i].name,
          code: val[i].code,
          dw: val[i].dw,
          count: val[i].count,
          price: val[i].price,
          money: val[i].price * val[i].count,
          time: "XX:XX",
        };
        this.tableData.push(newData);
      }
      this.dcData = [];
      this.activeName2 = "xf";
    },
    payment(val){
      let countMoney = 0;
      for(let i = 0;i<val.length;i++){
        countMoney += val[i].money;
      }
      this.$notify({
          title: '结算成功',
          message: '总共消费'+countMoney+'元',
          type: 'success'
      });
    }
  },
  components:{
    XfqdTable,
    Send
  },
  mounted() {
    if(this.dcData.length>0){
      this.sendAble = false;
    }
    if(this.tableData.length>0){
      this.allPayAble = false;
    }
  },
  watch:{
    dcData(){
      if(this.dcData.length>0){
        this.sendAble = false;
      }else if(this.dcData.length==0){
        this.sendAble = true;
      }
    },
    tableData(){
      if(this.tableData.length>0){
        this.allPayAble = false;
      }
    }
  }
};
</script>

