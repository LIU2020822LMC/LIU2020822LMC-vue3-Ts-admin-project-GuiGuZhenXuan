<script setup lang="ts">
import { Login } from '@/api/user'
import { onMounted } from 'vue'

onMounted(() => {
  Login({
    username: 'system',
    password: '111111',
  })
})
</script>

<template>
  <h1>Svg图标测试</h1>
</template>

<style scoped lang="scss">
h1 {
  color: $color;
}
</style>
