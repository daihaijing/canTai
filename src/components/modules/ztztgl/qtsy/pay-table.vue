<template>
    <div>
        <el-table :data="tableData" border max-height="600" class="canTaiTable">
            <el-table-column prop="bm_name" label="菜品名称" align="center"></el-table-column>
            <el-table-column prop="bm_unit" label="菜品单位"  align="center"></el-table-column>
            <el-table-column prop="bm_price" label="菜品单价"  align="center"></el-table-column>
            <el-table-column prop="bm_count" label="数量" align="center"></el-table-column>
            <el-table-column prop="bm_money" label="金额" align="center"></el-table-column>
        </el-table>
        <span>总共消费：{{money}}</span>
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
        money:null,
    }
}
</script>

