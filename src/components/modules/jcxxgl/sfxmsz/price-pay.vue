<template>
    <div>
        <el-table :data="shouFeiData" class="shouFeiTable" border>
            <el-table-column prop="xmmc" label="项目名称" fixed="left" align="center"></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" align="center"></el-table-column>
            <el-table-column prop="xmbm" label="项目编码" align="center"></el-table-column>
            <el-table-column prop="dl" label="大类" align="center"></el-table-column>
            <el-table-column prop="xl" label="小类" align="center"></el-table-column>
            <el-table-column prop="dw" label="单位" align="center"></el-table-column>
            <el-table-column prop="cbdj" label="成本单价" align="center"></el-table-column>
            <el-table-column prop="xsdj" label="销售单价" align="center"></el-table-column>
            <el-table-column prop="sfcykc" label="是否参与库存" align="center" min-width="130"></el-table-column>
            <el-table-column prop="sfcyjf" label="是否参与积分" align="center" min-width="130"></el-table-column>
            <el-table-column prop="sfcyzk" label="是否参与折扣" align="center" min-width="130"></el-table-column>
            <el-table-column prop="ygtc" label="员工提成" align="center"></el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
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

