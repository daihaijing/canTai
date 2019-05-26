<template>
    <div>
        <el-table :data="tableData" stripe border>
            <el-table-column prop="mm_type" label="菜品类别"  align="center"></el-table-column>
            <el-table-column prop="mm_name" label="菜品名称"  align="center"></el-table-column>
            <el-table-column prop="mm_count" label="销售数量"  align="center"></el-table-column>
            <el-table-column prop="mm_money" label="销售金额"  align="center"></el-table-column>
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

<style>

</style>
