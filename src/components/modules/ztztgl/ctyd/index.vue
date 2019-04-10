<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">餐台预定</span>
    </div>
    <div :class="style.content">
      <span :class="style.txtView">预定餐台号:</span>
      <el-select v-model="value1" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <br>
      <span :class="style.txtView">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数:</span>
      <el-input :class="style.ydInputView"></el-input>
      <br>
      <span :class="style.txtView">登&nbsp;记&nbsp;时&nbsp;间:</span>
      <div class="block" style="display:inline">
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
          style="width:201px"
        ></el-date-picker>
      </div>
      <el-time-picker
        v-model="value3"
        :picker-options="{
            selectableRange: '00:00:00 - 23:59:59'
          }"
        placeholder="选择时间"
      ></el-time-picker>
      <br>
      <span :class="style.txtView">预&nbsp;定&nbsp;餐&nbsp;次:</span>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <br>
      <span :class="style.txtView">联&nbsp;系&nbsp;方&nbsp;式:</span>
      <el-input :class="style.ydInputView"></el-input>
      <br>
      <span :class="style.txtView">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</span>
      <el-input :class="style.ydInputView"></el-input>
      <br>
      <el-button type="info" plain @click="addYD">预定</el-button>
      <el-button type="info" plain @click="backKT">返回</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import style from "css/kaitai.css";
import bus from "@/bus.js";
import options from "@/data/number"
export default {
  data() {
    return {
      style,
      //桌号选择
      options,
      value1: "",
      //日期选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value2: "",
      value3: new Date().toLocaleTimeString,
      //餐次选择
      options2: [
        {
          value: "选项1",
          label: "早餐"
        },
        {
          value: "选项2",
          label: "午餐"
        },
        {
          value: "选项3",
          label: "晚餐"
        }
      ],
      value4: ""
    };
  },
  methods: {
    addYD() {
      this.$notify({
        title: "OK！",
        message: "预定成功",
        type: "success"
      });
      this.$router.push({
        name:'kt'
      });
      setTimeout(()=>{
        bus.$emit("yu",this.value1);
      },500);
    },
    backKT() {
      this.$router.push({ path: "kt" });
    }
  }
};
</script>


