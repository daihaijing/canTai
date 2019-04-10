<template>
  <div>
    <div :class="style.diancanTitle">
      <span :class="style.txtView">点餐</span>
    </div>
    <div :class="style.diancanContent">
      <div :class="style.dcLeft">
        <el-tabs v-model="activeName" type="card" style="height: 300px;" @tab-click="handleClick">
          <el-tab-pane label="特色菜系" name="first">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
            <img :class="style.dcimg" src="/static/assets/name.jpg">
          </el-tab-pane>
          <el-tab-pane label="热菜菜系" name="second"></el-tab-pane>
          <el-tab-pane label="凉菜菜系" name="third"></el-tab-pane>
          <el-tab-pane label="酒水饮料" name="fourth"></el-tab-pane>
          <el-tab-pane label="其他菜品" name="fifth"></el-tab-pane>
          <el-tab-pane label="其他菜品" name="sixth"></el-tab-pane>
          <el-tab-pane label="其他菜品" name="seventh"></el-tab-pane>
          <el-tab-pane label="其他菜品" name="eighth"></el-tab-pane>
        </el-tabs>
        <!-- <span :class="style.txtView">手动搜索栏：</span>
      <span :class="style.txtView">拼音检索吗/名称：</span>
      <el-input :class="style.inputView"></el-input>
      <span :class="style.txtView">消费数量：</span>
      <el-input :class="style.inputView"></el-input>
      <el-button type="info" plain>添加</el-button>
      <el-table :data="tableData2" style="width: 100%">
        <el-table-column prop="jsm" label="检索码" width="100"></el-table-column>
        <el-table-column prop="xmmc" label="项目名称" width="180"></el-table-column>
        <el-table-column prop="xsdj" label="销售单价" width="180"></el-table-column>
        <el-table-column prop="dw" label="单位" width="100"></el-table-column>
        </el-table>-->
      </div>
      <div :class="style.xiaofeiTitle">
        <span :class="style.txtView">消费清单</span>
      </div>
      <div :class="style.dcRight">
        <el-table :data="tableData" border style="width: 100%;margin-top:5px">
          <el-table-column prop="xh" label="序号" width="60"></el-table-column>
          <el-table-column prop="name" label="项目名称" width="80"></el-table-column>
          <el-table-column prop="dw" label="单位" width="80"></el-table-column>
          <el-table-column prop="num" label="数量" width="60"></el-table-column>
          <el-table-column prop="dj" label="单价" width="80"></el-table-column>
          <el-table-column prop="money" label="消费金额" width="80"></el-table-column>
          <el-table-column prop="sfdz" label="是否打折" width="60"></el-table-column>
          <el-table-column prop="kwsm" label="口味说明" width="100"></el-table-column>
        </el-table>
        <el-button>结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
export default {
  data() {
    return {
      style,
      activeName: "first",
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
      tableData2: [
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        },
        {
          jsm: "DX",
          xmmc: "点心",
          xsdj: "9.9",
          dw: "盘"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick2(row) {
      console.log(row);
    }
  },
  mounted() {}
};
</script>

