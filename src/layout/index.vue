<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ collapse: LayOutSettingStore.collapse }"
    >
      <Logo />
      <el-scrollbar class="Scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :default-active="route.path"
          :collapse="LayOutSettingStore.collapse"
          :router="true"
          class="el-menu-dark"
        >
          <Menu :menuList="userStore.menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ collapse: LayOutSettingStore.collapse }"
    >
      <!--layout组件的顶部导航-->
      <tabbar />
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{ collapse: LayOutSettingStore.collapse }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
import Menu from './menu/index.vue'
import Main from '@/views/main/index.vue'
import { useRoute } from 'vue-router'
import tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 获取layout配置相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting'

const route = useRoute()

const userStore = useUserStore()
const LayOutSettingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  overflow: hidden; // 禁止外层滚动
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: linear-gradient(
      180deg,
      var(--menu-gradient-start),
      var(--menu-gradient-end)
    );
    transition: all 0.2s;
    &.collapse {
      width: $base-menu-min-width;
    }
    .Scrollbar {
      height: calc(100vh - #{$base-menu-logo-height});
      /* 保留菜单背景渐变，其他样式按默认处理 */
    }
  }

  .layout_tabbar {
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.2s;
    background-color: #ffffff;
    border-bottom: 1px solid var(--menu-border-color);
    &.collapse {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-tabbar-height});
    background-color: #ffffff;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    box-sizing: border-box; // 避免 padding 造成横向溢出
    right: 0;
    bottom: 0; // 避开顶部与侧边
    transition: all 0.2s;
    border: 1px solid var(--menu-border-color);
    &.collapse {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>

<style>
.el-menu-dark {
  --el-menu-bg-color: #2d3748;
  --el-menu-text-color: #e2e8f0;
  --el-menu-hover-bg-color: #4a5568;
  --el-menu-active-color: #63b3ed;
}

.el-menu-dark .el-sub-menu__title:hover,
.el-menu-dark .el-menu-item:hover {
  background-color: #4a5568 !important;
}

.el-menu-dark .el-menu-item.is-active {
  background-color: #4a5568 !important;
  color: #63b3ed !important;
}
</style>
