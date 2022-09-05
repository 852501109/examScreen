<template>
    <div class="chartCenter">
        <div class="title">
            <div>本年度慢病风险因素分析</div>
            <div>单位：人</div>
            <div class="tips">
                <div @click="toggle('gxy')">
                    <div class="circle" style="border-color:#02FAFD;" :style="{background: showBars.includes('gxy') ? '#02FAFD' : ''}"></div>高血压
                </div>
                <div @click="toggle('tnb')">
                    <div class="circle" style="border-color:#FF7723;" :style="{background: showBars.includes('tnb') ? '#FF7723' : ''}"></div>糖尿病
                </div>
            </div>
        </div>
        <div class="charts" id="rightChartCenter" v-if="isToggle">

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, nextTick, onBeforeUnmount } from 'vue'
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
        if(items.length === 0) items.push({gxy_xy: 0, gxy_sy: 0, gxy_st: 0, gxy_bdl: 0, gxy_hswz: 0, gxy_sswz: 0, tnb_xy: 0, tnb_sy: 0, tnb_st: 0, tnb_bdl: 0, tnb_hswz: 0, tnb_sswz: 0})
        items[0].gxy_xy += Number(item.gxy_xy)
        items[0].gxy_sy += Number(item.gxy_sy)
        items[0].gxy_st += Number(item.gxy_st)
        items[0].gxy_bdl += Number(item.gxy_bdl)
        items[0].gxy_hswz += Number(item.gxy_hswz)
        items[0].gxy_sswz += Number(item.gxy_sswz)
        items[0].tnb_xy += Number(item.tnb_xy)
        items[0].tnb_sy += Number(item.tnb_sy)
        items[0].tnb_st += Number(item.tnb_st)
        items[0].tnb_bdl += Number(item.tnb_bdl)
        items[0].tnb_hswz += Number(item.tnb_hswz)
        items[0].tnb_sswz += Number(item.tnb_sswz)
        return items
    },[])
    result.value = arr[0]
})
const showBars = ref(['tnb', 'gxy'])
const isToggle = ref(true)
const toggle = type => {
    if (type && showBars.value.includes(type)) {
        showBars.value.splice(showBars.value.indexOf(type), 1)
    } else if (type && !showBars.value.includes(type)) {
        showBars.value.push(type)
    }
    console.log(showBars)
    initRightChartsCenter()
}
window.myChartRightChartCenter = {}
const initRightChartsCenter = () => {
    const option = {
        xAxis: {
            type: 'category',
            data: ['吸烟', '嗜盐', '嗜糖', '不锻炼', '荤食为主', '素食为主'],
            axisLabel: { interval: 0 },
            axisLine: {
                lineStyle: {
                    color: "#DCDCDC",
                }
            },
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
        color: ['#5CFAFF', '#FF7723'],
        grid: {
            left: 10,  // 上
            right: 20, // 右
            top: 30,  // 下
            bottom: 10, // 左
            containLabel: true
        },
        series: [
            {
                name: '高血压',
                data: showBars.value.includes('gxy') ? [result.value.gxy_xy, result.value.gxy_sy, result.value.gxy_st, result.value.gxy_bdl, result.value.gxy_hswz, result.value.gxy_sswz] : [],
                type: 'bar'
            },{
                name: '糖尿病',
                data: showBars.value.includes('tnb') ? [result.value.tnb_xy, result.value.tnb_sy, result.value.tnb_st, result.value.tnb_bdl, result.value.tnb_hswz, result.value.tnb_sswz] : [],
                type: 'bar'
            }
        ]
    }
    window.myChartRightChartCenter = echarts.init(document.getElementById("rightChartCenter"))
    // 绘制图表
    window.myChartRightChartCenter.setOption(option);
}
onMounted(() => {
    initRightChartsCenter()
})
onBeforeUnmount(() => {
    window.myChartRightChartCenter.dispose()
})
</script>
<style>
</style>