<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">操作员授权管理</span>
    </div>
    <div :class="style.content">
      <div>
        <el-button type="info" plain @click="add">新增</el-button>
        <el-button type="info" plain @click="modify">修改</el-button>
        <el-button type="info" plain @click="del">删除</el-button>
        <el-button type="info" plain @click="cancle">取消</el-button>
        <el-button type="info" plain @click="save">保存</el-button>
        <el-button type="info" plain @click="modPassword">修改密码</el-button>
        <el-button type="info" plain @click="backKT">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import style from "@/css/xtsz.css";
export default {
  data() {
    return {
      style
    };
  },
  methods: {
    add() {},
    modify() {},
    del() {},
    canale() {},
    save() {},
    modPassword() {},
    backKT() {},
  }
};
</script>
