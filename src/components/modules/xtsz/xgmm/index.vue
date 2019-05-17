<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">修改密码</span>
    </div>
    <div :class="style.content">
      <div :class="style.form">
        <el-form
          :model="dynamicValidateForm"
          status-icon
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
          :rules="rules"
        >
          <el-form-item prop="s_name" label="姓名:">
            <span>{{this.dynamicValidateForm.s_name}}</span>
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
            <el-button type="info" plain @click="concert('dynamicValidateForm')">确定</el-button>
            <el-button type="info" plain @click="backKT">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import style from "css/xtsz.css";
import bus from "@/bus.js";
import { mapActions } from "vuex";
import { updateStaffPassword } from "./mutation-types";
export default {
  data() {
    return {
      style,
      //表单参数
      dynamicValidateForm: {
        s_name: "小李",
        s_oldPassword: "",
        s_newPassword: "",
        s_concertNewPassword: ""
      },
      rules: {
        value1: [
        //   { required: true, message: "请选择餐台号", trigger: "change" }
        ],
        value2: [
          // {required: true, message: '请输入人数',trigger:'blur'},
          // {type: 'number', message: '人数必须为数字值',trigger:'blur'}
        ],
        value3: [
          // { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        value4: [
          // { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    concert(val){
        this.updatePassword(val.s_name,val.s_newPassword);
    },
    backKT(){
        this.$router.push({path:'kt'});
    },
    //异步通信
    ...mapActions({
      updateStaffPassword,
    }),
    //修改密码
    async updatePassword(s_name,s_password){
      let result = await this.updateStaffPassword({
          s_name:s_name,
          s_password:s_password,
      });
      if(result != 1){
          alert("修改失败");
      }else{
          alert("修改成功");
      }
    },
  },
  created() {

  }
};
</script>


