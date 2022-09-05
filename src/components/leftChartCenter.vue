<template>
    <div class="chartCenter">
        <div class="title">
            <div>本年度中医体质分布</div>
            <div>单位：人</div>
            <div style="cursor: pointer;" @click="toggle('line')" v-if="type === 'bar'"><img src="../../public/assets/img/charts-title-right-bg.png">折线图</div>
            <div style="cursor: pointer;" @click="toggle('bar')" v-if="type === 'line'"><img src="../../public/assets/img/charts-title-right-bg1.png">柱形图</div>
        </div>
        <div class="charts" id="leftChartCenter">

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
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
        default: () => []
    }
})
const result = ref({})
onBeforeMount(() => {
    let arr = props.allData.reduce((items, item) => {
        if(items.length === 0) items.push({qxz_num: 0, yaxz_num: 0, yixz_num: 0, tsz_num: 0, srz_num: 0, xyz_num: 0, qyz_num: 0, tbz_num: 0, phz_num: 0,})
        items[0].qxz_num += Number(item.qxz_num)
        items[0].yaxz_num += Number(item.yaxz_num)
        items[0].yixz_num += Number(item.yixz_num)
        items[0].tsz_num += Number(item.tsz_num)
        items[0].srz_num += Number(item.srz_num)
        items[0].xyz_num += Number(item.xyz_num)
        items[0].qyz_num += Number(item.qyz_num)
        items[0].tbz_num += Number(item.tbz_num)
        items[0].phz_num += Number(item.phz_num)
        return items
    },[])
    result.value = arr[0]
})
const type = ref('bar')
const toggle = str => {
    type.value = str
    initLeftChartsCenter()
}
const initLeftChartsCenter = () => {
    let myChart = echarts.init(document.getElementById("leftChartCenter"))
    // 绘制图表
    myChart.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: type.value === 'bar',
            data: ['气虚质', '阴虚质', '阳虚质', '湿热质', '血瘀质', '气郁质', '痰湿质', '特禀质', '平和质'],
            axisLabel: { interval: 0 },
            axisLine: {
                lineStyle: {
                    color: "#DCDCDC",
                }
            }

        },
        tooltip : {
            trigger: 'axis',
            extraCssText: 'width:160px;height:50px;background:#0C1A4D;color:#fff;',
            formatter(params){
                return `${params[0].name}:${params[0].data}人</div>`
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: "#DCDCDC",
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            }

        },
        grid: {
            left: 30,  // 上
            right: 30, // 右
            top: 30,  // 下
            bottom: 30 // 左
        },
        color: [type.value === 'bar' ? '#5CFAFF' : '#0E9CFF'],
        barWidth: fontSize(25),
        series: [
            {
                data: [result.value.qxz_num, result.value.yaxz_num, result.value.yixz_num, result.value.srz_num, result.value.xyz_num, result.value.qyz_num, result.value.tsz_num, result.value.tbz_num, result.value.phz_num],
                type: type.value,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(14,156,255,0.2)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(14,156,255,0.2)'
                        }
                    ])
                },
            },
        ]
    });
}
onMounted(() => {
    initLeftChartsCenter()
})
</script>
<style>
</style>