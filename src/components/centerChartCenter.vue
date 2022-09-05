<template>
    <i class="fullscreen el-icon-switch-button" @click="logout"></i>
    <i class="fullscreen el-icon-full-screen" @click="fullScreen" v-if="!isfullScreen"></i>
    <i class="fullscreen el-icon-full-screen" @click="exitFullScreen" v-if="isfullScreen"></i>
    <div class="chartCenter" id="chartCenter">
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from "vue-router";
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
const map = shallowRef(null);
const router = useRouter();
const isfullScreen = ref(false)
const props = defineProps({
    allData: {
        type: Array,
        default: () => []
    }
})
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const logout = () => {
    localStorage.clear()
    router.push("/login")
}
onMounted(() => {
    init()
})
const init = () => {
    window._AMapSecurityConfig = {
        securityJsCode:'4dde320f3ed2638a194cc7e5fc3df7ad'
    }
    // 846a3e7506606f7d8ddd0151ef813e7d&plugin=Map2D,AMap.Geocoder,AMap.DistrictSearch
    AMapLoader.load({
        key:"846a3e7506606f7d8ddd0151ef813e7d",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:['AMap.Geocoder', 'AMap.DistrictSearch'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
        let geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: userInfo.name
        })
        geocoder.getLocation(userInfo.name, function (status, result) {
            console.log(status, result)
            let cityPoint = result.geocodes[0].location
            var map = new AMap.Map('chartCenter', {
                viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
                zoom: 10, //初始化地图层级
                center: [cityPoint.lng, cityPoint.lat], //初始化地图中心点
                // resizeEnable: true, //初始化地图中心点
                mapStyle: 'amap://styles/11072fd5598de48d6a142f0b3062f00d'
            })
            map.clearMap()
            setTimeout(() => {
                props.allData.forEach(item => {
                    if (!item.position) return
                    let itemPoint = item.position.split(',')
                    let marker = new AMap.Marker({
                        position: [itemPoint[0], itemPoint[1]],
                        // icon: '//webapi.amap.com/theme/v1.3/markers/b/mark_b.png',
                        anchor: 'bottom-center',
                        offset: new AMap.Pixel(0, 0),
                        style: {
                            width: '20px',
                            height: '30px'
                        }
                    });
                    marker.setMap(map);

                    // 设置鼠标划过点标记显示的文字提示
                    // marker.setTitle('我是marker的title');

                    // 设置label标签
                    // label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    marker.setLabel({
                        direction: 'right',
                        offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
                        content: `<div class='info'>${item.org_name}</div>`, //设置文本标注内容
                    });
                })
            }, 1000)
        })
    }).catch(e=>{
        console.log(e);
    })
    // AMap.plugin('AMap.Geocoder', function () {
    //     let geocoder = new AMap.Geocoder({
    //         // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    //         city: userInfo.name
    //     })
    //     geocoder.getLocation(userInfo.name, function (status, result) {
    //         console.log(status, result)
    //         let cityPoint = result.geocodes[0].location
    //         var map = new AMap.Map('chartCenter', {
    //             viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
    //             zoom: 10, //初始化地图层级
    //             center: [cityPoint.lng, cityPoint.lat], //初始化地图中心点
    //             // resizeEnable: true, //初始化地图中心点
    //             mapStyle: 'amap://styles/11072fd5598de48d6a142f0b3062f00d'
    //         })
    //         map.clearMap()
    //         setTimeout(() => {
    //             props.allData.forEach(item => {
    //                 if (!item.position) return
    //                 let itemPoint = item.position.split(',')
    //                 let marker = new AMap.Marker({
    //                     position: [itemPoint[0], itemPoint[1]],
    //                     // icon: '//webapi.amap.com/theme/v1.3/markers/b/mark_b.png',
    //                     anchor: 'bottom-center',
    //                     offset: new AMap.Pixel(0, 0),
    //                     style: {
    //                         width: '20px',
    //                         height: '30px'
    //                     }
    //                 });
    //                 marker.setMap(map);

    //                 // 设置鼠标划过点标记显示的文字提示
    //                 // marker.setTitle('我是marker的title');

    //                 // 设置label标签
    //                 // label默认蓝框白底左上角显示，样式className为：amap-marker-label
    //                 marker.setLabel({
    //                     direction: 'right',
    //                     offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
    //                     content: `<div class='info'>${item.org_name}</div>`, //设置文本标注内容
    //                 });
    //             })
    //         }, 1000)
    //     })
    // })

}

const fullScreen = () => {
    isfullScreen.value = true
    const el = document.documentElement
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }

    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript) {
            wscript.SendKeys("{F11}");
        }
    }
}
const exitFullScreen = (el) => {
    isfullScreen.value = false
    var el = document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;

    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
        return;
    }

    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}
</script>
<style scoped lang="less">
#map {
    width: 100vw;
    height: 100vh;
}

:deep(.amap-marker-label) {
    background: #000;
}

:deep(.amap-logo) {
    display: none;
    opacity: 0 !important;
}

:deep(.amap-copyright) {
    opacity: 0;
}

:deep(.amap-marker) {
    position: absolute;
    z-index: 9999;
}

:deep(.info) {
    white-space: break-spaces;
    background: #000;
    width: 8.75rem
        /* 140/16 */
    ;
    height: auto;
    color: #fff;
    padding: .625rem
        /* 10/16 */
    ;
}

.fullscreen {
    position: absolute;
    font-size: 1.475rem
        /* 30/16 */
    ;
    right: 4.7rem;
    top: 1.2rem
        /* 10/16 */
    ;
    cursor: pointer;
}

.fullscreen.el-icon-switch-button {
    right: 2.2rem;
}
</style>