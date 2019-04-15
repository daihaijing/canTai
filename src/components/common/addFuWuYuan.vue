<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView" v-if="tiJiao">新增服务员</span>
      <span :class="style.txtView" v-else>修改服务员</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="序号" prop="xh">
          <el-input v-model="ruleForm.xh" :class="style.addinput" @focus="clear" id="contentA"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" :class="style.addinput" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex" :class="style.addinput" @focus="clear" id="contentC"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age" :class="style.addinput" @focus="clear" id="contentD"></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="gw">
          <el-input v-model="ruleForm.gw" :class="style.addinput" @focus="clear" id="contentE"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="bmmc">
          <el-input v-model="ruleForm.bmmc" :class="style.addinput" @focus="clear" id="contentF"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="pnum">
          <el-input v-model="ruleForm.pnum" :class="style.addinput" @focus="clear" id="contentG"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="id">
          <el-input v-model="ruleForm.id" :class="style.addinput" @focus="clear" id="contentH"></el-input>
        </el-form-item>
        <el-form-item label="拼音检索码" prop="pyjsm">
          <el-input v-model="ruleForm.pyjsm" :class="style.addinput" @focus="clear" id="contentI"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="jtzz">
          <el-input v-model="ruleForm.jtzz" :class="style.addinput" @focus="clear" id="contentJ"></el-input>
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
import style from "css/jcxxgl.css";
export default {
  data() {
    return {
      style,
      ruleForm: {
        xh: "",
        name: "",
        sex: "",
        age: "",
        gw: "",
        bmmc: "",
        pnum: "",
        id: "",
        pyjsm: "",
        jtzz: ""
      },
      rules: {}
    };
  },
  props: {
    addVisible: null,
    xhEdit: null,
    nameEdit: null,
    sexEdit: null,
    ageEdit: null,
    gwEdit: null,
    bmmcEdit: null,
    pnumEdit: null,
    idEdit: null,
    pyjsmEdit: null,
    jtzzEdit: null,
    tiJiao: null
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd() {
      this.$emit(
        "newAdd",
        this.ruleForm.xh,
        this.ruleForm.name,
        this.ruleForm.sex,
        this.ruleForm.age,
        this.ruleForm.gw,
        this.ruleForm.bmmc,
        this.ruleForm.pnum,
        this.ruleForm.id,
        this.ruleForm.pyjsm,
        this.ruleForm.jtzz
      );
    },
    newEdit() {
      this.$emit(
        "newEdit",
        this.ruleForm.xh,
        this.ruleForm.name,
        this.ruleForm.sex,
        this.ruleForm.age,
        this.ruleForm.gw,
        this.ruleForm.bmmc,
        this.ruleForm.pnum,
        this.ruleForm.id,
        this.ruleForm.pyjsm,
        this.ruleForm.jtzz
      );
    },
    clear(e) {
      switch (e.target.id) {
        case "contentA": {
          if ((document.getElementById("contentA").value = this.xhEdit))
            document.getElementById("contentA").value = "";
          break;
        }
        case "contentB": {
          if ((document.getElementById("contentB").value = this.nameEdit))
            document.getElementById("contentB").value = "";
          break;
        }
        case "contentC": {
          if ((document.getElementById("contentC").value = this.sexEdit))
            document.getElementById("contentC").value = "";
          break;
        }
        case "contentD": {
          if ((document.getElementById("contentD").value = this.ageEdit))
            document.getElementById("contentD").value = "";
          break;
        }
        case "contentE": {
          if ((document.getElementById("contentE").value = this.gwEdit))
            document.getElementById("contentE").value = "";
          break;
        }
        case "contentF": {
          if ((document.getElementById("contentF").value = this.bmmcEdit))
            document.getElementById("contentF").value = "";
          break;
        }
        case "contentG": {
          if ((document.getElementById("contentG").value = this.pnumEdit))
            document.getElementById("contentG").value = "";
          break;
        }
        case "contentH": {
          if ((document.getElementById("contentE").value = this.idEdit))
            document.getElementById("contentE").value = "";
          break;
        }
        case "contentI": {
          if ((document.getElementById("contentF").value = this.pyjsmEdit))
            document.getElementById("contentF").value = "";
          break;
        }
        case "contentJ": {
          if ((document.getElementById("contentG").value = this.jtzzEdit))
            document.getElementById("contentG").value = "";
          break;
        }
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  },
  mounted(){
    if (this.xhEdit) {
      this.ruleForm.xh = this.xhEdit;
    }
    if (this.nameEdit) {
      this.ruleForm.name = this.nameEdit;
    }
    if (this.sexEdit) {
      this.ruleForm.sex = this.sexEdit;
    }
    if (this.ageEdit) {
      this.ruleForm.age = this.ageEdit;
    }
    if (this.gwEdit) {
      this.ruleForm.gw = this.gwEdit;
    }
    if (this.bmmcEdit) {
      this.ruleForm.bmmc = this.bmmcEdit;
    }
    if (this.pnumEdit) {
      this.ruleForm.pnum = this.pnumEdit;
    }
    if (this.idEdit) {
      this.ruleForm.id = this.idEdit;
    }
    if (this.pyjsmEdit) {
      this.ruleForm.pyjsm = this.pyjsmEdit;
    }
    if (this.jtzzEdit) {
      this.ruleForm.jtzz = this.jtzzEdit;
    }
  },
  watch: {
    xhEdit() {
      this.ruleForm.xh = this.xhEdit;
    },
    nameEdit() {
      this.ruleForm.name = this.nameEdit;
    },
    sexEdit() {
      this.ruleForm.sex = this.sexEdit;
    },
    ageEdit() {
      this.ruleForm.age = this.ageEdit;
    },
    gwEdit() {
      this.ruleForm.gw = this.gwEdit;
    },
    bmmcEdit() {
      this.ruleForm.bmmc = this.bmmcEdit;
    },
    pnumEdit() {
      this.ruleForm.pnum = this.pnumEdit;
    },
    idEdit() {
      this.ruleForm.id = this.idEdit;
    },
    pyjsmEdit() {
      this.ruleForm.pyjsm = this.pyjsmEdit;
    },
    jtzzEdit() {
      this.ruleForm.jtzz = this.jtzzEdit;
    },
  }
};
</script>

