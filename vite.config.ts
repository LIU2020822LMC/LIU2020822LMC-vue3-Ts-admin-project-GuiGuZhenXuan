import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
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
      '/api': {
        target: 'http://127.0.0.1:10086',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
