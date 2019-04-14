<template>
  <div>
    <div :class="style.title">
      <span :class="style.txtView">餐台预定</span>
    </div>
    <div :class="style.content">
      <div :class="style.form">  
        <el-form :model="dynamicValidateForm" status-icon ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" :rules="rules">
            <el-form-item prop="value1" label="预定餐台号:">
              <el-select v-model="dynamicValidateForm.value1" clearable placeholder="请选择" class="inputCtyd">
                <el-option v-for="item in options" :key="item.cth" :label="item.name" :value="item.cth"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="value2" label="人数:">
                <el-input :class="style.ydInputView" class="inputCtyd" v-model.number="dynamicValidateForm.value2"></el-input>
            </el-form-item>
            <el-form-item label="登记时间:" required>
              <el-col style="width:205px;">
                <el-form-item prop="value3">
                  <el-date-picker style="width:205px;height:38px;line-height:38px;" v-model="dynamicValidateForm.value3" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" style="width:50px;text-align:center;">-</el-col>
              <el-col style="width:205px;">
                <el-form-item prop="value4">
                  <el-time-picker style="width:205px;height:38px;line-height:38px;" v-model="dynamicValidateForm.value4" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="选择时间"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item prop="value5" label="预定餐次:">
              <el-select v-model="dynamicValidateForm.value5" clearable placeholder="请选择" class="inputCtyd">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="value6" label="联系方式:">
              <el-input v-model="dynamicValidateForm.value6"  :class="style.ydInputView" class="inputCtyd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="value7" label="备注:">
              <el-input v-model="dynamicValidateForm.value7" :class="style.ydInputView" class="inputCtyd"></el-input>
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
import options from "@/data/number"
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
      //桌号选择
      options,
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
          value1:"",
          value2:"",
          value3:"",
          value4:"",
          value5:"",
          value6:"",
          value7:"",
      },
      rules:{
          value1:[
              {required: true, message: '请选择餐台号',trigger:'change'},
          ],
          value2:[
              {required: true, message: '请输入人数',trigger:'blur'},
              {type: 'number', message: '人数必须为数字值',trigger:'blur'}
          ],
          value3: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          value4: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          value5: [
            { required: true, message: '请选择餐次', trigger: 'change' }
          ],
          value6:[
            {validator: validatePass, trigger: 'blur' }
          ]
      }
    };
  },
  methods: {
    addYD(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$notify({
            title: "OK！",
            message: "预定成功",
            type: "success"
          });
          this.$router.push({
            name:'kt'
          });
          setTimeout(()=>{
            bus.$emit("yuding",this.dynamicValidateForm.value1);
          },1000)
        } else {
          return false;
        }
      });
    },
    backKT() {
      this.$router.push({ path: "kt" });
    }
  }
};
</script>


