<template>
    <div>
        <div :id="myChart" class="chart"></div>
    </div>
</template>

<script>
import bus from "@/bus.js"
export default {
    data(){
        return{
            myChart:(Math.random().toString(36).substr(2)),
            sortVis:""
        }
    },
    methods:{
        draw (item,e) {
            var echarts = require('echarts');
            // 实例化echarts对象
            this.$nextTick(()=>{
                let myChart = echarts.init(document.getElementById(this.myChart));
                let keys1 = [];
                let value1 = [];
                keys1 = item.arrDate;
                if(e == '1')
                    value1 = item.num;
                else
                    value1 = item.price;
                var that = this;
                // 绘制条形图
                    let option = {
                          tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                // type: 'cross',
                                animation: false,
                                label: {
                                    backgroundColor: '#505765'
                                }
                            },
                            formatter: function (params, ticket, callback) {
                            var htmlStr = '';
                            for(var i=0;i<params.length;i++){
                                var param = params[i];
                                var xName = param.name;//x轴的名称
                                var value = param.value;//y轴值
                                var color = param.color;//图例颜色
                                if(i===0){
                                htmlStr += xName + '<br/>';//x轴的名称
                                }
                                htmlStr +='<div>';
                                if(e == '2'){
                                    that.sortVis = '金额排序'
                                }else{
                                    that.sortVis = '数量排序'
                                }
                                //为了保证和原来的效果一样，这里自己实现了一个点的效果
                                htmlStr += '<h4 style="margin: 0;margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></h4>';
                                var htmlStr2 = '<h4 style="margin: 0;display:inline-block;color:#239693;font-size:14px;">' + that.sortVis + '</h4>';    
                                //圆点后面显示的文本
                                htmlStr +=  value + ' ' + ' ' +htmlStr2;
                                
                                htmlStr += '</div>';
                            }
                            return htmlStr;
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: keys1,
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: value1,
                            type: 'line'
                        }]
                    };
                    myChart.setOption(option);
                
            })
        },
        
    },
    props:{
        item:null,
        sort:null,
    },
    mounted(){
        if(this.item){
             this.draw(this.item);
        }
         bus.$on('sortEmit',(e)=>{
             console.log('ooi')
             this.draw(this.item,e);
         }); 
    },
    watch:{
        item(){
            if(this.item)
                this.draw(this.item);
        },
    }

}
</script>

<style>
 .chart {
        width: 370px;
        height: 254px;
        position: relative;
        top: -15px;
    }
</style>
