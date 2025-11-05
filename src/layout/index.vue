<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo />
      <el-scrollbar height="Scrollbar">
        <el-menu background-color="#005bea" text-color="#fdfdfd">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>
          <el-sub-menu index="3">
            <template #title>权限管理</template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单设置</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">铭铭铭</div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <p style="height: 10000px; background-color: blue">我是一个前端开发者</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
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
    }
  }

  .layout_tabbar {
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    background-color: #146ada;
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
