<template>
  <el-button icon="Refresh" circle @click="updateRefresh" />
  <el-button icon="FullScreen" circle />
  <el-button icon="Setting" circle />
  <img
    src="../../../../public/logo.png"
    style="width: 28px; height: 28px; margin-left: 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown style="margin-left: 10px">
    <span>
      Admin
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

const LayOutSettingStore = useLayOutSettingStore()
// 刷新按钮
const updateRefresh = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}
</script>

<style scoped></style>
