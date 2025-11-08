<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon style="margin-right: 10px">
        <Expand />
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button icon="Refresh" circle />
      <el-button icon="FullScreen" circle />
      <el-button icon="Setting" circle />
      <img
        src="../../../public/logo.png"
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
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
