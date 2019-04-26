<template>
    <div>
        <el-table :data="tableData" border max-height="650" class="canTaiTable">
            <el-table-column prop="t_number" label="餐台号" fixed="left" align="center"></el-table-column>
            <el-table-column prop="t_name" label="名称"  align="center"></el-table-column>
            <el-table-column prop="t_state" label="状态"  align="center"></el-table-column>
            <el-table-column prop="t_type" label="餐台类型"  align="center"></el-table-column>
            <el-table-column prop="t_people" label="额定人数"  align="center"></el-table-column>
            <el-table-column prop="money" label="是否消费"  align="center"></el-table-column>
            <el-table-column prop="hmoney" label="每小时包厢费"  align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="modifyData(scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:"all-res",
    data(){
        return{

        }
    },
    props:{
        tableData:null
    },
    methods:{
        modifyData(val){
            this.$emit("modifyData",val);
        },
        deleteData(val){
            this.$emit("deleteData",val);
        }
    }
}
</script>

<style>

</style>
