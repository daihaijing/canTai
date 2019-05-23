<template>
    <div>
        <div :id="myChart" class="chart"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            myChart:(Math.random().toString(36).substr(2)),
        }
    },
    methods:{
        draw (item) {
            var echarts = require('echarts');
            // 实例化echarts对象
            this.$nextTick(()=>{
                let myChart = echarts.init(document.getElementById(this.myChart));
                // let keys1 = [];
                // let value1 = [];
                // for (let p1 in item) {
                //     if (item.hasOwnProperty(p1))
                //         keys1.push(p1);
                //     value1.push(jsonObject1[p1]);
                // }
                // 绘制条形图
                    let option = {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    };
                    myChart.setOption(option);
                
            })
        },
        
    },
    props:{
        item:null,
    },
    mounted(){
        if(this.item)
            this.draw(this.item);
    },
    watch:{
        item(){
            if(this.item)
                this.draw(this.item);
        }
    }

}
</script>

<style>
 .chart {
        width: 370px;
        height: 324px;
        position: relative;
        top: -15px;
    }
</style>
