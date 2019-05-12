<template>
  <kuCun :keyName="keyName" :flag="flag" :countRu="countRu" :tableData="tableData" :loading="loading" @typeChange="typeChange" 
  @nameChange="nameChange" @deleteData="deleteData"></kuCun>
</template>

<script>
import KuCun from "#mod/kcgl/kuCun.vue";
import { mapActions } from "vuex";
import { getOneDepository,getSomeDepositoryByDtype } from "./mutation-types";
export default {
  data(){
    return{
      keyName:"产品入库", 
      flag:"add",
      tableData:[],
      loading:false,
      simplename:"",
      type:"",
      countRu:"入库",
    }
  },
  components:{
    KuCun
  },
  methods:{
    ...mapActions({
      getOneDepository,
      getSomeDepositoryByDtype,
    }),
    //根据编号或者检索码查询
    async getDepository(msg){
      let result = await this.getOneDepository({
        msg:msg,
      });
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
    },
    //根据类别查询
    async getDepositoryDtype(d_type){
      let result = await this.getSomeDepositoryByDtype({
        d_type:d_type,
      });
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
    },
    //检索码改变
    nameChange(val){
      this.simplename = val;
      this.tableData = [];
      this.getDepository(val);
    },
    //类型改变
    typeChange(val){
      this.type = val;
      this.tableData = [];
      this.getDepositoryDtype(val);
    },
    //删除待操作数据
    deleteData(val){
      for (let i = 0; i < this.tableData.length; i++) {
        if (val == this.tableData[i]) {
          this.tableData.splice(i, 1);
        }
      }
    }
  },
  created(){
    this.getDepositoryDtype(this.type);
  }
}
</script>

