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
        <el-table :data="staffData" style="width: 100%;margin-top:10px" class="FWYtable" height="596">
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
        v-if="addVisible">
      </addFuWuYuan>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%" class="guanLi" style="margin-top: 28vh !important;">
        <el-input type="password" v-model="guanLiPssword" placeholder="请输入管理员密码" @keyup.enter.native="guanLiEmit"></el-input>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddFuWuYuan from "#com/addFuWuYuan";
import style from "css/jcxxgl.css";
import { mapActions } from "vuex";
import { getAllStaff,addOneStaff,deleteOneStaff,updateOneStaff,guanLiPasswordData } from "./mutation-types";
export default {
  data() {
    return {
      num:"",
      nowTime:"",
      style,
      staffData: [],
      staffData2:[],
      addVisible: false,
      s_idEdit: "",
      s_nameEdit: "",
      s_sexEdit: "",
      s_ageEdit: "",
      s_timeEdit: "",
      s_positionEdit: "",
      s_stateEdit: "",
      s_phoneEdit: "",
      tiJiao:true,
      eData:"",
      newData:{},
      dialogVisible:false,
      guanLiPassword:"",
    };
  },
  methods: {
    //添加服务员
    searchFWY(){
      //console.log(this.staffData)
      for(let i = 0;i < this.staffData.length;i++){
        let a = document.getElementsByClassName("FWYtable")[0];
        let b = a.getElementsByTagName("tr")[i];
        b.style.background = "#fff";
      };
      for(let i = 0;i < this.staffData.length;i++){
        if(this.staffData[i].s_id == this.num || this.staffData[i].s_name == this.num){
          let a = document.getElementsByClassName("FWYtable")[0];
          let b = a.getElementsByTagName("tr")[i+1];
          b.style.background = "aquamarine";
        }
      }
    },
    addFWY() {
      if(localStorage.getItem('user')){
        if(JSON.parse(localStorage.getItem('user')).status!='管理员'){
          this.dialogVisible = true;
        }else{
          this.tiJiao = true;
          this.addVisible = true;
        }
      }
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(s_id,s_name,s_sex,s_age,s_position,s_state,s_phone,s_password) {
      var newData2 = {
        s_id:s_id,
        s_name:s_name,
        s_sex:s_sex,
        s_age:s_age,
        s_position:s_position,
        s_state:s_state,
        s_phone:s_phone,
        s_password:s_password,
      };
      this.newData = {
        s_id:s_id,
        s_name:s_name,
        s_sex:s_sex,
        s_age:s_age,
        s_time:this.nowTime,
        s_position:s_position,
        s_state:s_state,
        s_phone:s_phone
      };
      //把input的值 存到临时的 staffData2 中
      this.staffData2.push(newData2);
      //console.log(this.staffData2);
      //向后台发送请求
      this.addStaff();
    },
    newEdit(s_id,s_name,s_sex,s_age,s_position,s_state,s_phone) {
      var newData = {
        s_id:s_id,
        s_name:s_name,
        s_sex:s_sex,
        s_age:s_age,
        s_time:this.nowTime,
        s_position:s_position,
        s_state:s_state,
        s_phone:s_phone,
      };
      this.updateStaff(s_id,s_name,s_sex,s_age,s_position,s_state,s_phone);
    },
    //删除服务员
    deleteData(e) {
      for (let i = 0; i < this.staffData.length; i++) {
        if (e == this.staffData[i]) {
          this.deleteStaff(e.s_id);
          this.staffData.splice(i, 1);
        }
      }
    },
    //修改服务员
    modifyData(e) {
      if(localStorage.getItem('user')){
        if(JSON.parse(localStorage.getItem('user')).status!='管理员'){
          this.dialogVisible = true;
        }else{
          this.tiJiao = false;
          this.addVisible = true;

          this.s_idEdit = e.s_id; 
          this.s_nameEdit = e.s_name;
          this.s_sexEdit = e.s_sex;
          this.s_ageEdit = e.s_age;
          this.s_positionEdit = e.s_position;
          this.s_stateEdit = e.s_state;
          this.s_phoneEdit = e.s_phone;
          this.s_passwordEdit = e.s_password;
          this.eData = e;
        }
      }
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
        guanLiPasswordData
    }),
    async getData() {
      let result = await this.getAllStaff();
      if (!result) return;
      let data = JSON.parse(result);
      this.staffData = data;
    },
    async addStaff(){
      let result = await this.addOneStaff({
        s_id:this.staffData2[0].s_id,
        s_name:this.staffData2[0].s_name,
        s_sex:this.staffData2[0].s_sex,
        s_age:this.staffData2[0].s_age,
        s_position:this.staffData2[0].s_position,
        s_state:this.staffData2[0].s_state,
        s_phone:this.staffData2[0].s_phone,
        s_password:this.staffData2[0].s_password,
      });
      if (result == 1) return;
      this.staffData.push(this.newData);
      //关闭弹框
      this.addVisible = false;
    },
    async deleteStaff(num){
      let result = await this.deleteOneStaff({
        s_id:num,
      });
      if (result == 1) return;
    },
    async updateStaff(s_id,s_name,s_sex,s_age,s_position,s_state,s_phone){
      let result = await this.updateOneStaff({
        s_id:s_id,
        s_name:s_name,
        s_sex:s_sex,
        s_age:s_age,
        s_position:s_position,
        s_state:s_state,
        s_phone:s_phone,
      });
      if (result == 1) return;
      for (let i = 0; i < this.staffData.length; i++) {
        if (this.eData == this.staffData[i]) {
          this.staffData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    async getGuanLiPass(){
      let result = await this.guanLiPasswordData({
        password:this.guanLiPassword
      })
      if(!result) return;
      let data = JSON.parse(result);
      this.dialogVisible = false;
      this.addVisible = true;
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
      this.nowTime =
        year + "-" + month + "-" + date +" " + hh + ":" + mm;
      // console.log(this.nowTime);
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    },
    //提交管理员密码
    guanLiEmit(){
      this.getGuanLiPass();
    }
  },
  created(){
    this.getData();
  },
  //注册组件
  components: {
    AddFuWuYuan
  },
  mounted(){
    //获取时间
    this.nowTimes();
  }
};
</script>
