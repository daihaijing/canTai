<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView">新增项目</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="项目名称" prop="xmmc">
          <el-input v-model="ruleForm.xmmc" placeholder="请输入项目名称" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="xmbh">
          <el-input v-model="ruleForm.xmbh" placeholder="请输入项目编号" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="项目编码" prop="xmbm">
          <el-input v-model="ruleForm.xmbm" placeholder="请输入项目编码" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="大类" prop="dl">
          <el-input v-model="ruleForm.dl" placeholder="请输入项目大类" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="小类" prop="xl">
          <el-input v-model="ruleForm.xl" placeholder="请输入项目小类" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="dw">
          <el-input v-model="ruleForm.dw" placeholder="请输入项目单位" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="成本单价" prop="cbdj">
          <el-input v-model="ruleForm.cbdj" placeholder="请输入成本单价" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="销售单价" prop="xsdj">
          <el-input v-model="ruleForm.xsdj" placeholder="请输入销售单价" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="是否参与库存" prop="sfcykc">
          <el-input v-model="ruleForm.sfcykc" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="是否参与折扣" prop="sfcyzk">
          <el-input v-model="ruleForm.sfcyzk" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="是否参与积分" prop="sfcyjf">
          <el-input v-model="ruleForm.sfcyjf" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item label="员工提成" prop="ygtc">
          <el-input v-model="ruleForm.ygtc" placeholder="请输入员工提成" @focus="clear"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newAdd" v-if="tiJiao">提交</el-button>
          <el-button type="primary" @click="newEdit" v-else>修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- <ul>
        <li>
          <el-input v-model="xmmc" id="content" placeholder="项目名称:" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="xmbh" id="content" placeholder="项目编号:" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="xmbm" id="content" placeholder="项目编码:" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="dl" id="content" placeholder="大类" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="xl" id="content" placeholder="小类" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="dw" id="content" placeholder="单位" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="cbdj" id="content" placeholder="成本单价" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="xsdj" id="content" placeholder="销售单价" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="sfcykc" id="content" placeholder="是否参与库存" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="sfcyzk" id="content" placeholder="是否参与折扣" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="sfcyjf" id="content" placeholder="是否参与积分" @focus="clear"></el-input>
        </li>
        <li>
          <el-input v-model="ygtc" placeholder="员工提成" @focus="clear"></el-input>
        </li>
      </ul>
      <el-button type="primary" @click="newAdd" v-if="tiJiao">提交</el-button>
      <el-button type="primary" @click="newEdit" v-else>修改</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import style from "css/jcxxgl.css";
export default {
  data() {
    return {
      style,
      // xmmc: "",
      // xmbh: "",
      // xmbm: "",
      // dl: "",
      // xl: "",
      // dw: "",
      // cbdj: "",
      // xsdj: "",
      // sfcykc: "",
      // sfcyjf: "",
      // sfcyzk: "",
      // ygtc: "",
      flag: true,
      ruleForm: {
        xmmc: "",
        xmbh: "",
        xmbm: "",
        dl: "",
        xl: "",
        dw: "",
        cbdj: "",
        xsdj: "",
        sfcykc: "",
        sfcyjf: "",
        sfcyzk: "",
        ygtc: ""
      },
      rules: {
        xmmc: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        xmbh: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        xmbm: [
          { required: true, message: "请输入项目编码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd() {
      this.$emit(
        "newAdd",
        this.ruleForm.xmmc,
        this.ruleForm.xmbh,
        this.ruleForm.xmbm,
        this.ruleForm.dl,
        this.ruleForm.xl,
        this.ruleForm.dw,
        this.ruleForm.cbdj,
        this.ruleForm.xsdj,
        this.ruleForm.sfcykc,
        this.ruleForm.sfcyjf,
        this.ruleForm.sfcyzk,
        this.ruleForm.ygtc
      );
    },
    newEdit() {
      this.$emit(
        "newEdit",
        this.ruleForm.xmmc,
        this.ruleForm.xmbh,
        this.ruleForm.xmbm,
        this.ruleForm.dl,
        this.ruleForm.xl,
        this.ruleForm.dw,
        this.ruleForm.cbdj,
        this.ruleForm.xsdj,
        this.ruleForm.sfcykc,
        this.ruleForm.sfcyjf,
        this.ruleForm.sfcyzk,
        this.ruleForm.ygtc
      );
    },
    clear() {
      if (this.flag) {
        document.getElementById("content").value = "";
        this.flag = false;
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  },
  props: {
    xmmcEdit: null,
    xmbhEdit: null,
    xmbmEdit: null,
    dlEdit: null,
    xlEdit: null,
    dwEdit: null,
    cbdjEdit: null,
    xsdjEdit: null,
    sfcykcEdit: null,
    sfcyjfEdit: null,
    sfcyzkEdit: null,
    ygtcEdit: null,
    addVisible: null,
    tiJiao: null
  },
  mounted() {
    if (this.xmmcEdit) {
      this.ruleForm.xmmc = this.xmmcEdit;
    }
    if (this.xmbhEdit) {
      this.ruleForm.xmbh = this.xmbhEdit;
    }
    if (this.xmbmEdit) {
      this.ruleForm.xmbm = this.xmbmEdit;
    }
    if (this.dlEdit) {
      this.ruleForm.dl = this.dlEdit;
    }
    if (this.xlEdit) {
      this.ruleForm.xl = this.xlEdit;
    }
    if (this.dwEdit) {
      this.ruleForm.dw = this.dwEdit;
    }
    if (this.cbdjEdit) {
      this.ruleForm.cbdj = this.cbdjEdit;
    }
    if (this.xsdjEdit) {
      this.ruleForm.xsdj = this.xsdjEdit;
    }
    if (this.sfcykcEdit) {
      this.ruleForm.sfcykc = this.sfcykcEdit;
    }
    if (this.sfcyjfEdit) {
      this.ruleForm.sfcyjf = this.sfcyjfEdit;
    }
    if (this.sfcyzkEdit) {
      this.ruleForm.sfcyzk = this.sfcyzkEdit;
    }
    if (this.ygtcEdit) {
      this.ruleForm.ygtc = this.ygtcEdit;
    }
  },
  watch: {
    xmmcEdit() {
      this.ruleForm.xmmc = this.xmmcEdit;
    },
    xmbhEdit() {
      this.ruleForm.xmbh = this.xmbhEdit;
    },
    xmbmEdit() {
      this.ruleForm.xmbm = this.xmbmEdit;
    },
    dlEdit() {
      this.ruleForm.dl = this.dlEdit;
    },
    xlEdit() {
      this.ruleForm.xl = this.xlEdit;
    },
    dwEdit() {
      this.ruleForm.dw = this.dwEdit;
    },
    cbdjEdit() {
      this.ruleForm.cbdj = this.cbdjEdit;
    },
    xsdjEdit() {
      this.ruleForm.xsdj = this.xsdjEdit;
    },
    sfcykcEdit() {
      this.ruleForm.sfcykc = this.sfcykcEdit;
    },
    sfcyjfEdit() {
      this.ruleForm.sfcyjf = this.sfcyjfEdit;
    },
    sfcyzkEdit() {
      this.ruleForm.sfcyzk = this.sfcyzkEdit;
    },
    ygtcEdit() {
      this.ruleForm.ygtc = this.ygtcEdit;
    }
  }
};
</script>


