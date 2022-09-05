<template>
    <div class="chartBottom">
        <div class="title">
            <div>本年度服药人群统计</div>
            <div></div>
            <div></div>
        </div>
        <div class="charts">
            <div class="ybp" id="leftChartBottom1"></div>
            <div class="ybp" id="leftChartBottom2"></div>
            <div class="ybp" id="leftChartBottom3"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,onBeforeMount, onMounted, onBeforeUnmount} from 'vue'
import axios from "axios"
import * as echarts from 'echarts'
const fontSize = function (res) {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = res * (clientWidth / 1920);
    return fontSize;
}
const props = defineProps({
    allData: {
        type: Object,
        default: () => {}
    }
})
const result = ref({})
onBeforeMount(() => {
    let arr = props.allData.reduce((items, item) => {
        if(items.length === 0) items.push({gxy_num: 0, gxy_yy_num: 0, tnb_num: 0, tnb_yy_num: 0, gt_num: 0, gt_yy_num: 0,})
        items[0].gxy_num += Number(item.gxy_num)
        items[0].gxy_yy_num += Number(item.gxy_yy_num)
        items[0].tnb_num += Number(item.tnb_num)
        items[0].tnb_yy_num += Number(item.tnb_yy_num)
        items[0].gt_num += Number(item.gt_num)
        items[0].gt_yy_num += Number(item.gt_yy_num)
        return items
    },[])
    result.value = arr[0]
})

const initLeftChartBottom = () => {
    window.myChart1LeftChartBottom = {}
    window.myChart2LeftChartBottom = {}
    window.myChart3LeftChartBottom = {}
    window.myChart1LeftChartBottom = echarts.init(document.getElementById("leftChartBottom1"))
    window.myChart2LeftChartBottom = echarts.init(document.getElementById("leftChartBottom2"))
    window.myChart3LeftChartBottom = echarts.init(document.getElementById("leftChartBottom3"))
    // 绘制图表
    const option1 = {
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    roundCap: true,
                    width: 8,
                },
                itemStyle: {
                    color: '#0066FF',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                radius: '80%',
                center: ['50%', '50%'],
                splitLine: {
                    distance:0,
                    length: 8,
                    lineStyle: {
                        width: 3,
                        color: '#fff'
                    }
                },
                axisTick: {
                    distance: 2,
                    length: 4,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 8 // 这个是修改宽度的属性
                    }
                },
                axisLabel: {
                    distance: 10,
                    color: '#fff',
                    fontSize: 10,
                },
                 anchor: {
                    show: true,
                    showAbove: true,
                    size: fontSize(25),
                    itemStyle: {
                        borderWidth: 5
                    }
                },
                detail: {
                    valueAnimation: true,
                    fontSize: fontSize(14),
                    offsetCenter: [0, '70%'],
                    formatter:'{value}%',
                    color: '#fff'
                },
                data: [
                    {
                        value: (Number(result.value.gxy_yy_num)/Number(result.value.gxy_num)*100).toFixed(0),
                        name: '高血压服药率',
                        
                    }
                ],
                title:{
                    offsetCenter : [0, '100%'],
                    color: '#7FF2FF',
                    fontSize: fontSize(16)
                }
            }
        ]
    }
    // 绘制图表
    const option2 = {
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    roundCap: true,
                    width: 8,
                },
                itemStyle: {
                    color: '#0066FF',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                radius: '80%',
                center: ['50%', '50%'],
                splitLine: {
                    distance:0,
                    length: 8,
                    lineStyle: {
                        width: 3,
                        color: '#fff'
                    }
                },
                axisTick: {
                    distance: 2,
                    length: 4,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 8 // 这个是修改宽度的属性
                    }
                },
                axisLabel: {
                    distance: 10,
                    color: '#fff',
                    fontSize: 10,
                },
                 anchor: {
                    show: true,
                    showAbove: true,
                    size: fontSize(25),
                    itemStyle: {
                        borderWidth: 5
                    }
                },
                detail: {
                    valueAnimation: true,
                    fontSize: fontSize(14),
                    offsetCenter: [0, '70%'],
                    formatter:'{value}%',
                    color: '#fff'
                },
                data: [
                    {
                        value: (Number(result.value.tnb_yy_num)/Number(result.value.tnb_num)*100).toFixed(0),
                        name: '糖尿病服药率',
                        
                    }
                ],
                title:{
                    offsetCenter : [0, '100%'],
                    color: '#7FF2FF',
                    fontSize: fontSize(16)
                }
            }
        ]
    }
    // 绘制图表
    const option3 = {
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    roundCap: true,
                    width: 8,
                },
                itemStyle: {
                    color: '#0066FF',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                radius: '80%',
                center: ['50%', '50%'],
                splitLine: {
                    distance:0,
                    length: 8,
                    lineStyle: {
                        width: 3,
                        color: '#fff'
                    }
                },
                axisTick: {
                    distance: 2,
                    length: 4,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 8 // 这个是修改宽度的属性
                    }
                },
                axisLabel: {
                    distance: 10,
                    color: '#fff',
                    fontSize: 10,
                },
                 anchor: {
                    show: true,
                    showAbove: true,
                    size: fontSize(25),
                    itemStyle: {
                        borderWidth: 5
                    }
                },
                detail: {
                    valueAnimation: true,
                    fontSize: fontSize(14),
                    offsetCenter: [0, '70%'],
                    formatter:'{value}%',
                    color: '#fff'
                },
                data: [
                    {
                        value: (Number(result.value.gt_yy_num)/Number(result.value.gt_num)*100).toFixed(0),
                        name: '高糖服药率'
                        
                    }
                ],
                title:{
                    offsetCenter : [0, '100%'],
                    color: '#7FF2FF',
                    fontSize: fontSize(16)
                }
            }
        ]
    }
    window.myChart1LeftChartBottom.setOption(option1);
    window.myChart2LeftChartBottom.setOption(option2);
    window.myChart3LeftChartBottom.setOption(option3);
}
onMounted(() => {
    initLeftChartBottom()
})
onBeforeUnmount(() => {
    window.myChart1LeftChartBottom.dispose()
    window.myChart2LeftChartBottom.dispose()
    window.myChart3LeftChartBottom.dispose()
})
</script>
<style>
</style>