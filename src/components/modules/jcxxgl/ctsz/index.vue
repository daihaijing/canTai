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
      <all-res class="table" :tableData="tableData" @modifyData="modifyData" @deleteData="deleteData" v-loading="loading"></all-res>
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
import { mapActions } from "vuex";
import { addOneTable,deleteOneTable,getAllTable } from "./mutation-types";
export default {
  data() {
    return {
      style,
      tableData: [],
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
      eData: "",
      loading:false,
    };
  },
  methods: {
    ...mapActions({
      addOneTable,
      deleteOneTable,
      getAllTable
    }),
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
      this.addDate(cth, name, ctzt, type, edrs, money, hmoney);
    },
    async addDate(cth, name, ctzt, type, edrs, money, hmoney){
      let result = await this.addOneTable({
        t_number:cth,
        t_name: name,
        t_people: edrs,
        t_type: type,
        t_state: ctzt,
      })
      if (!result) return;
      let data = JSON.parse(result);
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
      this.deleteDataTable(e);
    },
    async deleteDataTable(e){
      let result = await this.deleteOneTable({
        t_number:e.cth
      })
      if (!result) return;
      let data = JSON.parse(result);
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
    },
    //查询全部餐台
    async getAllTableData(){
      this.loading = true;
      let result = await this.getAllTable();
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
      this.loading = false;
    }
  },
  components: {
    AddCanTai,
    AllRes
  },
  mounted(){
    this.getAllTableData();
  }
};
</script>




