<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">积分兑换</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">会员卡号</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <span :class="style.txtView">会员密码</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <span :class="style.txtView">会员名称</span>
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
      <span :class="style.txtView">备注</span>
      <el-input :class="style.inputView"></el-input>
      <br>
      <el-button type="info" plain @click="exchange">兑换</el-button>
      <el-button type="info" plain @click="backKT">返回</el-button>
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
export default {
  data() {
    return {
      style,
    };
  },
  methods: {
    backKT() {
      this.$router.push({ path: "kt" });
    }
  }
};
</script>
