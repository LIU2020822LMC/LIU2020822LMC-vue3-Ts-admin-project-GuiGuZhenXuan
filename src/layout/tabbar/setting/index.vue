<template>
  <!-- 刷新按钮 -->
  <el-tooltip content="刷新" placement="bottom">
    <el-button icon="Refresh" circle @click="updateRefresh" />
  </el-tooltip>

  <!-- 全屏按钮 -->
  <el-tooltip :content="fullScreenText" placement="bottom">
    <el-button icon="FullScreen" circle @click="fullScreen" />
  </el-tooltip>

  <!-- 设置按钮 -->
  <el-tooltip content="设置" placement="bottom">
    <el-button icon="Setting" circle />
  </el-tooltip>
  <img
    :src="userStore.avatar"
    style="width: 28px; height: 28px; margin-left: 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown style="margin-left: 10px">
    <span>
      {{ userStore.username }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'

const LayOutSettingStore = useLayOutSettingStore()
// 刷新按钮回调
const updateRefresh = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}
// 全屏按钮提示文字
const fullScreenText = ref('全屏模式')
// 全屏按钮点击的回调
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏模式[全屏：true,不是全屏：false]
  const full = document.fullscreenElement
  if (!full) {
    // 文档根节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
    fullScreenText.value = '退出全屏'
  } else {
    // 变为不是全屏模式->退出全屏模式
    document.exitFullscreen()
    fullScreenText.value = '全屏模式'
  }
}
const userStore = useUserStore()
</script>

<style scoped></style>
