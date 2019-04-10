<template>
  <div>
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">餐台设置</span>
    </div>
    <div :class="style.content">
      <span>桌号：</span>
      <el-input v-model="num" :class="style.txtView" @keyup.enter.native="searchCanTai"></el-input>
      <el-button type="info" plain @click="searchCanTai">查询</el-button>
      <el-button type="info" plain @click="deleteCanTai">删除</el-button>
      <el-button type="info" plain @click="modifyCanTai">修改</el-button>
      <el-button type="info" plain @click="addct">新增</el-button>
      <el-button type="info" plain @click="backToKaiTai">返回</el-button>
      <el-table :data="tableData" style="width: 100%;" height="590" class="canTaiTable">
        <el-table-column prop="cth" label="餐台号" width="160" fixed="left"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="ctzt" label="状态" width="140"></el-table-column>
        <el-table-column prop="type" label="餐台类型" width="160"></el-table-column>
        <el-table-column prop="edrs" label="额定人数" width="140"></el-table-column>
        <el-table-column prop="money" label="是否消费" width="140"></el-table-column>
        <el-table-column prop="hmoney" label="每小时包厢费" width="140"></el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <a @click="modifyData(scope.row)">修改</a>
            <a @click="deleteData(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
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
      ></addCanTai>
    </div>
  </div>
</template>

<script>
import AddCanTai from "#com/addCanTai";
import style from "css/jcxxgl.css";
export default {
  data() {
    return {
      style,
      tableData: [
        {
          cth: "1",
          name: "1号桌",
          ctzt: "占用",
          type: "卡座",
          edrs: "4",
          money: "Y",
          hmoney: "6"
        },
        {
          cth: "2",
          name: "2号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "3",
          name: "3号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "4",
          name: "4号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "5",
          name: "5号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "6",
          name: "6号桌",
          ctzt: "占用",
          type: "卡座",
          edrs: "4",
          money: "Y",
          hmoney: "6"
        },
        {
          cth: "7",
          name: "7号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "8",
          name: "8号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "9",
          name: "9号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "10",
          name: "10号桌",
          ctzt: "空闲",
          type: "卡座",
          edrs: "4",
          money: "F",
          hmoney: "6"
        },
        {
          cth: "11",
          name: "11号桌",
          ctzt: "占用",
          type: "卡座",
          edrs: "4",
          money: "Y",
          hmoney: "6"
        },
        {
          cth: "12",
          name: "12号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: "6",
          money: "F",
          hmoney: "12"
        },
        {
          cth: "13",
          name: "13号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: "8",
          money: "F",
          hmoney: "14"
        },
        {
          cth: "14",
          name: "14号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: "8",
          money: "F",
          hmoney: "14"
        },
        {
          cth: "15",
          name: "15号桌",
          ctzt: "空闲",
          type: "包间",
          edrs: "10",
          money: "F",
          hmoney: "16"
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
          //$(".canTaiTable tr").eq(i+1).addClass("lookHover");
        }
      }
    },
    deleteCanTai() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].cth == this.num) {
          this.tableData.splice(i, 1);
        }
      }
    },
    modifyCanTai() {
      this.tiJiao = false;
      this.addVisible = true;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].cth == this.num) {
          this.cthEdit = this.tableData[i].cth;
          this.nameEdit = this.tableData[i].name;
          this.ctztEdit = this.tableData[i].ctzt;
          this.typeEdit = this.tableData[i].type;
          this.edrsEdit = this.tableData[i].edrs;
          this.moneyEdit = this.tableData[i].money;
          this.hmoneyEdit = this.tableData[i].hmoney;
        }
      }
    },
    backToKaiTai() {
      this.$router.push({ path: "kt" });
    }
  },
  components: {
    AddCanTai
  }
};
</script>




