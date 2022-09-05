<template>
    <div class="chartTop">
        <div class="title">
            <div>月度体检情况</div>
            <div>单位：人</div>
            <div></div>
        </div>
        <div class="charts" id="rightChartTop">

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
const monthData = ref({})
onBeforeMount(() => {
    let month = []
    props.allData.forEach(item => {
        month.push(item.mouth_tj)
    })
    let arr1 = month.reduce((items, item) => {
        Object.keys(item).forEach(key => {
            if(items[key] === undefined) items[key] = 0
            items[key] += Number(item[key])
        })
        return items
    },{})
    monthData.value = arr1
})
window.myChartRightChartTop = {}
const initRightChartsTop = () => {
    window.myChartRightChartTop = echarts.init(document.getElementById("rightChartTop"))
    // 绘制图表
    window.myChartRightChartTop.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Object.keys(monthData.value).reverse(),
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
                lineStyle:{
                    type:'dashed'
                }
            }

        },
        grid: {
            left: 10,  // 上
            right: 20, // 右
            top: 30,  // 下
            bottom: 10, // 左
            containLabel: true
        },
        series: [
            {
                data: Object.values(monthData.value).reverse(),
                type: 'line',
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
            }
        ]
    });
}
onMounted(() => {
    initRightChartsTop()
})
onBeforeUnmount(() => {
    window.myChartRightChartTop.dispose()
})
</script>
<style>
</style>