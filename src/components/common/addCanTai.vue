<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView" v-if="tiJiao">新增餐台</span>
      <span :class="style.txtView" v-else>修改餐台</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="餐台号" prop="t_number">
          <el-input v-model.number="ruleForm.t_number" :class="style.addinput" @focus="clear" id="contentA"></el-input>
        </el-form-item>
        <el-form-item label="餐台名称" prop="t_name">
          <el-input v-model="ruleForm.t_name" :class="style.addinput" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="餐台状态" prop="t_state">
          <el-input v-model="ruleForm.t_state" :class="style.addinput" @focus="clear" id="contentC"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="t_type">
          <el-radio v-model="ruleForm.t_type" label="卡座">卡座</el-radio>
          <el-radio v-model="ruleForm.t_type" label="包间">包间</el-radio>
          <!-- <el-input v-model="ruleForm.t_type" :class="style.addinput" @focus="clear" id="contentD" ></el-input> -->
        </el-form-item>
        <el-form-item label="额定人数" prop="t_people">
          <el-input v-model.number="ruleForm.t_people" :class="style.addinput" @focus="clear" id="contentE"></el-input>
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
        t_number: "",
        t_name: "",
        t_state: "空闲",
        t_type: "卡座",
        t_people:"",
      },
      rules: { 
      }
    }
  },
  props: {
    addVisible: null,
    t_numberEdit: null,
    t_nameEdit: null,
    t_stateEdit: null,
    t_typeEdit: null,
    t_peopleEdit: null,
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
            this.ruleForm.t_number,
            this.ruleForm.t_name,
            this.ruleForm.t_state,
            this.ruleForm.t_type,
            this.ruleForm.t_people,
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
            this.ruleForm.t_number,
            this.ruleForm.t_name,
            this.ruleForm.t_state,
            this.ruleForm.t_type,
            this.ruleForm.t_people,
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
          if ((document.getElementById("contentA").value = this.t_numberEdit))
            document.getElementById("contentA").value = "";
          break;
        }
        case "contentB": {
          if ((document.getElementById("contentB").value = this.t_nameEdit))
            document.getElementById("contentB").value = "";
          break;
        }
        case "contentC": {
          if ((document.getElementById("contentC").value = this.t_stateEdit))
            document.getElementById("contentC").value = "";
          break;
        }
        case "contentD": {
          if ((document.getElementById("contentD").value = this.t_typeEdit))
            document.getElementById("contentD").value = "";
          break;
        }
        case "contentE": {
          if ((document.getElementById("contentE").value = this.t_peopleEdit))
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
    if (this.t_numberEdit) {
      this.ruleForm.t_number = this.t_numberEdit;
    }
    if (this.t_nameEdit) {
      this.ruleForm.t_name = this.t_nameEdit;
    }
    if (this.t_stateEdit) {
      this.ruleForm.t_state = this.t_stateEdit;
    }
    if (this.t_typeEdit) {
      this.ruleForm.t_type = this.t_typeEdit;
    }
    if (this.t_peopleEdit) {
      this.ruleForm.t_people = this.t_peopleEdit;
    }
  },
  watch: {
    t_numberEdit() {
      this.ruleForm.t_number = this.t_numberEdit;
    },
    t_nameEdit() {
      this.ruleForm.t_name = this.t_nameEdit;
    },
    t_stateEdit() {
      this.ruleForm.t_state = this.t_stateEdit;
    },
    t_typeEdit() {
      this.ruleForm.t_type = this.t_typeEdit;
    },
    t_peopleEdit() {
      this.ruleForm.t_people = this.t_peopleEdit;
    }
  }
};
</script>
