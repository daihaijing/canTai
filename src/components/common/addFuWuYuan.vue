<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <ul>
      <li>
        <el-input v-model="xh" placeholder="序号:"></el-input>
      </li>
      <li>
        <el-input v-model="name" placeholder="姓名"></el-input>
      </li>
      <li>
        <el-input v-model="sex" placeholder="性别"></el-input>
      </li>
      <li>
        <el-input v-model="age" placeholder="年龄"></el-input>
      </li>
      <li>
        <el-input v-model="gw" placeholder="岗位"></el-input>
      </li>
      <li>
        <el-input v-model="bmmc" placeholder="部门名称"></el-input>
      </li>
      <li>
        <el-input v-model="pnum" placeholder="联系方式"></el-input>
      </li>
      <li>
        <el-input v-model="id" placeholder="身份证号"></el-input>
      </li>
      <li>
        <el-input v-model="pyjsm" placeholder="拼音检索吗"></el-input>
      </li>
      <li>
        <el-input v-model="jtzz" placeholder="家庭住址"></el-input>
      </li>
    </ul>
    <el-button @click="newAdd">提交</el-button>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      xh: "",
      name: "",
      sex: "",
      age: "",
      gw: "",
      bmmc: "",
      pnum: "",
      id: "",
      pyjsm: "",
      jtzz: "",
    };
  },
  props: {
    addVisible: null
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd() {
      this.$emit(
        "newAdd",
        this.xh,
        this.name,
        this.sex,
        this.age,
        this.gw,
        this.bmmc,
        this.pnum,
        this.id,
        this.pyjsm,
        this.jtzz,
      );
    }
  }
};
</script>

