<template>
  <kuCun :keyName="keyName" :flag="flag"></kuCun>
</template>

<script>
import KuCun from "#mod/kcgl/kuCun.vue"
export default {
  data(){
    return{
      keyName:"产品出库",
      flag:"del",
    }
  },
  components:{
    KuCun
  }
}
</script>

