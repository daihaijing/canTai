<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column prop="num" label="项目编号" align="center"></el-table-column>
            <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="code" label="项目编码" align="center"></el-table-column>
            <el-table-column prop="dw" label="单位" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center"></el-table-column>
            <el-table-column prop="price" label="单价" align="center"></el-table-column>
            <el-table-column prop="money" label="消费金额" align="center"></el-table-column>
            <el-table-column prop="sfdz" label="是否打折" align="center"></el-table-column>
            <el-table-column prop="kwsm" label="口味说明" align="center"></el-table-column>
            <el-table-column prop="time" label="添加时间" align="center"></el-table-column>
        </el-table>
        <el-button type="info" plain @click="payment" class="xfBtn" :disabled="allPayAble">结算</el-button>
    </div>
</template>

<script>
export default {
    name:"xfqd-table",
    data(){
        return{

        }
    },
    props:{
        tableData:null,
        allPayAble:null
    },
    methods:{
        payment(){
            this.$emit("payment");
        }
    },
    mounted(){

    }
}
</script>
