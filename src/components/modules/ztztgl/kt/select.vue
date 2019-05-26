<template>
    <div>
        <el-table :data="tableData" border max-height="300">
            <el-table-column prop="r_number" label="预定编号"  align="center"></el-table-column>
            <el-table-column prop="rt_number" label="预定餐台号"  align="center"></el-table-column>
            <el-table-column prop="r_people" label="人数"  align="center"></el-table-column>
            <el-table-column prop="r_time" label="预定时间"  align="center"></el-table-column>
            <el-table-column prop="r_order" label="预定餐次"  align="center"></el-table-column>
            <el-table-column prop="r_phone" label="联系方式"  align="center"></el-table-column>
            <el-table-column prop="r_remark" label="备注"  align="center"></el-table-column>
            <el-table-column prop="r_rtime" label="登记时间"  align="center"></el-table-column>
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
