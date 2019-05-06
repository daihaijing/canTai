<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">服务员登记</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">服务员姓名/编号:</span>
      <el-input :class="style.inputView" v-model="num" @keyup.enter.native="searchFWY"></el-input>
      <el-button type="info" plain @click="searchFWY">查询服务员</el-button>
      <el-button type="info" plain @click="addFWY">新增服务员</el-button>
      <el-button type="info" plain @click="backToKaiTai">返回首页</el-button>
      <el-table :data="staffData" style="width: 100%" class="FWYtable" height="596">
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
        :tiJiao="tiJiao"
        v-if="addVisible">
      </addFuWuYuan>
    </div>
  </div>
</template>

<script>
import AddFuWuYuan from "#com/addFuWuYuan";
import style from "css/jcxxgl.css";
import { mapActions } from "vuex";
import { getAllStaff } from "./mutation-types";
import { addOneStaff } from "./mutation-types";
import { deleteOneStaff } from "./mutation-types";
import { updateOneStaff } from "./mutation-types";
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
      this.addVisible = true;
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(s_id,s_name,s_sex,s_age,s_position,s_state,s_phone) {
      var newData2 = {
        s_id:s_id,
        s_name:s_name,
        s_sex:s_sex,
        s_age:s_age,
        s_position:s_position,
        s_state:s_state,
        s_phone:s_phone
      };
      var newData = {
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
      this.staffData.push(newData);
      //console.log(this.staffData2);
      //向后台发送请求
      this.addStaff();
      //关闭弹框
      this.addVisible = false;
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
      for (let i = 0; i < this.staffData.length; i++) {
        if (this.eData == this.staffData[i]) {
          this.staffData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
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
      this.tiJiao = false;
      this.addVisible = true;

      this.s_idEdit = e.s_id; 
      this.s_nameEdit = e.s_name;
      this.s_sexEdit = e.s_sex;
      this.s_ageEdit = e.s_age;
      this.s_positionEdit = e.s_position;
      this.s_stateEdit = e.s_state;
      this.s_phoneEdit = e.s_phone;
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
      });
      if (result == 1) return;
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
