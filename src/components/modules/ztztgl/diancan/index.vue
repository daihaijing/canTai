<template>
  <div>
    <el-tabs class="dcTitle">
      <el-tab-pane label="点餐" class="dianCanTab">
        <el-tabs class="dcTable" v-model="activeName" type="card">
          <el-tab-pane label="特色菜系" name="1">
            <div v-if="item.index==1" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="热菜菜系" name="2">
            <div v-if="item.index==2" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="凉菜菜系" name="3">
            <div v-if="item.index==3" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="酒水饮料" name="4">
             <div v-if="item.index==4" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="5">
             <div v-if="item.index==5" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="6">
             <div v-if="item.index==6" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="7">
             <div v-if="item.index==7" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他菜品" name="8">
             <div v-if="item.index==8" v-for="(item,index) in dcData2" :class="style.dcIcon">
              <img :class="style.dcimg" 
                :src="item.img"  
                >
              <i class="el-icon-minus"></i>
              <i class="el-icon-plus" @click="diancan(item)"></i>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="width: calc(35% - 20px);float: left;margin: 0 10px;margin-top: 20px;">
          <span>项目名称:</span>
          <el-input :class="style.inputView" v-model="message" @keyup.enter.native="searchXM"></el-input>
          <el-button type="info" plain @click="searchXM">查询</el-button>
          <el-button type="info" plain>添加</el-button>
          <el-table class="dcTable2" :data="dcData" border height="570">
            <el-table-column prop="name" label="项目名称" fixed="left"></el-table-column>
            <el-table-column prop="num" label="项目编号"></el-table-column>
            <el-table-column prop="code" label="项目编码"></el-table-column>
            <el-table-column prop="dw" label="单位"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消费清单">
         <el-table :data="tableData" border style="width: 80%; margin:0 auto; margin-top:15px">
          <el-table-column prop="xh" label="序号" width="60"></el-table-column>
          <el-table-column prop="name" label="项目名称"></el-table-column>
          <el-table-column prop="dw" label="单位"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="dj" label="单价"></el-table-column>
          <el-table-column prop="money" label="消费金额" ></el-table-column>
          <el-table-column prop="sfdz" label="是否打折" ></el-table-column>
          <el-table-column prop="kwsm" label="口味说明"></el-table-column>
        </el-table>
        <el-button>结算</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import style from "css/kaitai.css";
import Vue from 'vue'
export default {
  data() {
    return {
      style,
      activeName: "1",
      tableData: [
        {
          xh: "1",
          name: "水煮肉片",
          dw: "盘",
          num: "1",
          dj: "30",
          money: "30",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "2",
          name: "蟹黄豆角",
          dw: "盘",
          num: "1",
          dj: "35",
          money: "35",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "3",
          name: "青椒肉丝",
          dw: "盘",
          num: "1",
          dj: "20",
          money: "20",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "4",
          name: "哇哈哈",
          dw: "瓶",
          num: "4",
          dj: "3",
          money: "12",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "1",
          name: "水煮肉片",
          dw: "盘",
          num: "1",
          dj: "30",
          money: "30",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "2",
          name: "蟹黄豆角",
          dw: "盘",
          num: "1",
          dj: "35",
          money: "35",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "3",
          name: "青椒肉丝",
          dw: "盘",
          num: "1",
          dj: "20",
          money: "20",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "4",
          name: "哇哈哈",
          dw: "瓶",
          num: "4",
          dj: "3",
          money: "12",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "1",
          name: "水煮肉片",
          dw: "盘",
          num: "1",
          dj: "30",
          money: "30",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "2",
          name: "蟹黄豆角",
          dw: "盘",
          num: "1",
          dj: "35",
          money: "35",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "3",
          name: "青椒肉丝",
          dw: "盘",
          num: "1",
          dj: "20",
          money: "20",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "4",
          name: "哇哈哈",
          dw: "瓶",
          num: "4",
          dj: "3",
          money: "12",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "1",
          name: "水煮肉片",
          dw: "盘",
          num: "1",
          dj: "30",
          money: "30",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "2",
          name: "蟹黄豆角",
          dw: "盘",
          num: "1",
          dj: "35",
          money: "35",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "3",
          name: "青椒肉丝",
          dw: "盘",
          num: "1",
          dj: "20",
          money: "20",
          sfdz: "F",
          kwsm: "无"
        },
        {
          xh: "4",
          name: "哇哈哈",
          dw: "瓶",
          num: "4",
          dj: "3",
          money: "12",
          sfdz: "F",
          kwsm: "无"
        }
      ],
      dcData:[],
      dcData2:[
        {
          index:'1',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'1',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'1',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'1',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'1',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'1',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'1',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'2',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'2',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DX",
          dw:"盘",
          count:"1",
          price:"20",
        },
        {
          index:'3',
          img:"static/assets/empty.jpg",
          name:"点心",
          num:"001",
          code:"DDD",
          dw:"盘",
          count:"1",
          price:"20",
        },
      ],
      message:""
    };
  },
  methods: {
    diancan(val){
      var newData = {
        name:val.name,
        num:val.num,
        code:val.code,
        dw:val.dw,
        count:val.count,
        price:val.price,
      };
      this.dcData.push(newData);
    },
    searchXM(){
      this.dcData2.map((item,index)=>{
        if(this.message == item.num || this.message == item.code){
          this.activeName = item.index;
          let a = document.getElementsByTagName('img');
          for(let i = 0; i < a.length; i++){
            if(item.img == a[i].attributes[0].nodeValue){
            a[i].style.border = "2px dashed #aaa";
          }
          }
        }
      })
    }
  },
  mounted() {}
};
</script>

