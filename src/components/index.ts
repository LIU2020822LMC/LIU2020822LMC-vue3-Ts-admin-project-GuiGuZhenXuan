// 引入项目中全部的全局组件
import { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
// 全局对象
const allGloablComponents: any = { SvgIcon }
// 引入elemen-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app: App) {
    Object.keys(allGloablComponents).forEach((key) => {
      // 注册项目全部的全局组件
      // 注册全局组件：app.component(组件名, 组件)
      app.component(key, allGloablComponents[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
