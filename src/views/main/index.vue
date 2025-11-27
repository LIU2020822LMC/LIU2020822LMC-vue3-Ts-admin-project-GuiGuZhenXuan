<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade">
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
/* 滑动淡入效果 */
.slide-fade-enter-from {
  opacity: 0;
  /* 从右侧50px位置进入 */
  transform: translateX(50px);
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
  /* 缓动效果更自然 */
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
  /* 回到正常位置 */
}

/* 可选：添加离开动画，使切换更完整 */
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-leave-to {
  opacity: 0;
  /* 向左侧滑出 */
  transform: translateX(-50px);
}
</style>
