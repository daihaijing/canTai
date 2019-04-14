<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">套餐设置</span>
    </div>
    <div :class="style.content">
      <div>
        <span :class="style.txtView">套餐名称：</span>
        <el-input :class="style.inputView" v-model="num" @keyup.enter.native="searchTC"></el-input>
        <el-button type="info" plain @click="searchTC" class="TCbtn">查询套餐</el-button>
        <el-button type="info" plain @click="addTC" class="TCbtn">新增套餐</el-button>
      </div>
      <el-table :data="tcData" class="TCTable">
        <el-table-column prop="tcmc" label="套餐名称" width="160"></el-table-column>
        <el-table-column prop="tcbh" label="套餐编号" width="80"></el-table-column>
        <el-table-column prop="tcbh" label="套餐编码" width="80"></el-table-column>
        <el-table-column prop="num" label="人数" width="80"></el-table-column>
        <el-table-column prop="money" label="提成金额" width="80"></el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyData(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tcxmData" class="XMTable">
        <el-table-column prop="xmmc" label="项目名称" width="200"></el-table-column>
        <el-table-column prop="dw" label="单位" width="100"></el-table-column>
        <el-table-column prop="num" label="数量" width="100"></el-table-column>
        <el-table-column prop="tcj" label="套餐价" width="100"></el-table-column>
        <el-table-column prop="time" label="登记日期" width="200"></el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyXMData(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteXMData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addTaoCan
      :addVisible="addVisible"
      @addCloseEmit="addCloseEmit"
      @newAdd="newAdd"
      @newEdit="newEdit"
      :tcmcEdit="tcmcEdit"
      :tcbhEdit="tcbhEdit"
      :tcbmEdit="tcbmEdit"
      :numEdit="numEdit"
      :moneyEdit="moneyEdit"
      :tiJiao="tiJiao"
    ></addTaoCan>
    <addTaoCanXM
      :addVisible="addVisible1"
      @addCloseEmit="addCloseEmit1"
      @newAdd="newAdd1"
      @newEdit="newEdit1"
      :xmmcEdit="xmmcEdit"
      :dwEdit="dwEdit"
      :numEdit="numEdit"
      :tcjEdit="tcjEdit"
      :timeEdit="timeEdit"
      :tiJiao="tiJiao"
    ></addTaoCanXM>
  </div>
</template>

<script>
import style from "css/kaitai.css";
import AddTaoCan from "#com/addTaoCan";
import AddTaoCanXM from "#com/addTaoCanXM";
export default {
  data() {
    return {
      style,
      activeName: "first",
      tcData: [
        {
          tcmc: "鱼香肉丝套餐",
          tcbh: "001",
          tcbm: "YXRS",
          num: "1",
          money: "30"
        },
        {
          tcmc: "青椒炒肉套餐",
          tcbh: "002",
          tcbm: "QJCR",
          num: "1",
          money: "30"
        },
        {
          tcmc: "麻辣香锅套餐",
          tcbh: "003",
          tcbm: "MLXG",
          num: "1",
          money: "30"
        }
      ],
      tcxmData: [
        {
          xmmc: "鱼香肉丝",
          dw: "份",
          num: "1",
          tcj: "15",
          time: "2019-4-2"
        },
        {
          xmmc: "青椒炒肉",
          dw: "份",
          num: "1",
          tcj: "15",
          time: "2019-4-2"
        },
        {
          xmmc: "麻辣香锅",
          dw: "份",
          num: "1",
          tcj: "15",
          time: "2019-4-2"
        },
        {
          xmmc: "米饭",
          dw: "碗",
          num: "1",
          tcj: "2",
          time: "2019-4-2"
        },
        {
          xmmc: "北冰洋",
          dw: "瓶",
          num: "1",
          tcj: "5",
          time: "2019-4-2"
        }
      ],
      // 新增套餐弹框
      addVisible: false,
      addVisible1: false,

      tcmcEdit: "",
      tcbhEdit: "",
      tcbmEdit: "",
      numEdit: "",
      moneyEdit: "",

      xmmcEdit: "",
      dwEdit: "",
      numEdit: "",
      tcjEdit: "",
      timeEdit: "",

      tiJiao: true,
      num: "",
      eData: ""
    };
  },
  methods: {
    //按钮点击事件
    searchTC() {
      for (let i = 0; i < this.tcData.length; i++) {
        let a = document.getElementsByClassName("TCTable")[0];
        let b = document.getElementsByTagName("tr")[i];
        b.style.background = "#fff";
      }
      for (let i = 0; i < this.tcData.length; i++) {
        if (
          this.tcData[i].tcbh == this.num ||
          this.tcData[i].tcbm == this.num
        ) {
          let a = document.getElementsByClassName("TCTable")[0];
          let b = document.getElementsByTagName("tr")[i + 1];
          b.style.background = "aquamarine";
        }
      }
    },
    //修改餐台
    modifyData(e) {
      this.tiJiao = false;
      this.addVisible = true;

      this.tcmcEdit = e.tcmc;
      this.tcbhEdit = e.tcbh;
      this.tcbmEdit = e.tcbm;
      this.numEdit = e.num;
      this.moneyEdit = e.money;
      this.eData = e;
    },
    //删除餐台
    deleteData(e) {
      for (let i = 0; i < this.tcData.length; i++) {
        if (e == this.tcData[i]) {
          this.tcData.splice(i, 1);
        }
      }
    },
    addTC() {
      this.addVisible = true;
      this.tiJiao = true;

      this.tcmcEdit = "";
      this.tcbhEdit = "";
      this.tcbmEdit = "";
      this.numEdit = "";
      this.moneyEdit = "";
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    addCloseEmit1() {
      this.addVisible1 = false;
    },
    newAdd(tcmc, tcbh, tcbm, num, money) {
      var newData = {
        tcmc: tcmc,
        tcbh: tcbh,
        tcbm: tcbm,
        num: num,
        money: money
      };
      this.tcData.push(newData);
      this.addVisible = false;
    },
    newEdit(tcmc, tcbh, tcbm, num, money) {
      var newData = {
        tcmc: tcmc,
        tcbh: tcbh,
        tcbm: tcbm,
        num: num,
        money: money
      };
      for (let i = 0; i < this.tcData.length; i++) {
        if (this.eData == this.tcData[i]) {
          this.tcData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    newAdd1(xmmc, dw, num, tcj, time) {
      var newData = {
        xmmc: xmmc,
        dw: dw,
        num: num,
        tcj: tcj,
        time: time,
      };
      this.tcxmData.push(newData);
      this.addVisible1 = false;
    },
    newEdit1(xmmc, dw, num, tcj, time) {
      var newData = {
        xmmc: xmmc,
        dw: dw,
        num: num,
        tcj: tcj,
        time: time,
      };
      for (let i = 0; i < this.tcxmData.length; i++) {
        if (this.eData == this.tcxmData[i]) {
          this.tcxmData.splice(i, 1, newData);
          this.addVisible1 = false;
        }
      }
    },
    modifyXMData(e) {
      this.tiJiao = false;
      this.addVisible1 = true;

      this.xmmcEdit = e.xmmc;
      this.dwEdit = e.dw;
      this.numEdit = e.num;
      this.tcjEdit = e.tcj;
      this.timeEdit = e.time;
      this.eData = e;
    },
    deleteXMData(e) {
      for (let i = 0; i < this.tcxmData.length; i++) {
        if (e == this.tcxmData[i]) {
          this.tcxmData.splice(i, 1);
        }
      }
    },
    backKT() {
      this.$router.push({ path: "kt" });
    }
  },
  mounted() {},
  components: {
    AddTaoCan,
    AddTaoCanXM
  }
};
</script>

