<template>
    <div class="chartTop">
        <div class="title">
            <div>本年度体检人群分布</div>
            <div>单位：人</div>
            <div style="cursor: pointer;" @click="toggle('line')" v-if="type === 'bar'"><img src="../assets/img/charts-title-right-bg1.png">折线图</div>
            <div style="cursor: pointer;" @click="toggle('bar')" v-if="type === 'line'"><img src="../assets/img/charts-title-right-bg.png">柱形图</div>
        </div>
        <div class="charts" id="leftChartTop">

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, watch, onBeforeUnmount } from 'vue'
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
        default: () => { }
    }
})
const result = ref({})
onBeforeMount(() => {
    console.log(props.allData)
    let arr = props.allData.reduce((items, item) => {
        if (items.length === 0) items.push({ lnr_num: 0, gxy_num: 0, tnb_num: 0, jsb_num: 0, pk_num: 0, other_num: 0, })
        items[0].lnr_num += Number(item.lnr_num)
        items[0].gxy_num += Number(item.gxy_num)
        items[0].tnb_num += Number(item.tnb_num)
        items[0].jsb_num += Number(item.jsb_num)
        items[0].pk_num += Number(item.pk_num)
        items[0].other_num += Number(item.other_num)
        return items
    }, [])
    result.value = arr[0]
})
const type = ref('bar')
const toggle = str => {
    type.value = str
    initLeftChartsTop()
}
const initLeftChartsTop = () => {
    window.myChartLeftChartTop = {}
    let option = {
        xAxis: {
            type: 'category',
            boundaryGap: type.value === 'bar',
            data: ['老年人', '高血压', '糖尿病', '精神病', '贫困', '其他'],
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
                    color: "#CCCCCC"
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
            left: 10,  // 上
            right: 20, // 右
            top: 30,  // 下
            bottom: 10, // 左
            containLabel: true
        },
        color: [type.value === 'bar' ? '#5CFAFF' : '#0E9CFF'],
        series: [
            {
                data: [result.value.lnr_num, result.value.gxy_num, result.value.tnb_num, result.value.jsb_num, result.value.pk_num, result.value.other_num],
                type: type.value,
                barWidth: fontSize(25),
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
    }
    window.myChartLeftChartTop = echarts.init(document.getElementById("leftChartTop"))
    window.myChartLeftChartTop.setOption({
        ...option
    })
}
onMounted(() => {
    initLeftChartsTop()
})
onBeforeUnmount(() => {
    window.myChartLeftChartTop.dispose()
})
</script>
<style>
</style>