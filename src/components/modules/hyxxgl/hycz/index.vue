<template>
  <div>
    <span style="color:#fff">会员充值</span>
    <br>
    <span style="color:#fff">客户卡号</span>
    <el-input style="width:150px"></el-input>
    <span style="color:#fff">联系电话</span>
    <el-input style="width:150px"></el-input>
    <br>
    <span style="color:#fff">充值总金额</span>
    <el-input style="width:250px"></el-input>
    <span style="color:#fff">余额</span>
    <el-input style="width:250px"></el-input>
    <br>
    <span style="color:#fff">收现</span>
    <el-input style="width:50px"></el-input>
    <span style="color:#fff">可消费金额</span>
    <el-input style="width:50px"></el-input>
    <br>
    <span style="color:#fff">客户姓名</span>
    <el-input style="width:250px"></el-input>
    <br>
    <el-button type="info" plain @click="addXK">充值</el-button>
    <el-button type="info" plain @click="backKT">返回</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods:{
    backKT(){
      this.$router.push({path:'kt'});     
    }
  }
};
</script>
