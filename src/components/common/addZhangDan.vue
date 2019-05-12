<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView">结账</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账单编号" prop="b_number">
          <el-input v-model.number="ruleForm.b_number" :class="style.addinput"></el-input>
        </el-form-item>
        <el-form-item label="餐台号" prop="bt_number">
          <el-input v-model.number="ruleForm.bt_number" :class="style.addinput"></el-input>
        </el-form-item>
        <el-form-item label="应收金额" prop="b_ought">
          <el-input v-model="ruleForm.b_ought" :class="style.addinput"></el-input>
        </el-form-item>
        <el-form-item label="实收金额" prop="b_real">
          <el-input v-model="ruleForm.b_real" :class="style.addinput"></el-input>
        </el-form-item>
        <el-form-item label="收银员" prop="bs_name">
          <el-input v-model="ruleForm.bs_name" :class="style.addinput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newAdd('ruleForm')">确定</el-button>
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
        b_number: "",
        bt_number: "",
        b_ought: "",
        b_real: "",
        bs_name: ""
      },
      rules: {}
    };
  },
  props: {
    addVisible: null,
    zhangDanData: null
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
            this.ruleForm.b_number,
            this.ruleForm.bt_number,
            this.ruleForm.b_ought,
            this.ruleForm.b_real,
            this.ruleForm.bs_name
          );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    if (this.zhangDanData) {
      this.ruleForm.b_number = this.zhangDanData.b_number;
      this.ruleForm.bt_number = this.zhangDanData.bt_number;
      this.ruleForm.b_ought = this.zhangDanData.b_ought;
      this.ruleForm.bs_name = this.zhangDanData.bs_name;
    }
  },
  watch: {
    zhangDanData() {
      if (this.zhangDanData) {
        this.ruleForm.b_number = this.zhangDanData.b_number;
        this.ruleForm.bt_number = this.zhangDanData.bt_number;
        this.ruleForm.b_ought = this.zhangDanData.b_ought;
        this.ruleForm.bs_name = this.zhangDanData.bs_name;
      }
    }
  },
};
</script>

