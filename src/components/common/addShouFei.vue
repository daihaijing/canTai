<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <ul>
      <li>
        <el-input v-model="xmmc" id="content" placeholder="项目名称:" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="dl" id="content" placeholder="大类" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="xl" id="content" placeholder="小类" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="dw" id="content" placeholder="单位" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="cbdj" id="content" placeholder="成本单价" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="xsdj" id="content" placeholder="销售单价" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="sfcykc" id="content" placeholder="是否参与库存" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="sfcyzk" id="content" placeholder="是否参与折扣" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="sfcyjf" id="content" placeholder="是否参与积分" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="ygtc" placeholder="员工提成" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="spbm" id="content" placeholder="员工提成" @focus="clear"></el-input>
      </li>
    </ul>
    <el-button @click="newAdd" v-if="tiJiao">提交</el-button>
    <el-button @click="newEdit" v-else>修改</el-button>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      xmmc: "",
      dl: "",
      xl: "",
      dw: "",
      cbdj: "",
      xsdj: "",
      sfcykc: "",
      sfcyjf: "",
      sfcyzk: "",
      ygtc: "",
      spbm: "",
      flag:true,
    };
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd() {
      this.$emit(
        "newAdd",
        this.xmmc,
        this.dl,
        this.xl,
        this.dw,
        this.cbdj,
        this.xsdj,
        this.sfcykc,
        this.sfcyjf,
        this.sfcyzk,
        this.ygtc,
        this.spbm
      );
    },
    newEdit(){
        this.$emit(
        "newEdit",
        this.xmmc,
        this.dl,
        this.xl,
        this.dw,
        this.cbdj,
        this.xsdj,
        this.sfcykc,
        this.sfcyjf,
        this.sfcyzk,
        this.ygtc,
        this.spbm
      );
    },
    clear(){
      if(this.flag){
        document.getElementById("content").value='';
        this.flag = false;
      }
    }
  },
  props:{
      xmmcEdit: null,
      dlEdit: null,
      xlEdit: null,
      dwEdit: null,
      cbdjEdit: null,
      xsdjEdit: null,
      sfcykcEdit: null,
      sfcyjfEdit: null,
      sfcyzkEdit: null,
      ygtcEdit:null,
      spbmEdit: null,
      addVisible: null,
      tiJiao:null,
  },
  mounted(){
      if(this.xmmcEdit){
          this.xmmc = this.xmmcEdit;
      }
      if(this.dlEdit){
          this.dl = this.dlEdit;
      }
      if(this.xlEdit){
          this.xl = this.xlEdit;
      }
      if(this.dwEdit){
          this.dw = this.dwEdit;
      }
      if(this.cbdjEdit){
          this.cbdj = this.cbdjEdit;
      }
      if(this.xsdjEdit){
          this.xsdj = this.xsdjEdit;
      }
      if(this.sfcykcEdit){
          this.sfcykc = this.sfcykcEdit;
      }
      if(this.sfcyjfEdit){
          this.sfcyjf = this.sfcyjfEdit;
      }
      if(this.sfcyzkEdit){
          this.sfcyzk = this.sfcyzkEdit;
      }
      if(this.ygtcEdit){
          this.ygtc = this.ygtcEdit;
      }
      if(this.spbmEdit){
          this.spbm = this.spbmEdit;
      }
  },
  watch:{
      xmmcEdit(){
        this.xmmc = this.xmmcEdit;
      },
       dlEdit(){
         this.dl = this.dlEdit;
      },
       xlEdit(){
         this.xl = this.xlEdit;
      },
       dwEdit(){
         this.dw = this.dwEdit;
      },
       cbdjEdit(){
       this.cbdj = this.cbdjEdit;
      },
       xsdjEdit(){
        this.xsdj = this.xsdjEdit;
      },
       sfcykcEdit(){
        this.sfcykc = this.sfcykcEdit;
      },
       sfcyjfEdit(){
        this.sfcyjf = this.sfcyjfEdit;
      },
       sfcyzkEdit(){
        this.sfcyzk = this.sfcyzkEdit;
      },
       ygtcEdit(){
        this.ygtc = this.ygtcEdit;
      },
       spbmEdit(){
         this.spbm = this.spbmEdit;
      }
  }
};
</script>


