<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 根据flag来判断是否销毁重建组件 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'

const LayOutSettingStore = useLayOutSettingStore()
const flag = ref(true)

// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
  () => LayOutSettingStore.refresh,
  () => {
    // 销毁重建
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
