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
    mounted(){
            this.draw();
        }

}
</script>

<style>
 .chart {
        width: 90%;
        height: 220px;
        position: relative;
        top: -15px;
    }
</style>
