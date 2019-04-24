<template>
  <kuCun :keyName="keyName" :flag="flag"></kuCun>
</template>

<script>
import KuCun from "#mod/kcgl/kuCun.vue"
export default {
  data(){
    return{
      keyName:"产品入库", 
      flag:"add",
    }
  },
  components:{
    KuCun
  }
}
</script>

