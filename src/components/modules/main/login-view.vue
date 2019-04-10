<template>
    <el-dialog :visible.sync="isLogin" @close="loginEmit">
        <div>
            <span>用户名：</span>
            <el-input require v-model="userName"></el-input>
            <span>密码：</span>
            <el-input require type="password" v-model="password"></el-input>
            <el-button @click="login">登录</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Crypto from "@/Crypto"
export default {
    name:"login-view",
    data(){
       return{
           userName:"",
           password:""
       } 
    },
    props:{
        isLogin:null,
    },
    methods:{
        loginEmit(){
            this.$emit('loginEmit');
        },
        login(){
            var user = {};
            user.userName = this.userName;
            user.password = escape(Crypto.set(this.password));
            localStorage.setItem("user",JSON.stringify(user));
            this.isLogin = false;
            location.reload();
        }
    }
}
</script>

