import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
// 引入components/index.ts文件
import globalComponents from '@/components/index'
// 引入模板的全局的样式
import '@/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

// 使用自定义插件
app.use(globalComponents)
app.mount('#app')
