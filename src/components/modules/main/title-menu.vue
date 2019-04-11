<template>
    <div>
        <el-menu class="el-menu-demo titleMenu" :default-active="activeIndex" router   mode="horizontal" @select="handleSelect">
          <el-menu-item index="kt">开台</el-menu-item>
          <el-menu-item index="ctyd">餐台预定</el-menu-item>
          <el-menu-item index="qtsy">前台收银</el-menu-item>
          <el-menu-item index="cprk">入库</el-menu-item>
          <el-menu-item index="ctsz">餐台设置</el-menu-item>
          <el-menu-item index="zdcx">账单查询</el-menu-item>
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
    mounted(){
      let a = window.location.href;
      if(a.indexOf('kt')!=-1){
        this.activeIndex = 'kt';
      }else if(a.indexOf('ctyd')!=-1){
        this.activeIndex = 'ctyd';
      }else if(a.indexOf('qtsy')!=-1){
        this.activeIndex = 'qtsy';
      }else if(a.indexOf('cprk')!=-1){
        this.activeIndex = 'cprk';
      }else if(a.indexOf('ctsz')!=-1){
        this.activeIndex = 'ctsz';
      }else if(a.indexOf('zdcx')!=-1){
        this.activeIndex = 'zdcx';
      }
    },
    watch:{
      '$route'(){
        let a = window.location.href;
        if(a.indexOf('kt')!=-1){
          this.activeIndex = 'kt';
        }else if(a.indexOf('ctyd')!=-1){
          this.activeIndex = 'ctyd';
        }else if(a.indexOf('qtsy')!=-1){
          this.activeIndex = 'qtsy';
        }else if(a.indexOf('cprk')!=-1){
          this.activeIndex = 'cprk';
        }else if(a.indexOf('ctsz')!=-1){
          this.activeIndex = 'ctsz';
        }else if(a.indexOf('zdcx')!=-1){
          this.activeIndex = 'zdcx';
        }
      }
    }
}
</script>

<style>

</style>
