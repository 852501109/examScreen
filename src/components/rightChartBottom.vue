<template>
    <div class="chartBottom">
        <div class="title">
            <div>本年度异常指标统计</div>
            <div>单位：%</div>
            <div class="tips">
            </div>
        </div>
        <div class="charts" id="rightChartBottom">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,onBeforeMount, onMounted} from 'vue'
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
        if(items.length === 0) items.push({tj_num: 0, bmi_abn: 0, xy_abn: 0, xt_abn: 0, xz_abn: 0, gg_abn: 0, xd_abn: 0, bc_abn: 0})
        items[0].bmi_abn += Number(item.bmi_abn)
        items[0].xy_abn += Number(item.xy_abn)
        items[0].xt_abn += Number(item.xt_abn)
        items[0].xz_abn += Number(item.xz_abn)
        items[0].gg_abn += Number(item.gg_abn)
        items[0].xd_abn += Number(item.xd_abn)
        items[0].bc_abn += Number(item.bc_abn)
        items[0].tj_num += Number(item.tj_num)
        return items
    },[])
    result.value = arr[0]
})
const initRightChartsBottom = () => {
    console.log(result.value)
    let myChart = echarts.init(document.getElementById("rightChartBottom"))
   myChart.setOption({
        xAxis: {
            type: 'category',
            data: ['BMI', '血压', '血糖', '血脂', '肝功', '心电', 'B超'],
            axisLabel: { interval: 0 },
            axisLine: {
                lineStyle: {
                    color: "#DCDCDC",
                }
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
        tooltip : {
            trigger: 'axis',
            extraCssText: 'width:160px;height:50px;background:#0C1A4D;color:#fff;',
            formatter(params){
                return `${params[0].name}:${params[0].data}%</div>`
            }
        },
        grid: {
            left: 30,  // 上
            right: 30, // 右
            top: 30,  // 下
            bottom: 30 // 左
        },
        color: ['#5CFAFF'],
        series: [
            {
                data: [
                    ((Number(result.value.bmi_abn)/Number(result.value.tj_num))*100).toFixed(2),
                    ((Number(result.value.xy_abn)/Number(result.value.tj_num))*100).toFixed(2),
                    ((Number(result.value.xt_abn)/Number(result.value.tj_num))*100).toFixed(2),
                    ((Number(result.value.xz_abn)/Number(result.value.tj_num))*100).toFixed(2),
                    ((Number(result.value.gg_abn)/Number(result.value.tj_num))*100).toFixed(2),
                    ((Number(result.value.xd_abn)/Number(result.value.tj_num))*100).toFixed(2),
                    ((Number(result.value.bc_abn)/Number(result.value.tj_num))*100).toFixed(2)
                ],
                type: 'bar',
                barWidth: fontSize(25)
            }
        ]
    });
}
onMounted(() => {
    initRightChartsBottom()
})
</script>
<style>
</style>