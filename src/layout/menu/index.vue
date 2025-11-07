<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <el-menu-item
        v-if="!item.children && !item.meta.hidden"
        :index="item.path"
        @click="goRouter"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有子路由但是只有一个子路由 -->
      <el-menu-item
        v-if="
          item.children &&
          item.children.length == 1 &&
          !item.children[0].meta.hidden
        "
        :index="item.children[0].path"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有子路由且个数大于一个 -->
      <el-sub-menu
        v-if="item.children && item.children.length > 1 && !item.meta.hidden"
        :index="item.path"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <CustomMenu :menuList="item.children" />
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// 接受父组件传过来的全部路由
defineProps(['menuList'])

const router = useRouter()

// 菜单点击执行函数
const goRouter = (path: any) => {
  router.push(path.index)
}
</script>

<script lang="ts">
export default {
  name: 'CustomMenu',
}
</script>

<style scoped></style>
