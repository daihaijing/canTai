<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">服务员登记</span>
    </div>
    <div :class="style.content">
      <div :class="style.shouFeiFw">
        <span :class="style.txtView">服务员姓名/编号:</span>
        <el-input :class="style.inputView" v-model="num" @keyup.enter.native="searchFWY"></el-input>
        <el-button type="info" plain @click="searchFWY">查询服务员</el-button>
        <el-button type="info" plain @click="addFWY">新增服务员</el-button>
        <el-button type="info" plain @click="backToKaiTai">返回首页</el-button>
      </div>
      <div class="table">
        <el-table
          :data="staffData"
          style="width: 100%;margin-top:10px"
          class="FWYtable"
          height="585"
        >
          <el-table-column prop="s_id" label="员工ID" align="center"></el-table-column>
          <el-table-column prop="s_name" label="员工姓名" align="center"></el-table-column>
          <el-table-column prop="s_sex" label="员工性别" align="center"></el-table-column>
          <el-table-column prop="s_age" label="员工年龄" align="center"></el-table-column>
          <el-table-column prop="s_time" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="s_position" label="职位" align="center"></el-table-column>
          <el-table-column prop="s_state" label="状态" align="center"></el-table-column>
          <el-table-column prop="s_phone" label="联系电话" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" width="90">
            <template slot-scope="scope" style="float:left">
              <el-button type="text" size="small" @click="modifyData(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <addFuWuYuan
        :addVisible="addVisible"
        @addCloseEmit="addCloseEmit"
        @newAdd="newAdd"
        @newEdit="newEdit"
        :s_idEdit="s_idEdit"
        :s_nameEdit="s_nameEdit"
        :s_sexEdit="s_sexEdit"
        :s_ageEdit="s_ageEdit"
        :s_positionEdit="s_positionEdit"
        :s_stateEdit="s_stateEdit"
        :s_phoneEdit="s_phoneEdit"
        :s_passwordEdit="s_passwordEdit"
        :tiJiao="tiJiao"
        v-if="addVisible"
      ></addFuWuYuan>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        class="guanLi"
        style="margin-top: 28vh !important;"
      >
        <el-input
          type="password"
          v-model="guanLiPassword"
          placeholder="请输入管理员密码"
          @keyup.enter.native="guanLiEmit"
        ></el-input>
        <span style="color:red;margin-top:15px" v-if="isRightPsw">{{loginMessage}}</span>
        <!-- <el-button type="success" icon="el-icon-check" circle @click="guanLiEmit" plain></el-button> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddFuWuYuan from "#com/addFuWuYuan";
import style from "css/jcxxgl.css";
import { mapActions } from "vuex";
import {
  getAllStaff,
  addOneStaff,
  deleteOneStaff,
  updateOneStaff,
  getAdminPassword
} from "./mutation-types";
export default {
  data() {
    return {
      num: "",
      nowTime: "",
      style,
      staffData: [],
      staffData2: [],
      addVisible: false,
      s_idEdit: "",
      s_nameEdit: "",
      s_sexEdit: "",
      s_ageEdit: "",
      s_timeEdit: "",
      s_positionEdit: "",
      s_stateEdit: "",
      s_phoneEdit: "",
      s_passwordEdit: "",
      tiJiao: true,
      eData: "",
      newData: {},
      dialogVisible: false,
      guanLiPassword: "", //记录管理员密码
      loginMessage: "", //显示密码错误
      isRightPsw: false, //标记密码是否输入正确
      isDel: false, //标记是否点击删除按钮
      s_id: "" //记录员工ID
    };
  },
  methods: {
    searchFWY() {
      //console.log(this.staffData)
      for (let i = 0; i < this.staffData.length; i++) {
        let a = document.getElementsByClassName("FWYtable")[0];
        let b = a.getElementsByTagName("tr")[i];
        b.style.background = "#fff";
      }
      for (let i = 0; i < this.staffData.length; i++) {
        if (
          this.staffData[i].s_id == this.num ||
          this.staffData[i].s_name == this.num
        ) {
          let a = document.getElementsByClassName("FWYtable")[0];
          let b = a.getElementsByTagName("tr")[i + 1];
          b.style.background = "aquamarine";
        }
      }
    },
    //添加服务员
    addFWY() {
      let loginUser = JSON.parse(localStorage.getItem("user"));
      if (localStorage.getItem("user")) {
        if (loginUser.s_position != "经理") {
          this.dialogVisible = true;
        } else {
          this.tiJiao = true;
          this.addVisible = true;
          this.isRightPsw = false;
        }
      }
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(
      s_id,
      s_name,
      s_sex,
      s_age,
      s_position,
      s_state,
      s_phone,
      s_password
    ) {
      var newData = {
        s_id: s_id,
        s_name: s_name,
        s_sex: s_sex,
        s_age: s_age,
        s_time: this.nowTime,
        s_position: s_position,
        s_state: s_state,
        s_phone: s_phone,
        s_password: s_password
      };
      this.staffData.push(newData);
      //向后台发送请求
      this.addStaff(
        s_id,
        s_name,
        s_sex,
        s_age,
        s_position,
        s_state,
        s_phone,
        s_password
      );
      //关闭弹框
      this.addVisible = false;
    },
    newEdit(
      s_id,
      s_name,
      s_sex,
      s_age,
      s_position,
      s_state,
      s_phone,
      s_password
    ) {
      var newData = {
        s_id: s_id,
        s_name: s_name,
        s_sex: s_sex,
        s_age: s_age,
        s_time: this.nowTime,
        s_position: s_position,
        s_state: s_state,
        s_phone: s_phone,
        s_password: s_password
      };
      this.staffData2.push(newData);
      for (let i = 0; i < this.staffData.length; i++) {
        if (this.staffData[i].s_id == this.staffData2[0].s_id) {
          this.staffData[i].s_name = this.staffData2[0].s_name;
          this.staffData[i].s_sex = this.staffData2[0].s_sex;
          this.staffData[i].s_age = this.staffData2[0].s_age;
          this.staffData[i].s_time = this.staffData2[0].s_time;
          this.staffData[i].s_position = this.staffData2[0].s_position;
          this.staffData[i].s_state = this.staffData2[0].s_state;
          this.staffData[i].s_phone = this.staffData2[0].s_phone;
          this.staffData[i].s_password = this.staffData2[0].s_password;
        }
      }
      this.updateStaff(
        s_id,
        s_name,
        s_sex,
        s_age,
        s_position,
        s_state,
        s_phone,
        s_password
      );
      this.s_idEdit = "";
      this.s_nameEdit = "";
      this.s_sexEdit = "";
      this.s_ageEdit = "";
      this.s_positionEdit = "";
      this.s_stateEdit = "";
      this.s_phoneEdit = "";
      this.s_passwordEdit = "";
      this.eData = "";
      //关闭弹框
      this.addVisible = false;
    },
    //删除服务员
    deleteData(e) {
      if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).s_position != "经理") {
          this.s_id = e.s_id;
          this.isDel = true;
          this.dialogVisible = true;
        } else {
          for (let i = 0; i < this.staffData.length; i++) {
            if (e == this.staffData[i]) {
              this.deleteStaff(e.s_id);
              this.staffData.splice(i, 1);
            }
          }
        }
      }
    },
    //修改服务员
    modifyData(e) {
      if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).s_position != "经理") {
          this.dialogVisible = true;
        } else {
          this.addVisible = true;
        }
      }
      this.tiJiao = false;

      this.s_idEdit = e.s_id;
      this.s_nameEdit = e.s_name;
      this.s_sexEdit = e.s_sex;
      this.s_ageEdit = e.s_age;
      this.s_positionEdit = e.s_position;
      this.s_stateEdit = e.s_state;
      this.s_phoneEdit = e.s_phone;
      this.s_passwordEdit = e.s_password;
      this.eData = e;
    },
    //返回首页
    backToKaiTai() {
      this.$router.push({ path: "kt" });
    },
    //异步通信
    ...mapActions({
      getAllStaff,
      addOneStaff,
      deleteOneStaff,
      updateOneStaff,
      getAdminPassword
    }),
    async getData() {
      let result = await this.getAllStaff();
      if (!result) return;
      let data = JSON.parse(result);
      this.staffData = data;
    },
    async addStaff(
      s_id,
      s_name,
      s_sex,
      s_age,
      s_position,
      s_state,
      s_phone,
      s_password
    ) {
      let result = await this.addOneStaff({
        s_id: s_id,
        s_name: s_name,
        s_sex: s_sex,
        s_age: s_age,
        s_position: s_position,
        s_state: s_state,
        s_phone: s_phone,
        s_password: s_password
      });
      if (result == 1) return;
    },
    async deleteStaff(num) {
      let result = await this.deleteOneStaff({
        s_id: num
      });
      if (result == 1) return;
    },
    async updateStaff(
      s_id,
      s_name,
      s_sex,
      s_age,
      s_position,
      s_state,
      s_phone,
      s_password
    ) {
      let result = await this.updateOneStaff({
        s_id: s_id,
        s_name: s_name,
        s_sex: s_sex,
        s_age: s_age,
        s_position: s_position,
        s_state: s_state,
        s_phone: s_phone,
        s_password: s_password
      });
      if (result != 1) return;
    },
    //判断输入的管理员密码是否正确
    async getGuanLiPass() {
      let result = await this.getAdminPassword({
        s_password: this.guanLiPassword
      });
      //if (result == 0) return;
      //**************** */
      //let data = JSON.parse(result);
      if (result == 1) {
        if(!this.isDel){
          this.addVisible = true;
        }
        this.dialogVisible = false;
      } else {
        this.isRightPsw = true;
        this.loginMessage = "密码错误";
      }
    },
    // 获取当前时间函数
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime = year + "-" + month + "-" + date + " " + hh + ":" + mm;
      // console.log(this.nowTime);
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    },
    //提交管理员密码
    guanLiEmit() {
      this.getGuanLiPass();
      if(this.s_id != ""){
        for (let i = 0; i < this.staffData.length; i++) {
            if (this.s_id == this.staffData[i].s_id) {
              this.deleteStaff(this.s_id);
              this.staffData.splice(i, 1);
            }
        }
      }
    }
  },
  created() {
    this.getData();
  },
  //注册组件
  components: {
    AddFuWuYuan
  },
  mounted() {
    //获取时间
    this.nowTimes();
  }
};
</script>
