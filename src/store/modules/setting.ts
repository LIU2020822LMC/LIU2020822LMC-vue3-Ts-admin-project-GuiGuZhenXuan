// 小仓库： layout组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayOutSettingStore = defineStore('LayOutSetting', () => {
  const collapse = ref(false)

  return {
    collapse,
  }
})

export default useLayOutSettingStore
