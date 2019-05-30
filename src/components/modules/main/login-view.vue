<template>
<!-- 用户登录弹框 -->
  <el-dialog :visible.sync="isLogin" @close="loginEmit" class="loginDiv">
    <el-form
      :model="dynamicValidateForm"
      status-icon
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
      :rules="rules"
      style="width: 390px;
             opacity: 0.8;"
    >
      <div style="text-align:center;margin-bottom:17px;font-size:25px;color:rgb(255, 208, 75);">登 录</div>
      <el-form-item prop="userName" label="用户名">
        <el-input class="loginInput" v-model="dynamicValidateForm.userName"></el-input>
      </el-form-item>
      <el-form-item prop="passWord" label="密码">
        <el-input class="loginInput" type="password" v-model="dynamicValidateForm.passWord" @keyup.enter.native="upUser('dynamicValidateForm')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="upUser('dynamicValidateForm')" class="loginButton">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import Crypto from "@/Crypto";//用于加密
import { mapActions } from "vuex";
import { getLogin } from "./mutation-types";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
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
      dynamicValidateForm: {
        userName: "",
        passWord: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在2-4位字符", trigger: "blur" }
        ],
        passWord: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  props: {
    isLogin: null
  },
  methods: {
    loginEmit() {
      this.$emit("loginEmit");
    },
    //异步通信
    ...mapActions({
      getLogin
    }),
    async loginEmitData() {
      let result = await this.getLogin({
        s_id: this.dynamicValidateForm.userName,
        s_password: this.dynamicValidateForm.passWord
      });
      if (result) {
        var data = JSON.parse(result);
        let s_position = data.s_position;
        var user = {};
        user.userName = data.s_name;
        user.passWord = escape(Crypto.set(this.dynamicValidateForm.passWord));//escape用于对字符串进行编码
        user.time = Date.parse(new Date()) + 2592000000;//设置过期时间
        user.s_position = data.s_position;
        localStorage.setItem("user", JSON.stringify(user));//将登陆信息保存在本地浏览器的localStorage中
        this.isLogin = false;
        location.reload();
      }else{
        this.dynamicValidateForm.passWord = "";
        this.$notify.error({
          title: "错误",
          message: "密码错误,请重新输入！"
        });
      }
    },
    upUser(formName) {
      this.$refs[formName].validate(valid => { 
        //this.$refs[formName]拿到正确的需要验证的form
        //validate jquery中用来进行表单验证的插件
        if (valid) {
          this.loginEmitData();
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>

