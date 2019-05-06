<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">积分兑换</span>
    </div>
    <div :class="style.content">
      
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
