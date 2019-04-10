<template>
  <div>
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">服务员登记</span>
    </div>
    <div :class="style.content">
      <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="xh" label="序号" width="40"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100"></el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="gw" label="岗位" width="100"></el-table-column>
      <el-table-column prop="bmmc" label="部门名称" width="100"></el-table-column>
      <el-table-column prop="pnum" label="联系方式" width="180"></el-table-column>
      <el-table-column prop="id" label="身份证号" width="180"></el-table-column>
      <el-table-column prop="pyjsm" label="拼音检索码" width="100"></el-table-column>
      <el-table-column prop="jtzz" label="家庭住址" width="250"></el-table-column>
      <el-table-column>
        <template slot-scope="scope" style="float:left">
          <a @click="modifyData(scope.row)">修改</a>
          <a @click="deleteData(scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="info" plain @click="addFWY">新增</el-button>
    <el-button type="info" plain @click="backToKaiTai">返回</el-button>
    <addFuWuYuan :addVisible="addVisible" @addCloseEmit="addCloseEmit" @newAdd="newAdd"></addFuWuYuan>
    </div>
  </div>
</template>

<script>
import AddFuWuYuan from "#com/addFuWuYuan";
import style from "css/jcxxgl.css";
export default {
  data() {
    return {
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
    };
  },
  methods: {
    //添加服务员
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
        jtzz: jtzz,
      };
      this.tableData.push(newData);
      this.addVisible = false;
    },
    //删除服务员
    deleteData(e){
      for(let i=0;i<this.tableData.length;i++){
        if(e==this.tableData[i]){
          this.tableData.splice(i,1);
        }
      }
    },
    //返回首页
    backToKaiTai(){
      this.$router.push({path:'kt'});
    }
  },
  //注册组件
  components:{
    AddFuWuYuan,
  },
};
</script>
