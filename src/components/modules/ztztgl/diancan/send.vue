<template>
    <div>
        <el-table class="dcTable2" :data="dcData" border height="500">
            <el-table-column prop="name" label="项目名称" fixed="left" align="center"></el-table-column>
            <el-table-column prop="num" label="项目编号" align="center"></el-table-column>
            <el-table-column prop="code" label="项目编码" align="center"></el-table-column>
            <el-table-column prop="dw" label="单位" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center"></el-table-column>
            <el-table-column prop="price" label="单价" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:"send",
    data(){
        return{

        }
    },
    props:{
        dcData:null,
    }
}
</script>


