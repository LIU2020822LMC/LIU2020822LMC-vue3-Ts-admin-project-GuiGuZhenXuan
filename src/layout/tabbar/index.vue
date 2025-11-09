<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon class="collapse-icon" @click="Collapse">
        <component
          :is="LayOutSettingStore.collapse ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
      <!-- 左侧面包屑 -->
      <breadcrumb />
    </div>
    <div class="tabbar_right">
      <setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumb from '../tabbar/breadcrumb/index.vue'
import setting from '../tabbar/setting/index.vue'
import useLayOutSettingStore from '@/store/modules/setting'

const LayOutSettingStore = useLayOutSettingStore()

// 点击折叠图标的方法
const Collapse = () => {
  LayOutSettingStore.collapse = !LayOutSettingStore.collapse
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
    .collapse-icon {
      margin-right: 10px;
      cursor: pointer;
      /* 鼠标悬浮时显示“手指” */
      transition:
        color 0.2s ease,
        transform 0.2s ease;
      /* 颜色和缩放的过渡动画 */
    }
    /* 鼠标悬浮时：高亮 + 轻微放大 */
    .collapse-icon:hover {
      color: #409eff;
      /* 高亮颜色（可根据项目主题色调整） */
      transform: scale(1.05);
      /* 轻微放大，增强交互反馈 */
    }
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
