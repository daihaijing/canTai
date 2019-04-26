<template>
  <kuCun :keyName="keyName" :flag="flag" :tableData="tableData" :loading="loading" @typeChange="typeChange" 
  @nameChange="nameChange" @deleteData="deleteData"></kuCun>
</template>

<script>
import KuCun from "#mod/kcgl/kuCun.vue"
import { mapActions } from "vuex";
import { getCprkData } from "./mutation-types";
export default {
  data(){
    return{
      keyName:"产品入库", 
      flag:"add",
      tableData:[],
      loading:false,
      simplename:"",
      type:"",
    }
  },
  components:{
    KuCun
  },
  metoods:{
    ...mapActions({
      getCprkData
    }),
    async getData() {
      this.loading = true;
      let result = await this.getCprkData({
        d_simplename:this.simplename,
        d_type:this.type,
      });
      if (!result) return;
      let data = JSON.parse(result);
      this.tableData = data;
      this.loading = false;
    },
    //检索码改变
    nameChange(val){
      this.simplename = val;
      this.tableData = [];
      this.getData();
    },
    //类型改变
    typeChange(val){
      this.type = val;
      this.tableData = [];
      this.getData();
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
    this.getData();

  }
}
</script>

