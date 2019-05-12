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
          <el-input v-model="ruleForm.o_customers" :class="style.addinput"></el-input>
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
          <el-button type="primary" @click="newAdd('ruleForm')">提交</el-button>
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
        o_number: this.o_number,
        ot_number: this.ot_number,
        o_customers: "",
        o_server: ""
      },
      rules: {}
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
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
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

