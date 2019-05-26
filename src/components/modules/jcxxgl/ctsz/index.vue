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
      <all-res
        class="table"
        :tableData="tableData"
        @modifyData="modifyData"
        @deleteData="deleteData"
        v-loading="loading"
      ></all-res>
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
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        class="guanLi"
        style="margin-top: 28vh !important;"
      >
        <el-input
          type="password"
          v-model="guanLiPassword"
          placeholder="请输入管理员密码"
          @keyup.enter.native="guanLiEmit"
          @input="clearInput"
        ></el-input>
        <span style="color:red;margin-top:15px" v-if="isRightPsw">{{loginMessage}}</span>
        <!-- <el-button type="success" icon="el-icon-check" circle @click="guanLiEmit" plain></el-button> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddCanTai from "#com/addCanTai";
import style from "css/jcxxgl.css";
import AllRes from "./all-res";
import { mapActions } from "vuex";
import {
  getAllTable,
  deleteOneTable,
  addOneTable,
  updateOneTable,
  getAdminPassword
} from "./mutation-types";
export default {
  data() {
    return {
      style,
      tableData: [],
      addVisible: false,
      t_numberEdit: "",
      t_nameEdit: "",
      t_stateEdit: "",
      t_typeEdit: "",
      t_peopleEdit: "",
      tiJiao: true,
      num: "",
      eData: "",
      loading: false,
      dialogVisible: false, //控制输入管理员密码弹框是否出现
      guanLiPassword: "", //记录管理员密码
      loginMessage: "", //显示密码错误
      isRightPsw: false, //标记密码是否输入正确
      isDel: false, //标记是否点击删除按钮
      t_number: "" //记录选择的餐台号
    };
  },
  methods: {
    ...mapActions({
      addOneTable,
      deleteOneTable,
      getAllTable,
      getAdminPassword
    }),
    //判断输入的管理员密码是否正确
    async getGuanLiPass() {
      let result = await this.getAdminPassword({
        s_password: this.guanLiPassword
      });
      if (result == 1) {
        if (!this.isDel) {
          this.addVisible = true;
        }
        this.dialogVisible = false;
      } else {
        this.isRightPsw = true;
        this.loginMessage = "密码错误";
      }
      this.guanLiPassword = "";
    },
    //提交管理员密码
    guanLiEmit() {
      this.getGuanLiPass();
      if (this.t_number != "") {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.t_number == this.tableData[i].t_number) {
            this.deleteTable(this.t_number);
            this.tableData.splice(i, 1);
          }
        }
      }
    },
    //添加餐台
    addct() {
      if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).s_position != "经理") {
          this.dialogVisible = true;
        } else {
          this.addVisible = true;
          this.isRightPsw = false;
        }
      }
      this.tiJiao = true;
      //this.addVisible = true;
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
        t_name: t_name,
        t_state: t_state,
        t_type: t_type,
        t_people: t_people
      };
      this.addTable(t_number, t_name, t_state, t_type, t_people);
      this.tableData.push(newData);
      this.addVisible = false;
    },
    newEdit(t_number, t_name, t_state, t_type, t_people) {
      var newData = {
        t_number: t_number,
        t_name: t_name,
        t_state: t_state,
        t_type: t_type,
        t_people: t_people
      };
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.eData == this.tableData[i]) {
          this.updateTable(
            newData.t_number,
            newData.t_name,
            newData.t_state,
            newData.t_type,
            newData.t_people
          );
          this.tableData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    //修改餐台
    modifyData(e) {
      this.guanLiPassword = "";
      if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).s_position != "经理") {
          this.dialogVisible = true;
        } else {
          this.addVisible = true;
        }
      }
      this.tiJiao = false;

      this.t_numberEdit = e.t_number;
      this.t_nameEdit = e.t_name;
      this.t_stateEdit = e.t_state;
      this.t_typeEdit = e.t_type;
      this.t_peopleEdit = e.t_people;
      this.eData = e;
    },
    //删除餐台
    deleteData(e) {
      if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).s_position != "经理") {
          this.t_number = e.t_number;
          this.isDel = true;
          this.dialogVisible = true;
        } else {
          for (let i = 0; i < this.tableData.length; i++) {
            if (e == this.tableData[i]) {
              this.deleteTable(e.t_number);
              this.tableData.splice(i, 1);
            }
          }
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
    //axios异步通信
    ...mapActions({
      getAllTable,
      deleteOneTable,
      addOneTable,
      updateOneTable
    }),
    //获取所有餐台
    async getTable() {
      let result = await this.getAllTable();
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
    },
    //根据餐台号删除一条餐台
    async deleteTable(num) {
      let result = await this.deleteOneTable({
        t_number: num
      });
      if (result == 1) return;
    },
    //添加餐台
    async addTable(t_number, t_name, t_state, t_type, t_people) {
      let result = await this.addOneTable({
        t_number: parseInt(t_number),
        t_name: t_name,
        t_state: t_state,
        t_type: t_type,
        t_people: parseInt(t_people)
      });
      if (result == 1) return;
    },
    //根据餐台号修改餐台
    async updateTable(t_number, t_name, t_state, t_type, t_people) {
      let result = await this.updateOneTable({
        t_number: parseInt(t_number),
        t_name: t_name,
        t_state: t_state,
        t_type: t_type,
        t_people: parseInt(t_people)
      });
      if (result == 1) return;
    },
    //当输入密码框内容改变时，错误提示消失
    clearInput(){
      this.loginMessage = "";
    }
  },
  created() {
    this.getTable();
  },
  components: {
    AddCanTai,
    AllRes
  }
};
</script>




