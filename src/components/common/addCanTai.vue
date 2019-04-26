<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView">新增餐台</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="餐台号" prop="cth" :rules="[
          { type: 'number', message: '餐台号必须为数字值'}
        ]">
          <el-input v-model.number="ruleForm.cth" :class="style.addinput" @focus="clear" id="contentA"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" :class="style.addinput" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="餐台状态" prop="ctzt">
          <el-input v-model="ruleForm.ctzt" :class="style.addinput" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="ruleForm.type" :class="style.addinput" @focus="clear" id="contentC"></el-input>
        </el-form-item>
        <el-form-item label="额定人数" prop="edrs" :rules="[
          { type: 'number', message: '额定人数必须为数字值'}
        ]">
          <el-input v-model.number="ruleForm.edrs" :class="style.addinput" @focus="clear" id="contentD"></el-input>
        </el-form-item>
        <el-form-item label="是否收取包厢费用" prop="money">
          <el-input v-model="ruleForm.money" :class="style.addinput" @focus="clear" id="contentE"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="hmony" :rules="[
          { type: 'number', message: '单位必须为数字值'}
        ]">
          <el-input v-model.number="ruleForm.hmoney" :class="style.addinput" @focus="clear" id="contentF"></el-input>
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
import style from "css/jcxxgl.css";
export default {
  data() {
    return {
      style,
      ruleForm:{
        cth: 0,
        name: "",
        ctzt: "",
        type: "",
        edrs: 0,
        money: "",
        hmoney: ""
      },
      rules: { 
      }
    }
  },
  props: {
    addVisible: null,
    cthEdit: null,
    nameEdit: null,
    ctztEdit: null,
    typeEdit: null,
    edrsEdit: null,
    moneyEdit: null,
    hmoneyEdit: null,
    tiJiao: null
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if(valid){
          // this.$notify({
          //     title: '成功',
          //     message: '提交成功'
          // });
          this.$emit(
            "newAdd",
            this.ruleForm.cth,
            this.ruleForm.name,
            this.ruleForm.ctzt,
            this.ruleForm.type,
            this.ruleForm.edrs,
            this.ruleForm.money,
            this.ruleForm.hmoney
          );
        } else {
            return false;
        }
      });
    },
    newEdit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if(valid){
          // this.$notify({
          //     title: '成功',
          //     message: '修改成功'
          // });
          this.$emit(
            "newEdit",
            this.ruleForm.cth,
            this.ruleForm.name,
            this.ruleForm.ctzt,
            this.ruleForm.type,
            this.ruleForm.edrs,
            this.ruleForm.money,
            this.ruleForm.hmoney
          );
        } else {
            return false;
        }
      });
    },
    clear(e) {
      switch (e.target.id) {
        case "contentA": {
          // console.log(this.cth,document.getElementById("contentA").value )
          if ((document.getElementById("contentA").value = this.cthEdit))
            document.getElementById("contentA").value = "";
          break;
        }
        case "contentB": {
          if ((document.getElementById("contentB").value = this.nameEdit))
            document.getElementById("contentB").value = "";
          break;
        }
        case "contentC": {
          if ((document.getElementById("contentC").value = this.ctztEdit))
            document.getElementById("contentC").value = "";
          break;
        }
        case "contentD": {
          if ((document.getElementById("contentD").value = this.typeEdit))
            document.getElementById("contentD").value = "";
          break;
        }
        case "contentE": {
          if ((document.getElementById("contentE").value = this.edrsEdit))
            document.getElementById("contentE").value = "";
          break;
        }
        case "contentF": {
          if ((document.getElementById("contentF").value = this.moneyEdit))
            document.getElementById("contentF").value = "";
          break;
        }
        case "contentG": {
          if ((document.getElementById("contentG").value = this.hmoneyEdit))
            document.getElementById("contentG").value = "";
          break;
        }
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  },
  mounted() {
    if (this.cthEdit) {
      this.ruleForm.cth = this.cthEdit;
    }
    if (this.nameEdit) {
      this.ruleForm.name = this.nameEdit;
    }
    if (this.ctztEdit) {
      this.ruleForm.ctzt = this.ctztEdit;
    }
    if (this.typeEdit) {
      this.ruleForm.type = this.typeEdit;
    }
    if (this.edrsEdit) {
      this.ruleForm.edrs = this.edrsEdit;
    }
    if (this.moneyEdit) {
      this.ruleForm.money = this.moneyEdit;
    }
    if (this.hmoneyEdit) {
      this.ruleForm.hmoney = this.hmoneyEdit;
    }
  },
  watch: {
    cthEdit() {
      this.ruleForm.cth = this.cthEdit;
    },
    nameEdit() {
      this.ruleForm.name = this.nameEdit;
    },
    ctztEdit() {
      this.ruleForm.ctzt = this.ctztEdit;
    },
    typeEdit() {
      this.ruleForm.type = this.typeEdit;
    },
    edrsEdit() {
      this.ruleForm.edrs = this.edrsEdit;
    },
    moneyEdit() {
      this.ruleForm.money = this.moneyEdit;
    },
    hmoneyEdit() {
      this.ruleForm.hmoney = this.hmoneyEdit;
    }
  }
};
</script>
