<template>
  <el-dialog :visible.sync="addVisible" @close="addCloseEmit">
    <ul>
      <li>
        <el-input v-model="cth" id="contentA" placeholder="餐台号:" @focus="clear($event)"></el-input>
      </li>
      <li>
        <el-input v-model="name" id="contentB" placeholder="餐台名称" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="ctzt" id="contentC" placeholder="餐台状态" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="type" id="contentD" placeholder="类型" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="edrs" id="contentE" placeholder="额定人数" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="money" id="contentF" placeholder="是否收取包厢费用" @focus="clear"></el-input>
      </li>
      <li>
        <el-input v-model="hmoney" id="contentG" placeholder="每小时包厢费用" @focus="clear"></el-input>
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
      cth: "",
      name: "",
      ctzt: "",
      type: "",
      edrs: "",
      money: "",
      hmoney: "",
    };
  },
  props: {
    addVisible: null,
    cthEdit: null,
    nameEdit: null,
    ctztEdit: null,
    typeEdit: null,
    edrsEdit: null,
    moneyEdit: null,
    hmoneyEdit: null,
    tiJiao:null,
  },
  methods: {
    addCloseEmit() {
      this.$emit("addCloseEmit");
    },
    newAdd() {
      this.$emit(
        "newAdd",
        this.cth,
        this.name,
        this.ctzt,
        this.type,
        this.edrs,
        this.money,
        this.hmoney
      );
    },
    newEdit(){
      this.$emit(
        "newEdit",
        this.cth,
        this.name,
        this.ctzt,
        this.type,
        this.edrs,
        this.money,
        this.hmoney
      );
    },
    clear(e){
        switch(e.target.id){
          case 'contentA':{
            // console.log(this.cth,document.getElementById("contentA").value )
            if(document.getElementById("contentA").value = this.cthEdit)
              document.getElementById("contentA").value="";
            break;
          };
          case 'contentB':{
            if(document.getElementById("contentB").value = this.nameEdit)
              document.getElementById("contentB").value="";
            break;
          };
          case 'contentC':{
            if(document.getElementById("contentC").value = this.ctztEdit)
              document.getElementById("contentC").value="";
            break;
          };
          case 'contentD':{
            if(document.getElementById("contentD").value = this.typeEdit)
              document.getElementById("contentD").value="";
            break;
          };
          case 'contentE':{
            if(document.getElementById("contentE").value = this.edrsEdit)
              document.getElementById("contentE").value="";
            break;
          };
          case 'contentF':{
            if(document.getElementById("contentF").value = this.moneyEdit)
              document.getElementById("contentF").value="";
            break;
          };
          case 'contentG':{
            if(document.getElementById("contentG").value = this.hmoneyEdit)
              document.getElementById("contentG").value="";
            break;
          };
        };
        
        
    }
  },
  mounted(){
    if(this.cthEdit){
          this.cth = this.cthEdit;
      }
      if(this.nameEdit){
          this.name = this.nameEdit;
      }
      if(this.ctztEdit){
          this.ctzt = this.ctztEdit;
      }
      if(this.typeEdit){
          this.type = this.typeEdit;
      }
      if(this.edrsEdit){
          this.edrs = this.edrsEdit;
      }
      if(this.moneyEdit){
          this.money = this.moneyEdit;
      }
      if(this.hmoneyEdit){
          this.hmoney = this.hmoneyEdit;
      }
  },
  watch:{
      cthEdit(){
          this.cth = this.cthEdit;
      },
      nameEdit(){
          this.name = this.nameEdit;
      },
      ctztEdit(){
          this.ctzt = this.ctztEdit;
      },
      typeEdit(){
          this.type = this.typeEdit;
      },
      edrsEdit(){
          this.edrs = this.edrsEdit;
      },
      moneyEdit(){
          this.money = this.moneyEdit;
      },
      hmoneyEdit(){
          this.hmoney = this.hmoneyEdit;
      }
  }
};
</script>
