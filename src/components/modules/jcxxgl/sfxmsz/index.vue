<template>
  <div>
    <div :class="style.title">
      <span style="color:#fff;margin-left:20px;vertical-align:middle;">收费项目设置</span>
    </div>
    <div :class="style.content">
      <el-table :data="tableData" style="width: 100%" class="shouFeiTable">
      <el-table-column prop="xmmc" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="dl" label="大类" width="100"></el-table-column>
      <el-table-column prop="xl" label="小类" width="100"></el-table-column>
      <el-table-column prop="dw" label="单位" width="80"></el-table-column>
      <el-table-column prop="cbdj" label="成本单价" width="80"></el-table-column>
      <el-table-column prop="xsdj" label="销售单价" width="60"></el-table-column>
      <el-table-column prop="sfcykc" label="是否参与库存" width="80"></el-table-column>
      <el-table-column prop="sfcyjf" label="是否参与积分" width="80"></el-table-column>
      <el-table-column prop="sfcyzk" label="是否参与折扣" width="80"></el-table-column>
      <el-table-column prop="ygtc" label="员工提成" width="100"></el-table-column>
      <el-table-column prop="spbm" label="商品编码" width="180"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <a @click="modifyData(scope.row)">修改</a>
          <a @click="deleteData(scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="info" plain @click="addSF">新增</el-button>
    <el-button type="info" plain @click="backKaitai">返回</el-button>
    <addShouFei
      :addVisible="addVisible"
      @addCloseEmit="addCloseEmit"
      @newAdd="newAdd"
      :xmmcEdit="xmmcEdit"
      :dlEdit="dlEdit"
      :xlEdit="xlEdit"
      :dwEdit="dwEdit"
      :cbdjEdit="cbdjEdit"
      :xsdjEdit="xsdjEdit"
      :sfcykcEdit="sfcykcEdit"
      :sfcyjfEdit="sfcyjfEdit"
      :sfcyzkEdit="sfcyzkEdit"
      :ygtcEdit="ygtcEdit"
      :spbmEdit="spbmEdit"
      :tiJiao="tiJiao"
      @newEdit="newEdit"
    ></addShouFei>
    </div>
  </div>
</template>

<script>
import AddShouFei from "#com/addShouFei";
import style from "css/jcxxgl.css";
export default {
  data() {
    return {
      style,
      tableData: [
        {
          xmmc: "水煮鱼",
          dl: "厨部",
          xl: "菜品",
          dw: "盘",
          cbdj: "30",
          xsdj: "45",
          sfcykc: "Y",
          sfcyjf: "Y",
          sfcyzk: "Y",
          ygtc: "0",
          spbm: "SZY"
        }
      ],
      addVisible: false,
      xmmcEdit: "",
      dlEdit: "",
      xlEdit: "",
      dwEdit: "",
      cbdjEdit: "",
      xsdjEdit: "",
      sfcykcEdit: "",
      sfcyjfEdit: "",
      sfcyzkEdit: "",
      ygtcEdit: "",
      spbmEdit: "",
      tiJiao: true,
      eData: ""
    };
  },
  methods: {
    //添加收费项目
    addSF() {
      this.tiJiao = true;
      this.addVisible = true;
      this.xmmcEdit = "";
      this.dlEdit = "";
      this.xlEdit = "";
      this.dwEdit = "";
      this.cbdjEdit = "";
      this.xsdjEdit = "";
      this.sfcykcEdit = "";
      this.sfcyjfEdit = "";
      this.sfcyzkEdit = "";
      this.ygtcEdit = "";
      this.spbmEdit = "";
    },
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(xmmc, dl, xl, dw, cbdj, xsdj, sfcykc, sfcyjf, sfcyzk, ygtc, spbm) {
      var newData = {
        xmmc: xmmc,
        dl: dl,
        xl: xl,
        dw: dw,
        cbdj: cbdj,
        xsdj: xsdj,
        sfcykc: sfcykc,
        sfcyjf: sfcyjf,
        sfcyzk: sfcyzk,
        ygtc: ygtc,
        spbm: spbm
      };
      this.tableData.push(newData);
      this.addVisible = false;
    },
    newEdit(xmmc, dl, xl, dw, cbdj, xsdj, sfcykc, sfcyjf, sfcyzk, ygtc, spbm) {
      var newData = {
        xmmc: xmmc,
        dl: dl,
        xl: xl,
        dw: dw,
        cbdj: cbdj,
        xsdj: xsdj,
        sfcykc: sfcykc,
        sfcyjf: sfcyjf,
        sfcyzk: sfcyzk,
        ygtc: ygtc,
        spbm: spbm
      };
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.eData == this.tableData[i]) {
          this.tableData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    //删除收费项目
    deleteData(e) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (e == this.tableData[i]) {
          this.tableData.splice(i, 1);
        }
      }
    },
    //修改收费项目
    modifyData(e) {
      this.tiJiao = false;
      this.addVisible = true;
      this.xmmcEdit = e.xmmc;
      this.dlEdit = e.dl;
      this.xlEdit = e.xl;
      this.dwEdit = e.dw;
      this.cbdjEdit = e.cbdj;
      this.xsdjEdit = e.xsdj;
      this.sfcykcEdit = e.sfcykc;
      this.sfcyjfEdit = e.sfcyjf;
      this.sfcyzkEdit = e.sfcyzk;
      this.ygtcEdit = e.ygtc;
      this.spbmEdit = e.spbm;
      this.eData = e;
    },
    //返回首页
    backKaitai(){
      this.$router.push({path:'kt'});
    }
  },
  components: {
    AddShouFei
  }
};
</script>

