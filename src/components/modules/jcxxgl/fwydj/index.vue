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
      <el-table :data="tableData" style="width: 100%" class="FWYtable">
        <el-table-column prop="xh" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" width="100"></el-table-column>
        <el-table-column prop="gw" label="岗位" width="100"></el-table-column>
        <el-table-column prop="bmmc" label="部门名称" width="100"></el-table-column>
        <el-table-column prop="pnum" label="联系方式" width="180"></el-table-column>
        <el-table-column prop="id" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="pyjsm" label="拼音检索码" width="100"></el-table-column>
        <el-table-column prop="jtzz" label="家庭住址" width="250"></el-table-column>
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
        :xhEdit="xhEdit"
        :nameEdit="nameEdit"
        :sexEdit="sexEdit"
        :ageEdit="ageEdit"
        :gwEdit="gwEdit"
        :bmmcEdit="bmmcEdit"
        :pnumEdit="pnumEdit"
        :idEdit="idEdit"
        :pyjsmEdit="pyjsmEdit"
        :jtzzEdit="jtzzEdit"
        :tiJiao="tiJiao"
        v-if="addVisible">
      </addFuWuYuan>
    </div>
  </div>
</template>

<script>
import AddFuWuYuan from "#com/addFuWuYuan";
import style from "css/jcxxgl.css";
export default {
  data() {
    return {
      num:"",
      style,
      tableData: [
        {
          xh: "1",
          name: "程二狗",
          sex: "男",
          age: "23",
          gw: "服务员",
          bmmc: "人事部",
          pnum: "12138",
          id: "666666",
          pyjsm: "CEG",
          jtzz: "象牙山庄"
        },
        {
          xh: "2",
          name: "程二狗",
          sex: "男",
          age: "23",
          gw: "服务员",
          bmmc: "人事部",
          pnum: "12138",
          id: "666666",
          pyjsm: "CEG",
          jtzz: "象牙山庄"
        },
        {
          xh: "3",
          name: "程二狗",
          sex: "男",
          age: "23",
          gw: "服务员",
          bmmc: "人事部",
          pnum: "12138",
          id: "666666",
          pyjsm: "CEG",
          jtzz: "象牙山庄"
        },
        {
          xh: "4",
          name: "程二狗",
          sex: "男",
          age: "23",
          gw: "服务员",
          bmmc: "人事部",
          pnum: "12138",
          id: "666666",
          pyjsm: "CEG",
          jtzz: "象牙山庄"
        }
      ],
      addVisible: false,
      xhEdit: "",
      nameEdit: "",
      sexEdit: "",
      ageEdit: "",
      gwEdit: "",
      bmmcEdit: "",
      pnumEdit: "",
      idEdit: "",
      pyjsmEdit: "",
      jtzzEdit: "",
      tiJiao:true,
      eData:"",
    };
  },
  methods: {
    //添加服务员
    searchFWY(){
      for(let i = 0;i < this.tableData.length;i++){
        let a = document.getElementsByClassName("FWYtable")[0];
        let b = a.getElementsByTagName("tr")[i];
        b.style.background = "#fff";
      };
      for(let i = 0;i < this.tableData.length;i++){
        if(this.tableData[i].xh == this.num || this.tableData[i].name == this.num){
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
    newAdd(xh, name, sex, age, gw, bmmc, pnum, id, pyjsm, jtzz) {
      var newData = {
        xh: xh,
        name: name,
        sex: sex,
        age: age,
        gw: gw,
        bmmc: bmmc,
        pnum: pnum,
        id: id,
        pyjsm: pyjsm,
        jtzz: jtzz
      };
      this.tableData.push(newData);
      this.addVisible = false;
    },
    newEdit(xh, name, sex, age, gw, bmmc, pnum, id, pyjsm, jtzz) {
      var newData = {
        xh: xh,
        name: name,
        sex: sex,
        age: age,
        gw: gw,
        bmmc: bmmc,
        pnum: pnum,
        id: id,
        pyjsm: pyjsm,
        jtzz: jtzz
      };
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.eData == this.tableData[i]) {
          this.tableData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    //删除服务员
    deleteData(e) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (e == this.tableData[i]) {
          this.tableData.splice(i, 1);
        }
      }
    },
    //修改服务员
    modifyData(e) {
      this.tiJiao = false;
      this.addVisible = true;

      this.xhEdit = e.xh; 
      this.nameEdit = e.name;
      this.sexEdit = e.sex;
      this.ageEdit = e.age;
      this.gwEdit = e.gw;
      this.bmmcEdit = e.bmmc;
      this.pnumEdit = e.pnum;
      this.idEdit = e.id;
      this.pyjsmEdit = e.pyjsm;
      this.jtzzEdit = e.jtzz;
      this.eData = e;
    },
    //返回首页
    backToKaiTai() {
      this.$router.push({ path: "kt" });
    }
  },
  //注册组件
  components: {
    AddFuWuYuan
  }
};
</script>
