<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">产品出库</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">查询条件：</span>
      <br>

      <span :class="style.txtView">会员卡号：</span>
      <el-input :class="style.inputView"></el-input>
      <br>

      <span :class="style.txtView">会员密码：</span>
      <el-input :class="style.inputView"></el-input>
      <el-button type="info" plain>查询</el-button>
      <br>

      <span :class="style.txtView">会员信息：</span>
      <br>
      <span :class="style.txtView">会员名称：</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <span :class="style.txtView">联系电话</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <span :class="style.txtView">联系地址</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <span :class="style.txtView">可兑换积分</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <span :class="style.txtView">准备兑换积分</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <span :class="style.txtView">备注：</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <el-button type="info" plain>兑换</el-button>
      <el-button type="info" plain>返回</el-button>
    </div>
  </div>
</template>

<script>
import style from "css/kcgl.css";
export default {
  data() {
    return {
      style
    };
  }
};
</script>



