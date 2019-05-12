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
        <el-form-item label="员工ID" prop="s_id">
          <el-input v-model="ruleForm.s_id" :class="style.addinput" @focus="clear" id="contentA"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="s_name">
          <el-input v-model="ruleForm.s_name" :class="style.addinput" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="s_sex">
          <el-input v-model="ruleForm.s_sex" :class="style.addinput" @focus="clear" id="contentC"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="s_age">
          <el-input v-model="ruleForm.s_age" :class="style.addinput" @focus="clear" id="contentD"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="s_position">
          <el-input v-model="ruleForm.s_position" :class="style.addinput" @focus="clear" id="contentE"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="s_state">
          <el-input v-model="ruleForm.s_state" :class="style.addinput" @focus="clear" id="contentF"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="s_phone">
          <el-input v-model="ruleForm.s_phone" :class="style.addinput" @focus="clear" id="contentG"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="s_password">
          <el-input v-model="ruleForm.s_password" :class="style.addinput"  id="contentH" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="s_checkPass">
          <el-input type="password" v-model="ruleForm.s_checkPass" :class="style.addinput" id="contentI"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newAdd('ruleForm')" v-if="tiJiao">提交</el-button>
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
    let validatePass = (rule, value, callback) =>{
        if(value == ''){
            callback(new Error('请输入密码'))
        }else{
            if(value.length<6||value.length>10){
                callback(new Error('密码长度为6-10位'))
            }else if(!/^[A-Za-z0-9]+$/.test(value))
            {
                callback(new Error('只能含有数字或字母，不能包含特殊字符'))
            }else{
                callback();
            }
        }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.ruleForm.s_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      style,
      ruleForm: {
        s_id:"",
        s_name:"",
        s_sex:"",
        s_age:"",
        s_position:"",
        s_state:"",
        s_phone:"",
        s_password:"",
        s_checkPass:""
      },
      rules: {
        s_password:[
            {validator: validatePass, trigger: 'blur' }
        ],
        s_checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  props: {
    addVisible: null,
    s_idEdit: null,
    s_nameEdit: null,
    s_sexEdit: null,
    s_ageEdit: null,
    s_positionEdit: null,
    s_stateEdit: null,
    s_phoneEdit: null,
    s_passwordEdit:null,
    tiJiao: null,
  },
  methods: {
    
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$emit(
            "newAdd",
            this.ruleForm.s_id,
            this.ruleForm.s_name,
            this.ruleForm.s_sex,
            this.ruleForm.s_age,
            this.ruleForm.s_position,
            this.ruleForm.s_state,
            this.ruleForm.s_phone,
            this.ruleForm.s_password,
          );
        } else {
            return false;
        }
      });
    },
    newEdit() {
      this.$emit(
        "newEdit",
        this.ruleForm.s_id,
        this.ruleForm.s_name,
        this.ruleForm.s_sex,
        this.ruleForm.s_age,
        this.ruleForm.s_position,
        this.ruleForm.s_state,
        this.ruleForm.s_phone
      );
    },
    clear(e) {
      switch (e.target.id) {
        case "contentA": {
          if ((document.getElementById("contentA").value = this.s_idEdit))
            document.getElementById("contentA").value = "";
          break;
        }
        case "contentB": {
          if ((document.getElementById("contentB").value = this.s_nameEdit))
            document.getElementById("contentB").value = "";
          break;
        }
        case "contentC": {
          if ((document.getElementById("contentC").value = this.s_sexEdit))
            document.getElementById("contentC").value = "";
          break;
        }
        case "contentD": {
          if ((document.getElementById("contentD").value = this.s_ageEdit))
            document.getElementById("contentD").value = "";
          break;
        }
        case "contentE": {
          if ((document.getElementById("contentE").value = this.s_positionEdit))
            document.getElementById("contentE").value = "";
          break;
        }
        case "contentF": {
          if ((document.getElementById("contentF").value = this.s_stateEdit))
            document.getElementById("contentF").value = "";
          break;
        }
        case "contentG": {
          if ((document.getElementById("contentG").value = this.s_phoneEdit))
            document.getElementById("contentG").value = "";
          break;
        }
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  },
  mounted(){
    if (this.s_idEdit) {
      this.ruleForm.s_id = this.s_idEdit;
    }
    if (this.s_nameEdit) {
      this.ruleForm.s_name = this.s_nameEdit;
    }
    if (this.s_sexEdit) {
      this.ruleForm.s_sex = this.s_sexEdit;
    }
    if (this.s_ageEdit) {
      this.ruleForm.s_age = this.s_ageEdit;
    }
    if (this.s_positionEdit) {
      this.ruleForm.s_position = this.s_positionEdit;
    }
    if (this.s_stateEdit) {
      this.ruleForm.s_state = this.s_stateEdit;
    }
    if (this.s_phoneEdit) {
      this.ruleForm.s_phone = this.s_phoneEdit;
    }
    if (this.passwordEdit) {
      this.ruleForm.passwordEdit = this.passwordEdit;
      this.ruleForm.s_checkPass = this.passwordEdit;
    }
  },
  watch: {
    c_idEdit() {
      this.ruleForm.c_id = this.c_idEdit;
    },
    c_nameEdit() {
      this.ruleForm.c_name = this.c_nameEdit;
    },
    c_sexEdit() {
      this.ruleForm.c_sex = this.c_sexEdit;
    },
    c_ageEdit() {
      this.ruleForm.c_age = this.c_ageEdit;
    },
    s_positionEdit() {
      this.ruleForm.s_position = this.s_positionEdit;
    },
    s_stateEdit() {
      this.ruleForm.s_state = this.s_stateEdit;
    },
    s_phoneEdit() {
      this.ruleForm.s_phone = this.s_phoneEdit;
    },
    passwordEdit(){
      this.ruleForm.s_password = this.passwordEdit;
      this.ruleForm.s_checkPass = this.passwordEdit;
    }
  }
};
</script>

