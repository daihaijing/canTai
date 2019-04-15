<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView" v-if="tiJiao">新增套餐</span>
      <span :class="style.txtView" v-else>修改套餐</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="套餐名称" prop="tcmc">
          <el-input v-model="ruleForm.tcmc" :class="style.addinput" @focus="clear" id="contentA"></el-input>
        </el-form-item>
        <el-form-item label="套餐编号" prop="tcbh">
          <el-input v-model.number="ruleForm.tcbh" :class="style.addinput" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="套餐编码" prop="tcbm">
          <el-input v-model.number="ruleForm.tcbm" :class="style.addinput" @focus="clear" id="contentC"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="num" :rules="[
          { type: 'number', message: '人数必须为数字值'}
        ]">
          <el-input v-model.number="ruleForm.num" :class="style.addinput" @focus="clear" id="contentD"></el-input>
        </el-form-item>
        <el-form-item label="提成金额" prop="money" :rules="[
          { type: 'number', message: '提成金额必须为数字值'}
        ]">
          <el-input v-model.number="ruleForm.money" :class="style.addinput" @focus="clear" id="contentE"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newAdd('ruleForm')" v-if="tiJiao">提交</el-button>
          <el-button type="primary" @click="newEdit('ruleForm')" v-else>修改</el-button>
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
        tcmc: "",
        tcbh: "",
        tcbm: "",
        num: "",
        money: ""
      },
      rules: {
      }
    };
  },
  props: {
    addVisible: null,
    tcmcEdit: null,
    tcbhEdit: null,
    tcbmEdit: null,
    numEdit: null,
    moneyEdit: null,
    tiJiao: null,
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if(valid){
          this.$notify({
              title: '成功',
              message: '提交成功'
          });
          this.$emit(
            "newAdd",
            this.ruleForm.tcmc,
            this.ruleForm.tcbh,
            this.ruleForm.tcbm,
            this.ruleForm.num,
            this.ruleForm.money
        );
        } else {
            return false;
        }
      });
    },
    newEdit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if(valid){
          this.$notify({
              title: '成功',
              message: '修改成功'
          });
          this.$emit(
            "newEdit",
            this.ruleForm.tcmc,
            this.ruleForm.tcbh,
            this.ruleForm.tcbm,
            this.ruleForm.num,
            this.ruleForm.money
          );
        } else {
            return false;
        }
      });
    },
    clear(e) {
      switch (e.target.id) {
        case "contentA": {
          if ((document.getElementById("contentA").value = this.tcmcEdit))
            document.getElementById("contentA").value = "";
          break;
        }
        case "contentB": {
          if ((document.getElementById("contentB").value = this.tcbhEdit))
            document.getElementById("contentB").value = "";
          break;
        }
        case "contentC": {
          if ((document.getElementById("contentC").value = this.tcbmEdit))
            document.getElementById("contentC").value = "";
          break;
        }
        case "contentD": {
          if ((document.getElementById("contentD").value = this.numEdit))
            document.getElementById("contentD").value = "";
          break;
        }
        case "contentE": {
          if ((document.getElementById("contentE").value = this.moneyEdit))
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
    if (this.tcmcEdit) {
      this.ruleForm.tcmc = this.tcmcEdit;
    }
    if (this.tcbhEdit) {
      this.ruleForm.tcbh = this.tcbhEdit;
    }
    if (this.tcbmEdit) {
      this.ruleForm.tcbm = this.tcbmEdit;
    }
    if (this.numEdit) {
      this.ruleForm.num = this.numEdit;
    }
    if (this.moneyEdit) {
      this.ruleForm.money = this.moneyEdit;
    }
  },
  watch: {
    tcmcEdit() {
      this.ruleForm.tcmc = this.tcmcEdit;
    },
    tcbhEdit() {
      this.ruleForm.tcbh = this.tcbhEdit;
    },
    tcbmEdit() {
      this.ruleForm.tcbm = this.tcbmEdit;
    },
    numEdit() {
      this.ruleForm.num = this.numEdit;
    },
    moneyEdit() {
      this.ruleForm.money = this.moneyEdit;
    },
  }
};
</script>
