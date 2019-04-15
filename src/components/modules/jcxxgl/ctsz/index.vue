<template>
  <div :class="style.allResDiv">
    <div :class="style.title">
      <span :class="style.txtView">餐台设置</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">桌号：</span>
      <el-input v-model="num" :class="style.inputView" @keyup.enter.native="searchCanTai"></el-input>
      <el-button type="info" plain @click="searchCanTai">查询餐台</el-button>
      <el-button type="info" plain @click="addct">新增餐台</el-button>
      <el-button type="info" plain @click="backToKaiTai">返回首页</el-button>
      <all-res class="table" :tableData="tableData" @modifyData="modifyData" @deleteData="deleteData"></all-res>
      <addCanTai
        :addVisible="addVisible"
        @addCloseEmit="addCloseEmit"
        @newAdd="newAdd"
        :cthEdit="cthEdit"
        :nameEdit="nameEdit"
        :ctztEdit="ctztEdit"
        :typeEdit="typeEdit"
        :edrsEdit="edrsEdit"
        :moneyEdit="moneyEdit"
        :hmoneyEdit="hmoneyEdit"
        :tiJiao="tiJiao"
        @newEdit="newEdit"
        v-if="addVisible"
      ></addCanTai>
    </div>
  </div>
</template>

<script>
import AddCanTai from "#com/addCanTai";
import style from "css/jcxxgl.css";
import AllRes from "./all-res"
export default {
  data() {
    return {
      style,
      tableData: [
        {
          cth: 1,
          name: "1号桌",
          ctzt: "占用",
          type: "卡座",
          edrs: 4,
          money: "Y",
          hmoney: 6
        },
        {
          cth: 2,
          name: "2号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 3,
          name: "3号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 4,
          name: "4号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 5,
          name: "5号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 6,
          name: "6号桌",
          ctzt: "占用",
          type: "卡座",
          edrs: 4,
          money: "Y",
          hmoney: 6
        },
        {
          cth: 7,
          name: "7号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 8,
          name: "8号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 9,
          name: "9号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 10,
          name: "10号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: 4,
          money: "F",
          hmoney: 6
        },
        {
          cth: 11,
          name: "11号桌",
          ctzt: "占用",
          type: "卡座",
          edrs: 4,
          money: "Y",
          hmoney: 6
        },
        {
          cth: 12,
          name: "12号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: 6,
          money: "F",
          hmoney: 12
        },
        {
          cth: 13,
          name: "13号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: 8,
          money: "F",
          hmoney: 14
        },
        {
          cth: 14,
          name: "14号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: 8,
          money: "F",
          hmoney: 14
        },
        {
          cth: 15,
          name: "15号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: 10,
          money: "F",
          hmoney: 16
        }
      ],
      addVisible: false,
      cthEdit: "",
      nameEdit: "",
      ctztEdit: "",
      typeEdit: "",
      edrsEdit: "",
      moneyEdit: "",
      hmoneyEdit: "",
      tiJiao: true,
      num: "",
      eData: ""
    };
  },
  methods: {
    //添加餐台
    addct() {
      this.tiJiao = true;
      this.addVisible = true;

      this.cthEdit = "";
      this.nameEdit = "";
      this.ctztEdit = "";
      this.typeEdit = "";
      this.edrsEdit = "";
      this.moneyEdit = "";
      this.hmoneyEdit = "";
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(cth, name, ctzt, type, edrs, money, hmoney) {
      var newData = {
        cth: cth,
        name: name + "号桌",
        ctzt: ctzt,
        type: type,
        edrs: edrs,
        money: money,
        hmoney: hmoney
      };
      this.tableData.push(newData);
      this.addVisible = false;
    },
    newEdit(cth, name, ctzt, type, edrs, money, hmoney) {
      var newData = {
        cth: cth,
        name: name + "号桌",
        ctzt: ctzt,
        type: type,
        edrs: edrs,
        money: money,
        hmoney: hmoney
      };
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.eData == this.tableData[i]) {
          this.tableData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    //修改餐台
    modifyData(e) {
      this.tiJiao = false;
      this.addVisible = true;

      this.cthEdit = e.cth;
      this.nameEdit = e.name;
      this.ctztEdit = e.ctzt;
      this.typeEdit = e.type;
      this.edrsEdit = e.edrs;
      this.moneyEdit = e.money;
      this.hmoneyEdit = e.hmoney;
      this.eData = e;
    },
    //删除餐台
    deleteData(e) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (e == this.tableData[i]) {
          this.tableData.splice(i, 1);
        }
      }
    },
    searchCanTai() {
      for (let i = 0; i < this.tableData.length; i++) {
        let a = document.getElementsByClassName("canTaiTable")[0];
        let b = a.getElementsByTagName("tr")[i];
        b.style.background = "#fff";
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].cth == this.num) {
          let a = document.getElementsByClassName("canTaiTable")[0];
          let b = a.getElementsByTagName("tr")[i + 1];
          b.style.background = "aquamarine";
        }
      }
    },
    backToKaiTai() {
      this.$router.push({ path: "kt" });
    }
  },
  components: {
    AddCanTai,
    AllRes
  }
};
</script>




