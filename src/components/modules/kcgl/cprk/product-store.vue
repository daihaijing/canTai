<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column prop="jsm" label="检索码"  align="center"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称"  align="center"></el-table-column>
            <el-table-column prop="dw" label="单位"  align="center"></el-table-column>
            <el-table-column prop="cplb" label="产品类别"  align="center"></el-table-column>
            <el-table-column prop="jhdj" label="进货单价"  align="center"></el-table-column>
            <el-table-column prop="rksl" label="入库数量"  align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:"product-store",
    data(){
        return{

        }
    },
    props:{
        tableData:null
    }
}
</script>

