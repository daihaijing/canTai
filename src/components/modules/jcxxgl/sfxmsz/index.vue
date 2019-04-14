<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">收费项目设置</span>
    </div>
    <div :class="style.content">
      <div>
        <span :class="style.txtView">项目名称：</span>
        <el-input :class="style.inputView" v-model="num" @keyup.enter.native="searchSF"></el-input>
        <el-button type="info" plain @click="searchSF">查询项目</el-button>
        <el-button type="info" plain @click="addSF">新增项目</el-button>
        <el-button type="info" plain @click="backKaitai">返回首页</el-button>
      </div>
      <el-table :data="shouFeiData" style="width: 100%" class="shouFeiTable">
        <el-table-column prop="xmmc" label="项目名称" width="100" fixed="left"></el-table-column>
        <el-table-column prop="xmbh" label="项目编号" width="60"></el-table-column>
        <el-table-column prop="xmbm" label="项目编码" width="60"></el-table-column>
        <el-table-column prop="dl" label="大类" width="80"></el-table-column>
        <el-table-column prop="xl" label="小类" width="80"></el-table-column>
        <el-table-column prop="dw" label="单位" width="80"></el-table-column>
        <el-table-column prop="cbdj" label="成本单价" width="80"></el-table-column>
        <el-table-column prop="xsdj" label="销售单价" width="60"></el-table-column>
        <el-table-column prop="sfcykc" label="是否参与库存" width="100"></el-table-column>
        <el-table-column prop="sfcyjf" label="是否参与积分" width="100"></el-table-column>
        <el-table-column prop="sfcyzk" label="是否参与折扣" width="100"></el-table-column>
        <el-table-column prop="ygtc" label="员工提成" width="80"></el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyData(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <addShouFei
        :addVisible="addVisible"
        @addCloseEmit="addCloseEmit"
        @newAdd="newAdd"
        :xmmcEdit="xmmcEdit"
        :xmbhEdit="xmbhEdit"
        :xmbmEdit="xmbmEdit"
        :dlEdit="dlEdit"
        :xlEdit="xlEdit"
        :dwEdit="dwEdit"
        :cbdjEdit="cbdjEdit"
        :xsdjEdit="xsdjEdit"
        :sfcykcEdit="sfcykcEdit"
        :sfcyjfEdit="sfcyjfEdit"
        :sfcyzkEdit="sfcyzkEdit"
        :ygtcEdit="ygtcEdit"
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
      num:"",
      shouFeiData: [
        {
          xmmc: "水煮鱼",
          xmbh:"001",
          xmbm: "SZY",
          dl: "厨部",
          xl: "热菜",
          dw: "盘",
          cbdj: "30",
          xsdj: "45",
          sfcykc: "Y",
          sfcyjf: "Y",
          sfcyzk: "Y",
          ygtc: "0",
        },
        {
          xmmc: "大闸蟹",
          xmbh:"002",
          xmbm: "DZX",
          dl: "厨部",
          xl: "海鲜",
          dw: "盘",
          cbdj: "30",
          xsdj: "45",
          sfcykc: "Y",
          sfcyjf: "Y",
          sfcyzk: "Y",
          ygtc: "0",
        },
        {
          xmmc: "馒头",
          xmbh:"003",
          xmbm: "MT",
          dl: "厨部",
          xl: "主食",
          dw: "个",
          cbdj: "1",
          xsdj: "2",
          sfcykc: "Y",
          sfcyjf: "Y",
          sfcyzk: "Y",
          ygtc: "0",
        },
        {
          xmmc: "蟹黄豆角",
          xmbh:"004",
          xmbm: "XHDJ",
          dl: "厨部",
          xl: "热菜",
          dw: "盘",
          cbdj: "30",
          xsdj: "45",
          sfcykc: "Y",
          sfcyjf: "Y",
          sfcyzk: "Y",
          ygtc: "0",
        },
        {
          xmmc: "羊肉串",
          xmbh:"005",
          xmbm: "YRC",
          dl: "厨部",
          xl: "烧烤",
          dw: "串",
          cbdj: "2",
          xsdj: "4",
          sfcykc: "Y",
          sfcyjf: "Y",
          sfcyzk: "Y",
          ygtc: "0",
        },
      ],
      addVisible: false,
      xmmcEdit: "",
      xmbhEdit:"",
      xmbmEdit:"",
      dlEdit: "",
      xlEdit: "",
      dwEdit: "",
      cbdjEdit: "",
      xsdjEdit: "",
      sfcykcEdit: "",
      sfcyjfEdit: "",
      sfcyzkEdit: "",
      ygtcEdit: "",
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
      this.xmbhEdit = "";
      this.xmbmEdit = "";
      this.dlEdit = "";
      this.xlEdit = "";
      this.dwEdit = "";
      this.cbdjEdit = "";
      this.xsdjEdit = "";
      this.sfcykcEdit = "";
      this.sfcyjfEdit = "";
      this.sfcyzkEdit = "";
      this.ygtcEdit = "";
    },
    //关闭添加弹框
    addCloseEmit() {
      this.addVisible = false;
    },
    newAdd(xmmc,xmbh,xmbm, dl, xl, dw, cbdj, xsdj, sfcykc, sfcyjf, sfcyzk, ygtc) {
      var newData = {
        xmmc: xmmc,
        xmbh: xmbh,
        xmbm: xmbm,
        dl: dl,
        xl: xl,
        dw: dw,
        cbdj: cbdj,
        xsdj: xsdj,
        sfcykc: sfcykc,
        sfcyjf: sfcyjf,
        sfcyzk: sfcyzk,
        ygtc: ygtc,
      };
      this.shouFeiData.push(newData);
      this.addVisible = false;
    },
    newEdit(xmmc,xmbh,xmbm, dl, xl, dw, cbdj, xsdj, sfcykc, sfcyjf, sfcyzk, ygtc) {
      var newData = {
        xmmc: xmmc,
        xmbh: xmbh,
        xmbm: xmbm,
        dl: dl,
        xl: xl,
        dw: dw,
        cbdj: cbdj,
        xsdj: xsdj,
        sfcykc: sfcykc,
        sfcyjf: sfcyjf,
        sfcyzk: sfcyzk,
        ygtc: ygtc,
      };
      for (let i = 0; i < this.shouFeiData.length; i++) {
        if (this.eData == this.shouFeiData[i]) {
          this.shouFeiData.splice(i, 1, newData);
          this.addVisible = false;
        }
      }
    },
    //删除收费项目
    deleteData(e) {
      for (let i = 0; i < this.shouFeiData.length; i++) {
        if (e == this.shouFeiData[i]) {
          this.shouFeiData.splice(i, 1);
        }
      }
    },
    //修改收费项目
    modifyData(e) {
      this.tiJiao = false;
      this.addVisible = true;
      this.xmmcEdit = e.xmmc;
      this.xmbhEdit = e.xmbh;
      this.xmbmEdit = e.xmbm;
      this.dlEdit = e.dl;
      this.xlEdit = e.xl;
      this.dwEdit = e.dw;
      this.cbdjEdit = e.cbdj;
      this.xsdjEdit = e.xsdj;
      this.sfcykcEdit = e.sfcykc;
      this.sfcyjfEdit = e.sfcyjf;
      this.sfcyzkEdit = e.sfcyzk;
      this.ygtcEdit = e.ygtc;
      this.eData = e;
    },
    //查询收费项目
    searchSF(){
      for (let i = 0; i < this.shouFeiData.length; i++) {
        let a = document.getElementsByClassName("shouFeiTable")[0];
        let b = a.getElementsByTagName("tr")[i];
        b.style.background = "#fff";
      }
      for(let i = 0; i < this.shouFeiData.length;i++){
        if (this.shouFeiData[i].xmbm == this.num || this.shouFeiData[i].xmbh == this.num){
          let a = document.getElementsByClassName("shouFeiTable")[0];
          let b = a.getElementsByTagName("tr")[i+1];
          b.style.background = "aquamarine";
        }
        
      }
    },
    //返回首页
    backKaitai() {
      this.$router.push({ path: "kt" });
    }
  },
  components: {
    AddShouFei
  }
};
</script>

