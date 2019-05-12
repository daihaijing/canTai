<template>
  <div>
    <el-table class="dcTable2" :data="dcData" border height="500">
      <el-table-column prop="m_name" label="项目名称" fixed="left" align="center"></el-table-column>
      <el-table-column prop="m_number" label="项目编号" align="center"></el-table-column>
      <el-table-column prop="m_simplename" label="项目编码" align="center"></el-table-column>
      <el-table-column prop="m_unit" label="单位" align="center"></el-table-column>
      <el-table-column prop="m_count" label="数量" align="center"></el-table-column>
      <el-table-column prop="m_price" label="单价" align="center"></el-table-column>
      <el-table-column prop="m_taste" label="口味" align="center">
      </el-table-column>
    </el-table>
    <div :class="style.sendDiv">
      <el-button type="info" plain @click="submitOrder" :class="style.send" :disabled="sendAble" >发送</el-button>
    </div>
  </div>
</template>

<script>
import style from "css/kaitai.css";
export default {
  name: "send",
  data() {
    return {
        style,
        sendAble: true //发送按钮是否可以点击
    };
  },
  props: {
    dcData: null
  },
  methods: {
    submitOrder() {
      this.$emit("submitOrder");
    },
  },
  mounted() {
    if (this.dcData.length > 0) {
      this.sendAble = false;
    }
  },
  watch: {
    dcData() {
      if (this.dcData.length > 0) {
        this.sendAble = false;
      } else if (this.dcData.length == 0) {
        this.sendAble = true;
      }
    }
  }
};
</script>


