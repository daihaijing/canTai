<template>
    <div class="page">
      <p>总共<span>{{total}} </span> 条数据</p>
      <el-pagination :page-size.sync="pageSize" style="margin:10px auto;"  @current-change="currentChange" :current-page.sync="currentPage" :layout="layout" :total="total">
      </el-pagination>
    </div>
</template>
<script>
export default {
    name: "common-pagination",
    data() {
        return {
            layout: "prev, pager, next, jumper",
        }
    },
    model: {
        prop: 'queryParam',
        event: 'pageChange'
    },
    props: {        
        total: null,
        pageSize: null,
        currentPage: null,
    },
    methods: {
        currentChange(pageNum) {
            this.$emit('pageNumChange', pageNum);
        },
    },
    watch:{
        
    }
   
}
</script>