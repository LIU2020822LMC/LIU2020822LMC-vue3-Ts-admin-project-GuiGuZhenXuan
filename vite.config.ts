import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 引入mock需要用到的插件
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应的变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      // 使用svg需要用到的插件
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // mock配置
      viteMockServe({
        localEnabled: command === 'serve',
        mockPath: './src/mock', // 指定mock文件所在目录
        supportTs: true, // 支持TypeScript文件
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据服务器地址
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // css的全局配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          // 使用 Sass 模块系统：用 @use 将变量注入到每个文件的作用域中
          additionalData: '@use "src/styles/variable" as *;',
        },
      },
    },
  }
})
