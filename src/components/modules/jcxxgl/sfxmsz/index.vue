<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">收费项目设置</span>
    </div>
    <div :class="style.content">
      <div :class="style.shouFei">
        <span :class="style.txtView">项目名称：</span>
        <el-input :class="style.inputView" v-model="num" @keyup.enter.native="searchSF"></el-input>
        <el-button type="info" plain @click="searchSF">查询项目</el-button>
        <el-button type="info" plain @click="addSF">新增项目</el-button>
        <el-button type="info" plain @click="backKaitai">返回首页</el-button>
      </div>
      <price-pay
        class="table"
        :shouFeiData="shouFeiData"
        @modifyData="modifyData"
        @deleteData="deleteData"
      ></price-pay>
      <addShouFei
        :addVisible="addVisible"
        @addCloseEmit="addCloseEmit"
        @newAdd="newAdd"
        :m_nameEdit="m_nameEdit"
        :m_numberEdit="m_numberEdit"
        :m_simplenameEdit="m_simplenameEdit"
        :ms_nameEdit="ms_nameEdit"
        :m_pictureEdit="m_pictureEdit"
        :m_unitEdit="m_unitEdit"
        :m_priceEdit="m_priceEdit"
        :m_stateEdit="m_stateEdit"
        :m_remarkEdit="m_remarkEdit"
        :tiJiao="tiJiao"
        v-if="addVisible"
        @newEdit="newEdit"
      ></addShouFei>
    </div>
  </div>
</template>

<script>
import AddShouFei from "#com/addShouFei";
import PricePay from "./price-pay";
import style from "css/jcxxgl.css";
import { mapActions } from "vuex";
import { getAllMenu } from "./mutation-types";
import { addOneMenu } from "./mutation-types";
import { deleteOneMenu } from "./mutation-types";
import { updateOneMenu } from "./mutation-types";

export default {
  data() {
    return {
      style,
      num: "",
      shouFeiData: [],
      addVisible: false,
      m_nameEdit: "",
      m_numberEdit: "",
      ms_nameEdit: "",
      m_simplenameEdit: "",
      m_pictureEdit: "",
      m_unitEdit: "",
      m_priceEdit: "",
      m_stateEdit: "",
      m_remarkEdit: "",
      tiJiao: true,
      eData: ""
    };
  },
  methods: {
    //添加收费项目
    addSF() {
      this.tiJiao = true;
      this.addVisible = true;
      this.m_nameEdit = "";
      this.m_numberEdit = "";
      this.ms_nameEdit = "";
      this.m_simplenameEdit = "";
      this.m_pictureEdit = "";
      this.m_unitEdit = "";
      this.m_priceEdit = "";
      this.m_stateEdit = "";
      this.m_remarkEdit = "";
    },
    //关闭添加弹框
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(m_name,m_number,ms_name,m_simplename,m_picture,m_unit,m_price,m_state,m_remark) {
      var newData = {
        m_name: m_name,
        m_number: m_number,
        ms_name: ms_name,
        m_simplename: m_simplename,
        m_picture: m_picture,
        m_unit: m_unit,
        m_price: m_price,
        m_state: m_state,
        m_remark: m_remark
      };
      this.addMenu(m_name,m_number,ms_name,m_simplename,m_picture,m_unit,m_price,m_state,m_remark);
      this.shouFeiData.push(newData);
      this.addVisible = false;
    },
    newEdit(m_name,m_number,ms_name,m_simplename,m_picture,m_unit,m_price,m_state,m_remark) {
      var newData = {
        m_name: m_name,
        m_number: m_number,
        ms_name: ms_name,
        m_simplename: m_simplename,
        m_picture: m_picture,
        m_unit: m_unit,
        m_price: m_price,
        m_state: m_state,
        m_remark: m_remark
      };
      for (let i = 0; i < this.shouFeiData.length; i++) {
        if (this.eData == this.shouFeiData[i]) {
          this.updateMenu(m_name,m_number,ms_name,m_simplename,m_picture,m_unit,m_price,m_state,m_remark);
          this.shouFeiData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    //删除收费项目
    deleteData(e) {
      for (let i = 0; i < this.shouFeiData.length; i++) {
        if (e == this.shouFeiData[i]) {
          this.deleteMenu(e.m_number);
          this.shouFeiData.splice(i, 1);
        }
      }
    },
    //修改收费项目
    modifyData(e) {
      this.tiJiao = false;
      this.addVisible = true;

      this.m_nameEdit = e.m_name;
      this.m_numberEdit = e.m_number;
      this.ms_nameEdit = e.ms_name;
      this.m_simplenameEdit = e.m_simplename;
      this.m_pictureEdit = e.m_picture;
      this.m_unitEdit = e.m_unit;
      this.m_priceEdit = e.m_price;
      this.m_stateEdit = e.m_state;
      this.m_remarkEdit = e.m_remark;
      this.eData = e;
    },
    //查询收费项目
    searchSF() {
      for (let i = 0; i < this.shouFeiData.length; i++) {
        let a = document.getElementsByClassName("shouFeiTable")[0];
        let b = a.getElementsByTagName("tr")[i];
        b.style.background = "#fff";
      }
      for (let i = 0; i < this.shouFeiData.length; i++) {
        if (
          this.shouFeiData[i].m_simplename == this.num ||
          this.shouFeiData[i].m_number == this.num
        ) {
          let a = document.getElementsByClassName("shouFeiTable")[0];
          let b = a.getElementsByTagName("tr")[i + 1];
          b.style.background = "aquamarine";
        }
      }
    },
    //返回首页
    backKaitai() {
      this.$router.push({ path: "kt" });
    },
    //异步通信
    ...mapActions({
      getAllMenu,
      addOneMenu,
      deleteOneMenu,
      updateOneMenu
    }),
    async getMenu() {
      let result = await this.getAllMenu();
      if (!result) return;
      let data = JSON.parse(result);
      this.shouFeiData = data;
    },
    async addMenu(m_name,m_number,ms_name,m_simplename,m_picture,m_unit,m_price,m_state,m_remark) {
      let result = await this.addOneMenu({
        m_name: m_name,
        m_number: m_number,
        ms_name: ms_name,
        m_simplename: m_simplename,
        m_picture: m_picture,
        m_unit: m_unit,
        m_price: m_price,
        m_state: m_state,
        m_remark: m_remark
      });
      if (result == 1) return;
    },
    async deleteMenu(num) {
      let result = await this.deleteOneMenu({
        m_number: num
      });
      if (result == 1) return;
    },
    async updateMenu(m_name,m_number,ms_name,m_simplename,m_picture,m_unit,m_price,m_state,m_remark) {
      let result = await this.updateOneMenu({
        m_name: m_name,
        m_number: m_number,
        ms_name: ms_name,
        m_simplename: m_simplename,
        m_picture: m_picture,
        m_unit: m_unit,
        m_price: m_price,
        m_state: m_state,
        m_remark: m_remark
      });
      if (result == 1) return;
    }
  },
  components: {
    AddShouFei,
    PricePay
  },
  created() {
    this.getMenu();
  }
};
</script>

