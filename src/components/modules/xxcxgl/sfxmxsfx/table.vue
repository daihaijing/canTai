<template>
    <div>
        <el-table :data="tableData" stripe border>
            <el-table-column prop="d_type" label="菜品类别"  align="center"></el-table-column>
            <el-table-column prop="d_name" label="菜品名称"  align="center"></el-table-column>
            <el-table-column prop="d_num" label="销售数量"  align="center"></el-table-column>
            <el-table-column prop="d_price" label="销售金额"  align="center"></el-table-column>
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
