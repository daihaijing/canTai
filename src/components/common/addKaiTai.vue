<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView">开台</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="点餐编号" prop="o_number">
          <el-input v-model.number="ruleForm.o_number" :class="style.addinput"></el-input>
        </el-form-item>
        <el-form-item label="餐台号" prop="ot_number">
          <el-input v-model.number="ruleForm.ot_number" :class="style.addinput"></el-input>
        </el-form-item>
        <el-form-item label="顾客人数" prop="o_customers">
          <el-input v-model="ruleForm.o_customers" :class="style.addinput" placeholder="此项可不填"></el-input>
        </el-form-item>
        <el-form-item label="服务员" prop="o_server">
          <!-- <el-input v-model="ruleForm.o_server" :class="style.addinput"></el-input> -->
          <el-select v-model="ruleForm.o_server" placeholder="请选择" style="margin-left: 20px;">
            <el-option
              v-for="item in staffTable"
              :key="item.s_name"
              :label="item.s_name"
              :value="item.s_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newAdd('ruleForm')">确定</el-button>
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
    var validatePass_o_customers = (rule, value, callback) => {
      let num = Number(value);
      if (value == "") {
        this.ruleForm.o_customers == 4;//如果顾客人数不填，默认为4
      } else {
        if (!/^[0-9]+$/.test(value)) {
          callback(new Error("只能输入数字"));
        } else if (num < 0 || num > 16) {
          callback(new Error("最多15人"));
        } else {
          callback();
        }
      }
    };
    return {
      style,
      ruleForm: {
        o_number: this.o_number,
        ot_number: this.ot_number,
        o_customers: "",
        o_server: ""
      },
      rules: {
        o_customers: [{ validator: validatePass_o_customers, trigger: "blur" }],
      }
    };
  },
  props: {
    addVisible: null,
    o_number: null,
    ot_number: null,
    staffTable: null
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd(ruleForm) {
      //表单验证
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          //验证成功，将开台信息发送给父组件（开台界面）
          this.$emit(
            "newAdd",
            this.ruleForm.o_number,
            this.ruleForm.ot_number,
            this.ruleForm.o_customers,
            this.ruleForm.o_server
          );
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

