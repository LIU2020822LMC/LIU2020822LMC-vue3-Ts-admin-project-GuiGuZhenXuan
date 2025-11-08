<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo />
      <el-scrollbar class="Scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="#005bea"
          text-color="#fdfdfd"
          :default-active="route.path"
        >
          <Menu :menuList="userStore.menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <!--layout组件的顶部导航-->
      <tabbar />
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
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

const route = useRoute()

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  overflow: hidden; // 禁止外层滚动
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bg-color;
    .Scrollbar {
      height: calc(100vh - #{$base-menu-logo-height});
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    position: fixed;
    top: 0px;
    left: $base-menu-width;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-tabbar-height});
    background-color: #8ef6e4;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    box-sizing: border-box; // 避免 padding 造成横向溢出
    right: 0;
    bottom: 0; // 避开顶部与侧边
  }
}
</style>
