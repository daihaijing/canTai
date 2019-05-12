<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">餐台预定</span>
    </div>
    <div :class="style.content">
      <div :class="style.form">  
        <el-form :model="dynamicValidateForm" status-icon ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" :rules="rules">
            <el-form-item prop="rt_number" label="预定餐台号:">
              <el-select v-model="dynamicValidateForm.rt_number" clearable placeholder="请选择" class="inputCtyd">
                <el-option v-for="item in tableDatas" :key="item.t_number" :label="item.t_name" :value="item.t_number"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="r_people" label="人数:">
                <el-input :class="style.ydInputView" class="inputCtyd" v-model.number="dynamicValidateForm.r_people"></el-input>
            </el-form-item>
            <el-form-item label="登记时间:" required>
              <span>{{nowTime}}</span>
              <!-- <el-col style="width:205px;">
                <el-form-item prop="value3">
                  <el-date-picker style="width:205px;height:38px;line-height:38px;" v-model="dynamicValidateForm.value3" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" style="width:50px;text-align:center;">-</el-col>
              <el-col style="width:205px;">
                <el-form-item prop="value4">
                  <el-time-picker style="width:205px;height:38px;line-height:38px;" v-model="dynamicValidateForm.value4" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="选择时间"></el-time-picker>
                </el-form-item>
              </el-col> -->
            </el-form-item>
            <el-form-item prop="r_order" label="预定餐次:">
              <el-select v-model="dynamicValidateForm.r_order" clearable placeholder="请选择" class="inputCtyd">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="r_phone" label="联系方式:">
              <el-input v-model="dynamicValidateForm.r_phone"  :class="style.ydInputView" class="inputCtyd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="r_remark" label="备注:">
              <el-input v-model="dynamicValidateForm.r_remark" :class="style.ydInputView" class="inputCtyd"></el-input>
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
import Vue from 'vue';
import style from "css/kaitai.css";
import bus from "@/bus.js";
import { mapActions } from 'vuex';
import { getAllTable,addOneReserve } from './mutation-types';
export default {
  data() {
    let validatePass = (rule, value, callback) =>{
      let re = /^[0-9]*$/;
      if(value == ''){
          callback(new Error('请输入联系方式'))
      }else{
          if(value.length<11||value.length>11){
              callback(new Error('长度为11位'))
          }else if(!re.test(value))
          {
              callback(new Error('只能含有数字'))
          }else{
              callback();
          }
      }
    }
    return {
      style,
      nowTime: "",
      //桌号选择
      tableDatas:[],
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
      //餐次选择
      options2: [
        {
          value: "1",
          label: "早餐"
        },
        {
          value: "2",
          label: "午餐"
        },
        {
          value: "3",
          label: "晚餐"
        }
      ],
      //表单参数
      dynamicValidateForm:{
          rt_number:"",
          r_people:"",
          r_order:"",
          r_people:"",
          r_remark:"",
      },
      rules:{
          value1:[
              {required: true, message: '请选择餐台号',trigger:'change'},
          ],
          value2:[
              // {required: true, message: '请输入人数',trigger:'blur'},
              // {type: 'number', message: '人数必须为数字值',trigger:'blur'}
          ],
          value3: [
            // { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          value4: [
            // { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          value5: [
            { required: true, message: '请选择餐次', trigger: 'change' }
          ],
          value6:[
            // {validator: validatePass, trigger: 'blur' }
          ]
      }
    };
  },
  methods: {
    addYD(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.addReserve(
            this.dynamicValidateForm.rt_number,
            this.dynamicValidateForm.r_people,
            this.dynamicValidateForm.r_order,
            this.dynamicValidateForm.r_phone,
            this.dynamicValidateForm.r_remark
          );
          this.$notify({
            title: "OK！",
            message: "预定成功",
            type: "success"
          });
          this.$router.push({
            name:'kt'
          });
          setTimeout(()=>{
            bus.$emit("yuding",this.dynamicValidateForm.rt_number);
          },1000)

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
      addOneReserve,
    }),
    //获取所有餐台
    async getTable(){
      let result = await this.getAllTable();
      if(!result) return;
      let data = JSON.parse(result);
      this.tableDatas = data;
      //console.log(this.tableDatas);
    },
    //添加预定
    async addReserve(rt_number,r_people,r_order,r_phone,r_remark){
      let result = await this.addOneReserve({
        rt_number:rt_number,
        r_people:r_people,
        r_order:r_order,
        r_phone:r_phone,
        r_remark:r_remark,
      });
      if(result == 1) return;
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
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime =
        year + "年" + month + "月" + date + "日" + "     " + hh + ":" + mm + ":" + ss;
      // console.log(this.nowTime);
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    },
  },
  created(){
    //获取时间
    this.nowTimes();

    this.getTable();
  }
};
</script>


