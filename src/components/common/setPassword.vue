<template>
  <el-dialog :visible.sync="settingVisible" @close="loginEmit">
    <!-- 
       class="setPassword"
    -->
    <div :class="style.title">
      <span :class="style.txtView">修改密码</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="dynamicValidateForm"
        status-icon
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
        :rules="rules"
      >
        <el-form-item prop="s_name" label="姓名:">
          <span>{{dynamicValidateForm.s_name}}</span>
        </el-form-item>
        <el-form-item prop="s_oldPassword" label="旧密码:">
          <el-input
            :class="style.inputView"
            type="password"
            v-model="dynamicValidateForm.s_oldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="s_newPassword" label="新密码:">
          <el-input
            :class="style.inputView"
            type="password"
            v-model="dynamicValidateForm.s_newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="s_concertNewPassword" label="确认密码:">
          <el-input
            :class="style.inputView"
            type="password"
            v-model="dynamicValidateForm.s_concertNewPassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain @click="submitForm('dynamicValidateForm')">确定</el-button>
          <el-button type="info" plain @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import style from "css/xtsz.css";
import { mapActions } from "vuex";
import {
  getOneStaffByNameAndPsw,
  updateStaffPassword
} from "../modules/main/mutation-types";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入新密码"));
      } else {
        if (value.length < 6 || value.length > 10) {
          callback(new Error("密码长度为6-10位"));
        } else if (!/^[A-Za-z0-9]+$/.test(value)) {
          callback(new Error("只能含有数字或字母，不能包含特殊字符"));
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      } else if (value !== this.dynamicValidateForm.s_newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入旧密码"));
      } else {
        if (value.length < 6 || value.length > 10) {
          callback(new Error("密码长度为6-10位"));
        } else if (!/^[A-Za-z0-9]+$/.test(value)) {
          callback(new Error("只能含有数字或字母，不能包含特殊字符"));
        } else {
          callback();
        }
      }
    };
    return {
      style,
      //表单参数
      dynamicValidateForm: {
        s_name: "",
        s_oldPassword: "",
        s_newPassword: "",
        s_concertNewPassword: ""
      },
      //验证参数
      user: {
        s_name: "sss",
        s_oldPassword: "123456"
      },
      rules: {
        s_oldPassword: [{ validator: validatePass3, trigger: "blur" }],
        s_newPassword: [{ validator: validatePass, trigger: "blur" }],
        s_concertNewPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  props: {
    settingVisible: null
  },
  methods: {
    back() {
      this.$emit("back");
    },
    loginEmit() {
      this.$emit("loginEmit");
    },
    submitForm(formName) {
      //进行表单验证
      this.$refs[formName].validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        } else {
          //通过用户名查询旧密码是否正确
          this.getOneStaff(
            this.dynamicValidateForm.s_name,
            this.dynamicValidateForm.s_oldPassword
          );
        }
      });
    },
    //异步通信
    ...mapActions({
      getOneStaffByNameAndPsw,
      updateStaffPassword
    }),
    //匹配员工姓名和密码
    async getOneStaff(s_name, s_password) {
      let result = await this.getOneStaffByNameAndPsw({
        s_name: s_name,
        s_password: s_password
      });
      if (result != 1) {
        this.$notify.error({
          title: "错误",
          message: "旧密码不正确,请重新输入！"
        });
        this.dynamicValidateForm.s_oldPassword = "";
      } else {
        //将旧密码改为新密码
        this.updatePassword(
          this.dynamicValidateForm.s_name,
          this.dynamicValidateForm.s_newPassword
        );
        this.settingVisible = false;
        localStorage.setItem("user", "");
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    },
    async updatePassword(s_name, s_password) {
      let result = await this.updateStaffPassword({
        s_name: s_name,
        s_password: s_password
      });
      if (result == 1) {
        this.$notify({
          type: "success",
          message: "密码已修改,请重新登录！"
        });
      } else return;
    }
  },
  mounted() {
    this.dynamicValidateForm.s_name = JSON.parse(
      localStorage.getItem("user")
    ).userName;
  }
};
</script>

<style>
</style>
