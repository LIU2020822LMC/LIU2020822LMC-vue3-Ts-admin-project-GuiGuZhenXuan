// 小仓库： layout组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayOutSettingStore = defineStore('LayOutSetting', () => {
  // 是否折叠
  const collapse = ref(false)

  // 是否刷新
  const refresh = ref(true)
  return {
    collapse,
    refresh,
  }
})

export default useLayOutSettingStore
