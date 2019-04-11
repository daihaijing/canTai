<template>
    <el-dialog :visible.sync="isLogin" @close="loginEmit" class="loginDiv">
        <el-form :model="dynamicValidateForm" status-icon ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" :rules="rules" style="width:700px;margin:0 auto;margin-top:20px;padding-left: 92px;">
            <el-form-item prop="userName" label="用户名">
                <el-input class="loginInput" v-model="dynamicValidateForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="passWord" label="密码">
                <el-input class="loginInput" type="password" v-model="dynamicValidateForm.passWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="upUser('dynamicValidateForm')" class="loginButton">登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import Crypto from "@/Crypto"
export default {
    data(){
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
    props:{
        isLogin:null
    },
    methods:{
        loginEmit(){
            this.$emit("loginEmit");
        },
        upUser(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$notify({
                        title: '成功',
                        message: '登录成功'
                    });
                    var user = {};
                    user.userName = this.dynamicValidateForm.userName;
                    user.password = escape(Crypto.set(this.dynamicValidateForm.password));
                    localStorage.setItem("user",JSON.stringify(user));
                    this.isLogin = false;
                    location.reload();
                } else {
                    return false;
                }
            });
        } 
    }
}
</script>

<style>

</style>

