<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column prop="cth" label="餐台号" align="center"></el-table-column>
            <el-table-column prop="jcsj" label="就餐时间" align="center"></el-table-column>
            <el-table-column prop="jzsj" label="结账时间" align="center"></el-table-column>
            <el-table-column prop="zje" label="总金额" align="center"></el-table-column>
            <el-table-column prop="btje" label="吧台金额" align="center"></el-table-column>
            <el-table-column prop="cbje" label="厨部金额" align="center"></el-table-column>
            <el-table-column prop="qtje" label="其他金额" align="center"></el-table-column>
            <el-table-column prop="rs" label="人数" align="center"></el-table-column>
            <el-table-column prop="fpje" label="发票金额" align="center"></el-table-column>
            <el-table-column prop="jzdh" label="结帐单号" align="center"></el-table-column>
            <el-table-column prop="jzfs" label="结账方式" align="center"></el-table-column>
            <el-table-column prop="zqje" label="赠券金额" align="center"></el-table-column>
            <el-table-column prop="qtyhje" label="其他优惠金额" align="center"></el-table-column>
            <el-table-column prop="sgdh" label="手工单号" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        tableData:null,
    }
}
</script>
