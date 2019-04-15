<template>
    <div>
        <el-table :data="tableData" border max-height="600">
            <el-table-column prop="xh" label="序号" align="center"></el-table-column>
            <el-table-column prop="cth" label="餐台号"  align="center"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称"  align="center"></el-table-column>
            <el-table-column prop="num" label="数量" align="center"></el-table-column>
            <el-table-column prop="dj" label="单价" align="center"></el-table-column>
            <el-table-column prop="money" label="金额" align="center"></el-table-column>
            <el-table-column prop="time" label="登记时间" align="center"></el-table-column>
            <el-table-column prop="jzr" label="记账人" align="center"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:"pay-table",
    data(){
        return{

        }
    },
    props:{
        tableData:null,
    }
}
</script>

