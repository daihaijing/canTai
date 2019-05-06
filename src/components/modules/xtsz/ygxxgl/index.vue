<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">员工信息管理</span>
    </div>
    <div :class="style.content">
      <el-table class="staffTable" :data="staffData" border height="500">
        <el-table-column prop="s_id" label="员工ID" align="center"></el-table-column>
        <el-table-column prop="s_name" label="员工姓名" align="center"></el-table-column>
        <el-table-column prop="s_sex" label="员工性别" align="center"></el-table-column>
        <el-table-column prop="s_age" label="员工年龄" align="center"></el-table-column>
        <el-table-column prop="s_time" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="s_position" label="职位" align="center"></el-table-column>
        <el-table-column prop="s_state" label="状态" align="center"></el-table-column>
        <el-table-column prop="s_phone" label="联系电话" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import style from "css/xtsz.css";
import { mapActions } from "vuex";
import { getAllStaff } from "./mutation-types";
export default {
  data() {
    return {
      style,
      staffData:"",
    };
  },
  methods:{
    //获取员工信息的异步通信
    ...mapActions({
        getAllStaff,
    }),
    async getData() {
      let result = await this.getAllStaff();
      if (!result) return;
      console.log(result);
      let data = JSON.parse(result);
      this.staffData = data;
    },
  },
  created(){
    this.getData();
  }
};
</script>
