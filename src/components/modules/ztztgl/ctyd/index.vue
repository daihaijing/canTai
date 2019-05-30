<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">餐台预定</span>
    </div>
    <div :class="style.content">
      <div :class="style.form">
        <el-form
          :model="dynamicValidateForm"
          status-icon
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
          :rules="rules"
        >
          <el-form-item prop="rt_number" label="预定餐台号:">
            <el-select
              v-model="dynamicValidateForm.rt_number"
              clearable
              placeholder="请选择"
              class="inputCtyd"
            >
              <el-option
                v-for="item in tableDatas"
                :key="item.t_number"
                :label="item.t_name"
                :value="item.t_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="r_people" label="人数:">
            <el-input
              :class="style.ydInputView"
              class="inputCtyd"
              v-model.number="dynamicValidateForm.r_people"
              placeholder="此项可不填"
            ></el-input>
          </el-form-item>
          <el-form-item prop="r_time" label="预定时间:">
            <el-select
              v-model="dynamicValidateForm.r_time"
              clearable
              placeholder="请选择"
              class="inputCtyd"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="r_order" label="预定餐次:">
            <el-select
              v-model="dynamicValidateForm.r_order"
              clearable
              placeholder="请选择"
              class="inputCtyd"
              @change="timeChange"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="r_phone" label="联系方式:">
            <el-input
              v-model="dynamicValidateForm.r_phone"
              :class="style.ydInputView"
              class="inputCtyd"
            ></el-input>
          </el-form-item>
          <el-form-item prop="r_remark" label="备注:">
            <el-input
              v-model="dynamicValidateForm.r_remark"
              :class="style.ydInputView"
              class="inputCtyd"
              placeholder="此项可不填"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" plain @click="addYD('dynamicValidateForm')">预定</el-button>
            <el-button type="info" plain @click="backKT">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import style from "css/kaitai.css";
import bus from "@/bus.js";
//import {formatDate} from '#com/date.js';
import { mapActions } from "vuex";
import { getAllTable, addOneReserve } from "./mutation-types";
export default {
  data() {
    var validatePass_r_phone = (rule, value, callback) => {
      let re = /^[0-9]*$/;
      if (value == "") {
        callback(new Error("请输入联系方式"));
      } else {
        if (value.length < 11 || value.length > 11) {
          callback(new Error("长度为11位"));
        } else if (!re.test(value)) {
          callback(new Error("只能含有数字"));
        } else if (value.substring(0) != 1){
          callback(new Error("号码格式错误"));
        }else {
          callback();
        }
      }
    };
    return {
      nowTime: "",
      style,
      //桌号选择
      tableDatas: [],
      //日期选择
      options: [
        {
          value: "",
          label: "今天"
        },
        {
          value: "",
          label: "明天"
        },
        {
          value: "",
          label: "后天"
        }
      ],
      //餐次选择
      options2: [
        {
          value: "11:00:00",
          label: "午餐"
        },
        {
          value: "17:00:00",
          label: "晚餐"
        }
      ],
      //预定日期选择
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() ||
            time.getTime() > Date.now() + 3600 * 1000 * 24 * 7
          );
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "后天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      //表单参数
      dynamicValidateForm: {
        rt_number: "",
        r_people: "",
        r_time: "",
        r_order: "",
        r_phone: "",
        r_remark: ""
      },
      rules: {
        r_phone: [{ validator: validatePass_r_phone, trigger: "blur" }]
      }
    };
  },
  methods: {
    //选择预定日期
    timeChange() {
      //console.log(this.dynamicValidateForm.r_time + " " +this.dynamicValidateForm.r_order);
    },
    addYD(formName) {
      //获取预定的餐次信息
      let order = "";
      for (let i = 0; i < this.options2.length; i++) {
        if (this.dynamicValidateForm.r_order == this.options2[i].value) {
          order = this.options2[i].label;
        }
      }
      //随机生成8位数字，作为预订编号
      let r_number = "";
      for (let i = 0; i < 8; i++) {
        r_number += Math.floor(Math.random() * 10);
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addReserve(
            r_number,
            this.dynamicValidateForm.rt_number,
            this.dynamicValidateForm.r_people,
            this.dynamicValidateForm.r_time +
              " " +
              this.dynamicValidateForm.r_order,
            order,
            this.dynamicValidateForm.r_phone,
            this.dynamicValidateForm.r_remark
          );
          this.$notify({
            title: "OK！",
            message: "预定成功",
            type: "success"
          });
          if (this.dynamicValidateForm.r_time == this.nowTime) {
            setTimeout(() => {
              bus.$emit("yuding", this.dynamicValidateForm.rt_number);
            }, 1000);
          }
          this.$router.push({
            name: "kt"
          });
        } else {
          return false;
        }
      });
    },
    backKT() {
      this.$router.push({ path: "kt" });
    },
    //异步通信
    ...mapActions({
      getAllTable,
      addOneReserve
    }),
    //获取所有餐台
    async getTable() {
      let result = await this.getAllTable();
      if (!result) return;
      let data = JSON.parse(result);
      this.tableDatas = data;
    },
    //添加预定
    async addReserve(
      r_number,
      rt_number,
      r_people,
      r_time,
      r_order,
      r_phone,
      r_remark
    ) {
      let result = await this.addOneReserve({
        r_number: r_number,
        rt_number: rt_number,
        r_people: r_people,
        r_time: r_time,
        r_order: r_order,
        r_phone: r_phone,
        r_remark: r_remark
      });
      if (result == 1) return;
    },
    // 获取当前时间函数
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let date1 =
        new Date(timeStamp).getDate() < 10
          ? "0" + (new Date(timeStamp).getDate() + 1)
          : new Date(timeStamp).getDate() + 1;
      let date2 =
        new Date(timeStamp).getDate() < 10
          ? "0" + (new Date(timeStamp).getDate() + 2)
          : new Date(timeStamp).getDate() + 2;
      this.options[0].value = year + "-" + month + "-" + date;
      this.options[1].value = year + "-" + month + "-" + date1;
      this.options[2].value = year + "-" + month + "-" + date2;
      this.nowTime = year + "-" + month + "-" + date;
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    }
  },
  created() {
    this.nowTimes();
    this.getTable();
  }
};
</script>


