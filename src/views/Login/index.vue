<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :rules="rules"
          ref="loginFormRef"
          :model="LoginForm"
        >
          <h1>Hello</h1>
          <h2>欢迎来到潮选 Pro</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="LoginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="LoginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login_btn"
              @click="LoginBtn(LoginForm)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { loginForm } from '@/api/user/type'
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import getDateTime from '@/utils/time'

const userStore = useUserStore()
// 收集账号与密码的数据
const LoginForm = ref({
  username: '',
  password: '',
})

// 登录表单的引用
const loginFormRef = ref()

const router = useRouter()
const route = useRoute()

// 加载判断
const loading = ref(false)

// 登录按钮回调
const LoginBtn = async (LoginForm: loginForm) => {
  try {
    // 保证全部表单校验通过再发请求
    await loginFormRef.value.validate()
    loading.value = true
    await userStore.getLogin(LoginForm)
    // 判断登录的时候，路由路径当中是否有query参数，如果有就往query参数跳转，没有就跳到首页
    const redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      title: `Hi, ${getDateTime()}`,
      message: '登陆成功',
      type: 'success',
      duration: 1500,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      message: (error as Error).message,
      type: 'error',
      duration: 1500,
    })
  }
}

// 登陆表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符', trigger: 'blur' },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  height: 100vh;
  width: 100%;
  background: url('@/assets/images/background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-row {
    width: 100%;
  }

  .login_form {
    width: 80%;
    max-width: 450px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 16px;
    background: rgba(242, 240, 243, 0.85);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 0.5s ease-out;

    h1 {
      font-size: 28px;
      font-weight: bold;
      color: var(--el-color-primary);
      text-align: center;
      margin-bottom: 8px;
    }

    h2 {
      font-size: 16px;
      color: var(--el-text-color-secondary);
      text-align: center;
      margin-bottom: 25px;
    }

    .el-form-item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(.el-input) {
      --el-input-hover-border: var(--el-color-primary);

      .el-input__wrapper {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        padding: 8px 16px;
        transition: all 0.3s ease;

        &:hover,
        &.is-focus {
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .login_btn {
      width: 100%;
      height: 45px;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 2px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--el-color-primary-rgb), 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 移动端适配
@media screen and (max-width: 768px) {
  .login_container {
    padding: 20px;

    .login_form {
      width: 100%;
      padding: 20px;
    }
  }
}
</style>
