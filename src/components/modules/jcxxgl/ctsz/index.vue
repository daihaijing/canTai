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
        :t_numberEdit="t_numberEdit"
        :t_nameEdit="t_nameEdit"
        :t_stateEdit="t_stateEdit"
        :t_typeEdit="t_typeEdit"
        :t_peopleEdit="t_peopleEdit"
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
      tableData:[],
      addVisible: false,
      t_numberEdit: "",
      t_nameEdit: "",
      t_stateEdit: "",
      t_typeEdit: "",
      t_peopleEdit: "",
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

      this.t_numberEdit = "";
      this.t_nameEdit = "";
      this.t_stateEdit = "";
      this.t_typeEdit = "";
      this.t_peopleEdit = "";
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(t_number, t_name, t_state, t_type, t_people) {
      var newData = {
        t_number: t_number,
        t_name: t_name + "号桌",
        t_state: t_state,
        t_type: t_type,
        t_people: t_people,
      };
      this.tableData.push(newData);
      this.addVisible = false;
      this.addDate(t_number, t_name, t_state, t_type, t_people);
    },
    async addDate(t_number, t_name, t_state, t_type, t_people){
      let result = await this.addOneTable({
        t_number: t_number,
        t_name: t_name + "号桌",
        t_state: t_state,
        t_type: t_type,
        t_people: t_people,
      })
      if (!result) return;
      let data = JSON.parse(result);
    },
    newEdit(t_number,t_name,t_state,t_type,t_people) {
      var newData = {
        t_number: t_number,
        t_name: t_name + "号桌",
        t_state: t_state,
        t_type: t_type,
        t_people: t_people,
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

      this.t_numberEdit = e.t_number;
      this.t_nameEdit = e.t_name;
      this.t_stateEdit = e.t_state;
      this.t_typeEdit = e.t_type;
      this.t_peopleEdit = e.t_people;
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
        t_number:e.t_number
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
        if (this.tableData[i].t_number == this.num) {
          let a = document.getElementsByClassName("canTaiTable")[0];
          let b = a.getElementsByTagName("tr")[i + 1];
          b.style.background = "aquamarine";
        }
      }
    },
    backToKaiTai() {
      this.$router.push({ path: "kt" });
    },
    async getAllTableData(){
      this.loading = true;
      let result = await this.getAllTable();
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
      this.loading = false;
    }

  },
  created(){
    this.getData();
  },
  components: {
    AddCanTai,
    AllRes
  },
};
</script>




