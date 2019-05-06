<template>
    <div>
        <el-table :data="shouFeiData" class="shouFeiTable" border>
            <el-table-column prop="m_name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="m_number" label="项目编号" align="center"></el-table-column>
            <el-table-column prop="m_simplename" label="项目编码" align="center"></el-table-column>
            <el-table-column prop="ms_name" label="项目类别" align="center"></el-table-column>
            <el-table-column prop="m_picture" label="项目图标" align="center"></el-table-column>
            <el-table-column prop="m_unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="m_price" label="单价" align="center"></el-table-column>
            <el-table-column prop="m_state" label="项目状态" align="center"></el-table-column>
            <el-table-column prop="m_time" label="添加时间" align="center"></el-table-column>
            <el-table-column prop="m_remark" label="项目备注" align="center"></el-table-column>
            <el-table-column label="操作" width="90" fixed="right">
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
    data(){
        return{

        }
    },
    props:{
        shouFeiData:null,
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

