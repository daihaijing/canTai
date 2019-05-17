<template>
    <div>
        <el-menu class="el-menu-demo titleMenu" :default-active="activeIndex" router   mode="horizontal" @select="handleSelect">
          <el-menu-item index="kt" :disabled="isUser">开台</el-menu-item>
          <el-menu-item index="ctyd" :disabled="isUser">餐台预定</el-menu-item>
          <el-menu-item index="qtsy" :disabled="isUser">前台收银</el-menu-item>
          <el-menu-item index="cprk" :disabled="isUser">商品入库</el-menu-item>
          <el-menu-item index="ctsz" :disabled="isUser">餐台设置</el-menu-item>
          <!-- <el-menu-item index="tcsz" :disabled="isUser">套餐设置</el-menu-item> -->
          <el-menu-item index="zdcx" :disabled="isUser">账单查询</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
// import bus from "@/bus.js"
export default {
     data() {
      return {
        activeIndex:'',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
    props:{
      isUser:null
    },
    mounted(){
      if(this.$route){
            this.activeIndex= this.$route.name;
      }
    },
    watch:{
      $route(){
           if(this.$route){
             this.activeIndex = this.$route.name;
           }
      },
    }
}
</script>

