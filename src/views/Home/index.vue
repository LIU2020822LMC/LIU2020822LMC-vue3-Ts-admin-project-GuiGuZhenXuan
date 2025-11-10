<template>
  <div>首页</div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(async () => {
  await userStore.GetUserInfo()
})
</script>

<style scoped></style>
