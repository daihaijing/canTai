<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView">新增套餐项目</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="项目名称" prop="xmmc">
          <el-input v-model="ruleForm.xmmc" :class="style.addinput" @focus="clear" id="contentA"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="dw">
          <el-input v-model="ruleForm.dw" :class="style.addinput" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="tcbm">
          <el-input v-model="ruleForm.num" :class="style.addinput" @focus="clear" id="contentC"></el-input>
        </el-form-item>
        <el-form-item label="套餐价" prop="tcj">
          <el-input v-model="ruleForm.tcj" :class="style.addinput" @focus="clear" id="contentD"></el-input>
        </el-form-item>
        <el-form-item label="登记时间" prop="time">
          <el-input v-model="ruleForm.time" :class="style.addinput" @focus="clear" id="contentE"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newAdd" v-if="tiJiao">提交</el-button>
          <el-button type="primary" @click="newEdit" v-else>修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import style from "@/css/kaitai.css";
export default {
  data() {
    return {
      style,
      ruleForm:{
        xmmc:"",
        dw:"",
        num:"",
        tcj:"",
        time:""
      },
      rules: {
      }
    };
  },
  props: {
    addVisible: null,
    xmmcEdit: null,
    dwEdit: null,
    numEdit: null,
    tcjEdit: null,
    timeEdit:null,
    tiJiao: null
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd() {
      this.$emit(
        "newAdd",
        this.ruleForm.xmmc,
        this.ruleForm.dw,
        this.ruleForm.num,
        this.ruleForm.tcj,
        this.ruleForm.time
      );
    },
    newEdit() {
      this.$emit(
        "newEdit",
        this.ruleForm.xmmc,
        this.ruleForm.dw,
        this.ruleForm.num,
        this.ruleForm.tcj,
        this.ruleForm.time
      );
    },
    clear(e) {
      switch (e.target.id) {
        case "contentA": {
          if ((document.getElementById("contentA").value = this.xmmcEdit))
            document.getElementById("contentA").value = "";
          break;
        }
        case "contentB": {
          if ((document.getElementById("contentB").value = this.dwEdit))
            document.getElementById("contentB").value = "";
          break;
        }
        case "contentC": {
          if ((document.getElementById("contentC").value = this.numEdit))
            document.getElementById("contentC").value = "";
          break;
        }
        case "contentD": {
          if ((document.getElementById("contentD").value = this.tcjEdit))
            document.getElementById("contentD").value = "";
          break;
        }
        case "contentE": {
          if ((document.getElementById("contentE").value = this.timeEdit))
            document.getElementById("contentE").value = "";
          break;
        }
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  },
  mounted() {
    if (this.xmmcEdit) {
      this.ruleForm.xmmc = this.xmmcEdit;
    }
    if (this.dwEdit) {
      this.ruleForm.dw = this.dwEdit;
    }
    if (this.numEdit) {
      this.ruleForm.num = this.numEdit;
    }
    if (this.tcjEdit) {
      this.ruleForm.tcj = this.tcjEdit;
    }
    if (this.timeEdit) {
      this.ruleForm.time = this.timeEdit;
    }
  },
  watch: {
    xmmcEdit() {
      this.ruleForm.xmmc = this.xmmcEdit;
    },
    dwEdit() {
      this.ruleForm.dw = this.dwEdit;
    },
    numEdit() {
      this.ruleForm.num = this.numEdit;
    },
    tcjEdit() {
      this.ruleForm.tcj = this.tcjEdit;
    },
    timeEdit() {
      this.ruleForm.time = this.timeEdit;
    },
  }
};
</script>
