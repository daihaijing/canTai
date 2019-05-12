<template>
    <el-dialog :visible.sync="isLogin" @close="loginEmit" class="loginDiv">
        <el-form :model="dynamicValidateForm" status-icon ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" :rules="rules" style="width: 353px;">
            <div style="text-align:center;margin-bottom:17px;font-size:20px;color:rgb(255, 208, 75);">登录</div>
            <el-form-item prop="userName" label="用户名">
                <el-input class="loginInput" v-model="dynamicValidateForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="passWord" label="密码">
                <el-input class="loginInput" type="password" v-model="dynamicValidateForm.passWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="upUser('dynamicValidateForm')" class="loginButton">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
//import utils from "@/util/utils"
import Crypto from "@/Crypto"
import { mapActions } from "vuex";
import {getLogin} from "./mutation-types";
export default {
    //name:'login',
    data(){
        // return{
        //     loginData:{
        //         username:"",
        //         password:"",
        //     }
        // }
        let validatePass = (rule, value, callback) =>{
            if(value == ''){
                callback(new Error('请输入密码'))
            }else{
                if(value.length<6||value.length>10){
                    callback(new Error('密码长度为6-10位'))
                }else if(!/^[A-Za-z0-9]+$/.test(value))
                {
                    callback(new Error('只能含有数字或字母，不能包含特殊字符'))
                }else{
                    callback();
                }
            }
        }
        return{
            dynamicValidateForm:{
                userName:"",
                passWord:""
            },
            rules:{
                userName:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:2,max:4,message:'长度在2-4位字符',trigger:'blur'}
                ],
                passWord:[
                    {validator: validatePass, trigger: 'blur' }
                ]
            }
        }
    },
     ...mapActions({
      getLogin,
    }),
    props:{
        isLogin:null
    },
    methods:{
        // doLogin(){
        //     let success = (response) => {
        //         alert(response.data.msg);
        //     }
        //     utils.axiosMethod({
        //         method:"POST",
        //         url:"/user/login",
        //         data:this.loginData,
        //         callback:success,
        //     })
        //     this.isLogin = false;
        // },
        loginEmit(){
            this.$emit("loginEmit");
        },
        async loginEmitData(){
            let result = await this.getLogin({
                userName:this.dynamicValidateForm.userName,
                passWord:this.dynamicValidateForm.passWord,
            })
            if(!result) return;
            let data = result;
            // let data = '前台';
            var user = {};
            user.userName = this.dynamicValidateForm.userName;
            user.passWord = escape(Crypto.set(this.dynamicValidateForm.passWord));
            user.time = Date.parse(new Date()) + 2592000000;
            user.status = data;
            localStorage.setItem("user",JSON.stringify(user));
            this.isLogin = false;
            location.reload();
        },
        upUser(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.loginEmitData();
                } else {
                    return false;
                }
            });
        } 
    },
    mounted(){
        
    }
}
</script>

<style>

</style>

