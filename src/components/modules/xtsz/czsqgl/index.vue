<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">操作员授权管理</span>
    </div>
    <div :class="style.content">
      <!-- <div>
        <el-button type="info" plain @click="add">新增</el-button>
        <el-button type="info" plain @click="modify">修改</el-button>
        <el-button type="info" plain @click="del">删除</el-button>
        <el-button type="info" plain @click="cancle">取消</el-button>
        <el-button type="info" plain @click="save">保存</el-button>
        <el-button type="info" plain @click="modPassword">修改密码</el-button>
        <el-button type="info" plain @click="backKT">返回</el-button>
      </div>-->
      <table>
        <tr>
          <th>s_id</th>
          <th>s_name</th>
          <th>s_sex</th>
          <th>s_age</th>
          <th>s_time</th>
          <th>s_position</th>
          <th>s_state</th>
          <th>s_phone</th>
        </tr>
        <tr v-for="item in userData" :key="item.s_id">
          <td>{{item.s_id}}</td>
          <td>{{item.s_name}}</td>
          <td>{{item.s_sex}}</td>
          <td>{{item.s_age}}</td>
          <td>{{item.s_time}}</td>
          <td>{{item.s_position}}</td>
          <td>{{item.s_state}}</td>
          <td>{{item.s_phone}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import style from "@/css/xtsz.css";
import axios from "axios";
import { mapActions } from "vuex";
import { getAllUser } from "./mutation-types";
export default {
  data() {
    return {
      style,
      userData: "",
    };
  },
  methods: {
    // add() {},
    // modify() {},
    // del() {},
    // canale() {},
    // save() {},
    // modPassword() {},
    // backKT() {},
    
    //更高级的axios异步通信
    ...mapActions({
        getAllUser
    }),
    async getData() {
      let result = await this.getAllUser();
      if (!result) return;
      //console.log(result);
      let data = JSON.parse(result);
      this.userData = data;
    },

    //我自己写的axios异步通信
    // getData() {
    //   axios
    //     .get("http://localhost:8081/getAllUser")
    //     .then(response => {
    //       this.userData = response.data;
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}
td,
th {
  border: 1px solid #000;
}
</style>
