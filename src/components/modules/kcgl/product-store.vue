<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column prop="jsm" label="检索码"  align="center"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称"  align="center"></el-table-column>
            <el-table-column prop="dw" label="单位"  align="center"></el-table-column>
            <el-table-column prop="cplb" label="产品类别"  align="center"></el-table-column>
            <el-table-column prop="jhdj" label="进货单价"  align="center"></el-table-column>
            <el-table-column prop="rksl" label="库存数量"  align="center"></el-table-column>
            <el-table-column label="实际盘点数量" align="center" v-if="flag == 'analy'">
                <template slot-scope="scope">
                    <el-input :class="style.inputView" v-model="trueNum"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" v-else>
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
            trueNum:"",
        }
    },
    props:{
        tableData:null,
        flag:null,
    },
    methods:{
        deleteData(val){
            this.$emit("deleteData",val);
        }
    }
}
</script>

