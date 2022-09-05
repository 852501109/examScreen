<template>
    <div class="wrapper" id="all" @mousewheel.ctrl.prevent.stop>
        <div class="left">
            <div class="head">{{ currentTime }}</div>
            <leftChartTop :allData="allData" v-if="allData.length > 0" />
            <leftChartCenter :allData="allData" v-if="allData.length > 0" />
            <leftChartBottom :allData="allData" v-if="allData.length > 0" />
        </div>
        <div class="center">
            <div class="head">健康体检数据可视化大屏</div>
            <!-- <div class="chartTop" >
                <div class="nav">
                    <div v-for="(i, n) in 4" :key="n" class="item" :class="{ active: currentNav === n }"
                        @click="changeNav(n)">选项卡</div>
                </div>
            </div> -->
            <div class="chartCenterTips">
                <div class="item">
                    <div class="num">{{ result.yj_num }}</div>
                    <div class="tip">应体检人数</div>
                </div>
                <div class="item">
                    <div class="num">{{ result.tj_num }}</div>
                    <div class="tip">已体检人数</div>
                </div>
                <div class="item">
                    <div class="num">{{ ((Number(result.tj_num)/Number(result.yj_num))*100).toFixed(2)}}%</div>
                    <div class="tip">体检率</div>
                </div>
                <div class="city">{{ userInfo.name }}</div>
            </div>
            <centerChartCenter :allData="allData" v-if="allData.length > 0" />
            <div class="chartBottom">
                <div class="title">
                    <div>本年度机构体检进度</div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <td>排名</td>
                            <td>机构名称</td>
                            <td>老年人/人</td>
                            <td>自理/人</td>
                            <td>中医/人</td>
                            <td  width="100">已检人数/体检率</td>
                        </tr>
                    </thead>
                </table>
                <div class="table">
                    <table>
                        <tbody>
                            <tr v-for="(i, n) in allData" :key="n">
                                <td>{{ n + 1 }}</td>
                                <td>{{ i.org_name }}</td>
                                <td>{{ i.lnr_num }}</td>
                                <td>{{ i.zl_num }}</td>
                                <td>{{ i.zytz_num }}</td>
                                <td width="100">{{ i.tj_num }}  ({{ parseFloat(i.tjl) > 100 ? 100 : parseFloat(i.tjl).toFixed(2) }}%)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="head">
                <div id="he-plugin-simple"></div>
            </div>
            <rightChartTop :allData="allData" v-if="allData.length > 0" />
            <rightChartCenter :allData="allData" v-if="allData.length > 0" />
            <rightChartBottom :allData="allData" v-if="allData.length > 0" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, computed, reactive, onBeforeUnmount } from 'vue'
import leftChartTop from '@/components/leftChartTop.vue'
import leftChartCenter from '@/components/leftChartCenter.vue'
import leftChartBottom from '@/components/leftChartBottom.vue'
import rightChartTop from '@/components/rightChartTop.vue'
import rightChartCenter from '@/components/rightChartCenter.vue'
import rightChartBottom from '@/components/rightChartBottom.vue'
import centerChartCenter from '@/components/centerChartCenter.vue'
import { parseTime } from '@/utils/global'
import axios from "axios"
import { getData } from '../api/index.js'
import * as echarts from 'echarts'
const userInfo = ref(JSON.parse(sessionStorage.getItem('userInfo')))
const weater = ref('')
const currentNav = ref(0)
const changeNav = n => {
    console.log(n)
    currentNav.value = n
}
const currentTime = ref('')
const fontSize = function (res) {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 16 * (clientWidth / 1920);
    return fontSize;
}

const allData = ref([])
const result = ref({})
onBeforeMount(() => {
    console.log(allData.value,length)
    setInterval(() => {
        currentTime.value = parseTime(new Date(), '{y}年{m}月{d}日 星期{a} {h}：{i}：{s}')
    }, 1000)
    getData({ orgId: userInfo.value.org_id, year: 2022 }).then(res => {
        allData.value = res.data
        let arr = allData.value.reduce((items, item) => {
            if (items.length === 0) items.push({ yj_num: 0, tj_num: 0, tjl: 0 })
            items[0].yj_num += Number(item.yj_num)
            items[0].tj_num += Number(item.tj_num)
            items[0].tjl += (parseFloat(item.tjl) > 100 ? 100 : parseFloat(item.tjl))
            return items
        }, [])
        result.value = arr[0]
    })
    insertWeather()


})
onBeforeUnmount(() => {
    let loadtianqi = document.getElementsByClassName("loadtianqi");
    if (loadtianqi) {
        // 每次append script之前判断一下，避免重复添加script资源标签
        for (var i = 0; i < loadtianqi.length; i++) {
            document.body.removeChild(loadtianqi[i]);
        }
    }
})


const insertWeather = () => {
    window.WIDGET = {
        "CONFIG": {
            "modules": "01234",
            "background": "5",
            "tmpColor": "02F9FD",
            "tmpSize": "16",
            "cityColor": "02F9FD",
            "citySize": "16",
            "aqiColor": "02F9FD",
            "aqiSize": "16",
            "weatherIconSize": "24",
            "alertIconSize": "18",
            "padding": "0px 0px 0px 0px",
            "shadow": "0",
            "language": "auto",
            "fixed": "false",
            "vertical": "top",
            "horizontal": "left",
            "key": "b4698dc11ea74836a29cb2823c88b35d"
        }
    }
    let script = document.createElement('script')
    script.className = "loadtianqi"
    script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
    document.body.appendChild(script);
}
const tableData = ref([])
</script>
<style lang="less">
.flex(@flex: flex, @direction: row, @justify: flex-start, @align: flex-start, @wrap: nowrap) {
    display: @flex;
    flex-direction: @direction;
    justify-content: @justify;
    align-items: @align;
    flex-wrap: @wrap;
}

.chartCenterTips {
    position: relative;
    background-image: url('../assets/img/centertopbg1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    .flex(flex, row, space-between, flex, nowrap);
    .item {
        padding-top: 0.5rem;
    }
    .tip {
        padding-top: 0.1rem!important;
    }
    width: 50.25rem/* 804/16 */;
    height: 10vh;
    margin: 1.2vh auto 0 auto;
    z-index: 1;
    .city {
        position: absolute;
        left: 50%;
        bottom: .2rem
            /* 10/16 */
        ;
        transform: translateX(-50%);
    }

    >div:nth-child(2) {
        border-left: 1px solid #02FAFD;
        border-right: 1px solid #02FAFD;
    }

    .num {
        font-size: 1.5rem
            /* 24/16 */
        ;
        color: #fff;
    }

    .tip {
        font-size: 1rem;
        color: #02FAFD;
        padding-top: .5rem
            /* 8/16 */
        ;
    }

    .item {
        flex: 1;
        text-align: center;
        height: 3.625rem
            /* 58/16 */
        ;
    }
}

.wrapper {
    width: 100vw;
    height: 100vh;
    background: rgb(21, 21, 59);
    background-image: url(../assets/img/bg.gif);
    background-size: 100%;
    font-size: 1rem
        /* 16/16 */
    ;

    .flex(flex, row, flex-start, flex-start, nowrap);
    color: #02FAFD;

    div {
        box-sizing: border-box;
    }

    .charts {
        width: 31.8125rem;
        height: 13rem;
        margin: 0 auto;
        .flex(flex, row, space-between, flex-start, nowrap);

        >div {
            width: 12.0625rem;
            height: 12.0625rem;
            padding: 1rem
                /* 16/16 */
                auto;
        }
    }
}

.left,
.center,
.right {
    height: 100vh;

    .chartTop,
    .chartCenter,
    .chartBottom {
        background-image: url('../assets/img/leftchartsbg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
    }
}

#chartCenter {
    position: relative;
    padding: 0px !important;
    height: 47vh;
    margin-top: -3vh;
    z-index: 0;
}

.title {
    height: 3.125rem;
    line-height: 3.125rem;
    margin-top: 1vh;
    padding-top: 2rem;
    padding-right: .75rem;
    font-size: 1rem;
    .flex(flex, row, space-between, center, nowrap);

    >div {
        padding-bottom: .625rem;
    }

    .circle {
        display: inline-block;
        width: .5625rem
            /* 9/16 */
        ;
        height: .5625rem
            /* 9/16 */
        ;
        border-radius: .625rem
            /* 10/16 */
        ;
        margin: 0 .25rem
            /* 4/16 */
        ;
        border: 1px solid;
    }

    >div:first-child {
        width: 15rem;
        text-align: center;
        background-image: url('../assets/img/charts-title_bmp.bmp');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;

    }

    .tips {
        .flex(flex, row, flex-end, center, nowrap);
        color: #fff;
        font-size: .875rem/* 14/16 */;

        >div {
            cursor: pointer
        }
    }

    div:nth-child(2) {
        color: #fff;
    }

    div:nth-child(3) {
        width: 10.4375rem
            /* 167/16 */
        ;
        text-align: right;

        img {
            width: .875rem;
            height: .875rem;
            vertical-align: middle;
            margin-right: .625rem;
        }
    }
}

.center {
    width: 50.25rem;

    .head {
        width: 100%;
        text-align: center;
        font-size: 1.4rem;
    }

    .chartTop {
        background-image: url('../assets/img/centertopbg3.png');
        background-repeat: no-repeat;
        background-size: 93% 100%;
        background-position: center center;
        padding-left: 4.0625rem
            /* 65/16 */
        ;
        height: 2.25rem
            /* 36/16 */
        ;

        .nav {
            .flex(flex, row, flex-start, flex-start, nowrap);
            width: 31.8rem;
            height: 100%;
            margin: 0 auto;

            .item {
                width: 7.5rem;
                height: 100%;
                line-height: 2.25rem;
                text-align: center;
                cursor: pointer;
            }

            .active {
                background-image: url('../assets/img/btn-bg_bmp.bmp');
                background-repeat: no-repeat;
                background-size: 100% 90%;
                background-position: 30% 30%;
                color: #005BC7;
            }
        }

    }
}

.left,
.right {
    // .flex(flex, columns, flex-start, flex-start, wrap);
    width: 33.75rem
        /* 540/16 */
    ;
}

.left {
    .head {
        // background-image: url('../assets/img/left-top.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        // background-position: center center;
        padding: 1.5625rem
            /* 25/16 */
            3.25rem
            /* 52/16 */
        ;
    }


}

.right {
    .head {
        // background-image: url('../assets/img/right-top.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        // background-position: center center;
        padding: 1.5625rem
            /* 25/16 */
            3.25rem
            /* 52/16 */
        ;
        text-align: right;
    }
}

.center .head {
    width: 100%;
    height: 8vh
        /* 122/16 */
    ;
    line-height: 3.1125rem
        /* 85/16 */
    ;
    margin: 0 auto;
    background-image: url('../assets/img/centertopbg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
}

.center .chartTop {
    width: 100%;
    height: 2.25rem
        /* 36/16 */
    ;
    margin: 0 auto;
}

.center .chartCenter {
    background-image: none !important;
    position: relative;
    width: 100%;
    margin: 1vh auto;
}

.center .chartBottom {
    background-image: url('../assets/img/center-bottom-bg.png') !important;
    width: 100%;
    height: 32.5vh;
    margin: 0 auto;
    padding-top: .9375rem
        /* 15/16 */
    ;
    text-align: center;
    padding-bottom: .625rem
        /* 10/16 */
    ;

    table:first-child {}

    .title {
        padding-top: 0;
    }

    table:nth-child(1) {
        font-size: .875rem
            /* 14/16 */
        ;
        color: #fff;
    }

    table {
        width: 98%;
        margin: 0 auto;
        text-align: center;

        td:first-child {
            width: 5rem
                /* 80/16 */
            ;
        }

        td:nth-child(2) {
            width: 13.25rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        td:nth-child(3) {
            width: 9rem;
        }

        td:nth-child(4) {
            width: 9rem;
        }

        td:nth-child(5) {
            width: 9rem;
        }

        td:nth-child(6) {
            width: 15rem;
        }

        td {
            text-align: center;
        }
    }

    .table {
        position: relative;
        height: 11rem
            /* 217/16 */
        ;
        overflow-y: auto;

        tr:nth-of-type(odd) {
            background: rgba(3, 61, 138, 0.47);
        }

        tr {
            height: 2.5rem
                /* 40/16 */
            ;
        }
    }

}

.table::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.table::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #5CFAFF;
}

.table::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #005BC7;
}

.left>div,
.right>div {
    width: 32.5rem
        /* 520/16 */
    ;
    height: 28.5vh;

    margin: 0 auto;
}

.left .head,
.right .head {
    width: 32.5rem;
    height: 8vh
        /* 155/16 */
    ;

}


.left .chartCenter,
.left .chartBottom {
    margin-top: 1vh;
}

.left .chartTop,
.right .chartTop {
    margin-top: 0;
}

.right .chartCenter,
.right .chartBottom {
    margin-top: 1vh;
}
</style>