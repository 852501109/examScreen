import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => { 
    // 获取当前环境的配置
    const config = loadEnv(mode, './')
    return { 
        base: config.VITE_APP_BASE_URL,
        plugins: [vue()],
        optimizeDeps: {
            include: ['schart.js']
        },
        pwa: {
            iconPaths: {
                favicon32: 'favicon.ico',
                favicon16: 'favicon.ico',
                appleTouchIcon: 'favicon.ico',
                maskIcon: 'favicon.ico',
                msTileImage: 'favicon.ico'
            }
        },
        build: {
            outDir: "view"
        },
        configureWebpack: {
            externals: {
                "BMap": "BMap"
            }
        },
        alias: {
            '@': resolve(__dirname, 'src'),
        },
        resolve: {
            // 配置别名
            alias: {
                '@': resolve(__dirname, 'src'),
            },
            pluginOptions: {
                'style-resources-loader': {
                    prepRrocessor: 'less'
                }
            }
        }
    } 
})
// export default {
//     base:  './',
//     plugins: [vue()],
//     optimizeDeps: {
//         include: ['schart.js']
//     },
//     build: {
//         outDir: "font",
//     },
//     outDir: 'view',
//     configureWebpack: {
//         externals: {
//             "BMap": "BMap"
//         }
//     },
//     resolve: {
//     // 配置别名
//     alias: {
//       '@': resolve(__dirname, 'src'),
//     },
//     pluginOptions: {
//         'style-resources-loader': {
//             prepRrocessor: 'less'
//         }
//     }
//   },
// }