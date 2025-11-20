// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Front_end%20_Learning/Vue3+Ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E9%A1%B9%E7%9B%AE/vue3-admin-frontend/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.24_sass@1.93.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Front_end%20_Learning/Vue3+Ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E9%A1%B9%E7%9B%AE/vue3-admin-frontend/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_a801f5a7357ad9617164e0d3d28f6bb0/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///D:/Front_end%20_Learning/Vue3+Ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E9%A1%B9%E7%9B%AE/vue3-admin-frontend/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_b9e0494d2d45ce671b786fb417e6d453/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///D:/Front_end%20_Learning/Vue3+Ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E9%A1%B9%E7%9B%AE/vue3-admin-frontend/node_modules/.pnpm/vite-plugin-mock@2.9.8_mock_6190dd4f50e13c9a224c428209203675/node_modules/vite-plugin-mock/dist/index.js";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      // 使用svg需要用到的插件
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"
      }),
      // mock配置
      viteMockServe({
        localEnabled: command === "serve",
        mockPath: "./src/mock",
        // 指定mock文件所在目录
        supportTs: true
        // 支持TypeScript文件
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    server: {
      port: 5173,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据服务器地址
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        },
        "/upload": {
          target: "http://localhost:8080",
          changeOrigin: true
        }
      }
    },
    // css的全局配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          // 使用 Sass 模块系统：用 @use 将变量注入到每个文件的作用域中
          additionalData: '@use "src/styles/variable" as *;'
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxGcm9udF9lbmQgX0xlYXJuaW5nXFxcXFZ1ZTMrVHNcdTc4NDVcdThDMzdcdTc1MDRcdTkwMDlcdTk4NzlcdTc2RUVcXFxcdnVlMy1hZG1pbi1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRnJvbnRfZW5kIF9MZWFybmluZ1xcXFxWdWUzK1RzXHU3ODQ1XHU4QzM3XHU3NTA0XHU5MDA5XHU5ODc5XHU3NkVFXFxcXHZ1ZTMtYWRtaW4tZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0Zyb250X2VuZCUyMF9MZWFybmluZy9WdWUzK1RzJUU3JUExJTg1JUU4JUIwJUI3JUU3JTk0JTg0JUU5JTgwJTg5JUU5JUExJUI5JUU3JTlCJUFFL3Z1ZTMtYWRtaW4tZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuLy8gXHU1RjE1XHU1MTY1c3ZnXHU5NzAwXHU4OTgxXHU3NTI4XHU1MjMwXHU3Njg0XHU2M0QyXHU0RUY2XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbi8vIFx1NUYxNVx1NTE2NW1vY2tcdTk3MDBcdTg5ODFcdTc1MjhcdTUyMzBcdTc2ODRcdTYzRDJcdTRFRjZcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIC8vIFx1ODNCN1x1NTNENlx1NTQwNFx1NzlDRFx1NzNBRlx1NTg4M1x1NEUwQlx1NzY4NFx1NUJGOVx1NUU5NFx1NzY4NFx1NTNEOFx1OTFDRlxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICAvLyBcdTRGN0ZcdTc1MjhzdmdcdTk3MDBcdTg5ODFcdTc1MjhcdTUyMzBcdTc2ODRcdTYzRDJcdTRFRjZcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgICAgLy8gbW9ja1x1OTE0RFx1N0Y2RVxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIGxvY2FsRW5hYmxlZDogY29tbWFuZCA9PT0gJ3NlcnZlJyxcbiAgICAgICAgbW9ja1BhdGg6ICcuL3NyYy9tb2NrJywgLy8gXHU2MzA3XHU1QjlBbW9ja1x1NjU4N1x1NEVGNlx1NjI0MFx1NTcyOFx1NzZFRVx1NUY1NVxuICAgICAgICBzdXBwb3J0VHM6IHRydWUsIC8vIFx1NjUyRlx1NjMwMVR5cGVTY3JpcHRcdTY1ODdcdTRFRjZcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoJy4vc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1MTczLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgW2Vudi5WSVRFX0FQUF9CQVNFX0FQSV06IHtcbiAgICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTY1NzBcdTYzNkVcdTY3MERcdTUyQTFcdTU2NjhcdTU3MzBcdTU3NDBcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1NFUlZFLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICB9LFxuICAgICAgICAnL3VwbG9hZCc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBjc3NcdTc2ODRcdTUxNjhcdTVDNDBcdTkxNERcdTdGNkVcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIC8vIFx1NEY3Rlx1NzUyOCBTYXNzIFx1NkEyMVx1NTc1N1x1N0NGQlx1N0VERlx1RkYxQVx1NzUyOCBAdXNlIFx1NUMwNlx1NTNEOFx1OTFDRlx1NkNFOFx1NTE2NVx1NTIzMFx1NkJDRlx1NEUyQVx1NjU4N1x1NEVGNlx1NzY4NFx1NEY1Q1x1NzUyOFx1NTdERlx1NEUyRFxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQHVzZSBcInNyYy9zdHlsZXMvdmFyaWFibGVcIiBhcyAqOycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9aLFNBQVMsY0FBYyxlQUFlO0FBQzFiLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFFakIsU0FBUyw0QkFBNEI7QUFFckMsU0FBUyxxQkFBcUI7QUFFOUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQTtBQUFBLE1BRUoscUJBQXFCO0FBQUE7QUFBQSxRQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxRQUUxRCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQSxNQUVELGNBQWM7QUFBQSxRQUNaLGNBQWMsWUFBWTtBQUFBLFFBQzFCLFVBQVU7QUFBQTtBQUFBLFFBQ1YsV0FBVztBQUFBO0FBQUEsTUFDYixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsQ0FBQyxJQUFJLGlCQUFpQixHQUFHO0FBQUE7QUFBQSxVQUV2QixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQTtBQUFBLFVBRW5CLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
