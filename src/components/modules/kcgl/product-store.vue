<template>
    <div>
        <el-table :data="tableData" border >
            <el-table-column prop="d_number" label="项目编号"  align="center"></el-table-column>
            <el-table-column prop="d_name" label="项目名称"  align="center"></el-table-column>
            <el-table-column prop="d_simplename" label="检索码"  align="center"></el-table-column>
            <el-table-column prop="d_unit" label="单位"  align="center"></el-table-column>
            <el-table-column prop="d_type" label="项目类别"  align="center"></el-table-column>
            <el-table-column prop="d_price" label="单价"  align="center" v-if="isPrice"></el-table-column>
            <el-table-column prop="d_count" label="库存数量" align="center"></el-table-column>
            <el-table-column label="操作" align="center" v-if="flag != 'analy'">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import style from "@/css/kcgl.css";
export default {
    name:"product-store",
    data(){
        return{
            style,
        }
    },
    props:{
        tableData:null,
        flag:null,
        isPrice:null,
    },
    methods:{
        deleteData(val){
            this.$emit("deleteData",val);
        }
    }
}
</script>

