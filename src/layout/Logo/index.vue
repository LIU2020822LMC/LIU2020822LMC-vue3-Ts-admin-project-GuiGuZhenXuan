<template>
  <div v-if="setting.logoHidden" class="logo">
    <img :src="setting.logo" alt="" />
    <p v-if="!LayOutSettingStore.collapse">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'

const LayOutSettingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: var(--el-text-color-primary);
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  p {
    font-size: $base-menu-logo-text-size;
    color: azure;
    margin-left: 5px;
    font-weight: 600;
    letter-spacing: 0.2px;
  }
}
</style>
