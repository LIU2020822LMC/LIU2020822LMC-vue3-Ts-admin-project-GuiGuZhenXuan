<template>
  <div v-if="setting.logoHidden" class="logo">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: aliceblue;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 5px;
  }
  p {
    font-size: $base-menu-logo-text-size;
    margin-left: 5px;
    font-weight: bolder;
  }
}
</style>
