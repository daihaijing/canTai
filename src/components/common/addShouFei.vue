<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <div :class="style.title">
      <span :class="style.txtView" v-if="tiJiao">新增项目</span>
      <span :class="style.txtView" v-else>修改项目</span>
    </div>
    <div :class="style.content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目名称" prop="m_name">
          <el-input v-model="ruleForm.m_name" @focus="clear" id="contentA"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="m_number">
          <el-input v-model="ruleForm.m_number" @focus="clear" id="contentB"></el-input>
        </el-form-item>
        <el-form-item label="项目编码" prop="m_simplename">
          <el-input v-model="ruleForm.m_simplename" @focus="clear" id="contentC"></el-input>
        </el-form-item>
        <el-form-item label="项目类别" prop="ms_name">
          <el-input v-model="ruleForm.ms_name" @focus="clear" id="contentD"></el-input>
        </el-form-item>
        <el-form-item label="项目图标" prop="m_picture">
          <el-input v-model="ruleForm.m_picture" @focus="clear" id="contentE"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="m_unit">
          <el-input v-model="ruleForm.m_unit" @focus="clear" id="contentF"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="m_price">
          <el-input v-model="ruleForm.m_price" @focus="clear" id="contentG"></el-input>
        </el-form-item>
        <el-form-item label="项目状态" prop="m_state">
          <el-input v-model="ruleForm.m_state" @focus="clear" id="contentH"></el-input>
        </el-form-item>
        <el-form-item label="项目备注" prop="m_remark">
          <el-input v-model="ruleForm.m_remark" @focus="clear" id="contentI"></el-input>
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
      flag: true,
      ruleForm: {
        m_name: "",
        m_number: "",
        ms_name: "",
        m_simplename: "",
        m_picture: "",
        m_unit: "",
        m_price: "",
        m_state: "",
        m_remark: ""
      },
      rules: {
        // xmmc: [
        //   { required: true, message: "请输入项目名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        // ],
        // xmbh: [
        //   { required: true, message: "请输入项目编号", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        // ],
        // xmbm: [
        //   { required: true, message: "请输入项目编码", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        // ]
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
        this.ruleForm.m_name,
        this.ruleForm.m_number,
        this.ruleForm.m_simplename,
        this.ruleForm.ms_name,
        this.ruleForm.m_picture,
        this.ruleForm.m_unit,
        this.ruleForm.m_price,
        this.ruleForm.m_state,
        this.ruleForm.m_remark
      );
    },
    newEdit() {
      this.$emit(
        "newEdit",
        this.ruleForm.m_name,
        this.ruleForm.m_number,
        this.ruleForm.m_simplename,
        this.ruleForm.ms_name,
        this.ruleForm.m_picture,
        this.ruleForm.m_unit,
        this.ruleForm.m_price,
        this.ruleForm.m_state,
        this.ruleForm.m_remark
      );
    },
    clear(e) {
      switch (e.target.id) {
        case "contentA": {
          if ((document.getElementById("contentA").value = this.m_nameEdit))
            document.getElementById("contentA").value = "";
          break;
        }
        case "contentB": {
          if ((document.getElementById("contentB").value = this.m_numberEdit))
            document.getElementById("contentB").value = "";
          break;
        }
        case "contentC": {
          if ((document.getElementById("contentC").value = this.m_simplenameEdit))
            document.getElementById("contentC").value = "";
          break;
        }
        case "contentD": {
          if ((document.getElementById("contentD").value = this.ms_nameEdit))
            document.getElementById("contentD").value = "";
          break;
        }
        case "contentE": {
          if ((document.getElementById("contentE").value = this.m_pictureEdit))
            document.getElementById("contentE").value = "";
          break;
        }
        case "contentF": {
          if ((document.getElementById("contentF").value = this.m_unitEdit))
            document.getElementById("contentF").value = "";
          break;
        }
        case "contentG": {
          if ((document.getElementById("contentG").value = this.m_priceEdit))
            document.getElementById("contentG").value = "";
          break;
        }
        case "contentH": {
          if ((document.getElementById("contentH").value = this.m_stateEdit))
            document.getElementById("contentH").value = "";
          break;
        }
        case "contentI": {
          if ((document.getElementById("contentI").value = this.m_remarkEdit))
            document.getElementById("contentI").value = "";
          break;
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  props: {
    m_nameEdit: null,
    m_numberEdit: null,
    ms_nameEdit: null,
    m_simplenameEdit: null,
    m_pictureEdit: null,
    m_unitEdit: null,
    m_priceEdit: null,
    m_stateEdit: null,
    m_remarkEdit: null,
    addVisible: null,
    tiJiao: null
  },
  mounted() {
    if (this.m_nameEdit) {
      this.ruleForm.m_name = this.m_nameEdit;
    }
    if (this.m_numberEdit) {
      this.ruleForm.m_number = this.m_numberEdit;
    }
    if (this.m_simplenameEdit) {
      this.ruleForm.m_simplename = this.m_simplenameEdit;
    }
    if (this.ms_nameEdit) {
      this.ruleForm.ms_name = this.ms_nameEdit;
    }
    if (this.m_pictureEdit) {
      this.ruleForm.m_picture = this.m_pictureEdit;
    }
    if (this.m_unitEdit) {
      this.ruleForm.m_unit = this.m_unitEdit;
    }
    if (this.m_priceEdit) {
      this.ruleForm.m_price = this.m_priceEdit;
    }
    if (this.m_stateEdit) {
      this.ruleForm.m_state = this.m_stateEdit;
    }
    if (this.m_remarkEdit) {
      this.ruleForm.m_remark = this.m_remarkEdit;
    }
  },
  watch: {
    m_nameEdit() {
      this.ruleForm.m_name = this.m_nameEdit;
    },
    m_numberEdit() {
      this.ruleForm.m_number = this.m_numberEdit;
    },
    m_simplenameEdit() {
      this.ruleForm.m_simplename = this.m_simplenameEdit;
    },
    ms_nameEdit() {
      this.ruleForm.ms_name = this.ms_nameEdit;
    },
    m_pictureEdit() {
      this.ruleForm.m_picture = this.m_pictureEdit;
    },
    m_unitEdit() {
      this.ruleForm.m_unit = this.m_unitEdit;
    },
    m_priceEdit() {
      this.ruleForm.m_price = this.m_priceEdit;
    },
    m_stateEdit() {
      this.ruleForm.m_state = this.m_stateEdit;
    },
    m_remarkEdit() {
      this.ruleForm.m_remark = this.m_remarkEdit;
    }
  }
};
</script>


