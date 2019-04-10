<template>
    <el-pagination :page-size="pageSize"  @current-change="currentChange" :current-page="pageNum" :layout="layout" :total="total">
    </el-pagination>
</template>
<script>
export default {
    name: "common-pagination",
    data() {
        return {
            pageSizes: [24],
            layout: "total, prev, pager, next, jumper",            
            pageNum:1,
        }
    },
    model: {
        prop: 'queryParam',
        event: 'pageChange'
    },
    props: {        
        total: 0,
        pageSize: null,
    },
    methods: {
        sizeChange(pageSize) {
            this.pageSize = pageSize;
            this.$emit('pageSizeChange', this.pageSize);
        },
        currentChange(pageNum) {
            this.pageNum = pageNum;
            this.$emit('pageNumChange', this.pageNum);
        },
    },
}
</script>