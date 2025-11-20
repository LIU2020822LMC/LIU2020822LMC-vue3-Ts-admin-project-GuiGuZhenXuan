<template>
  <div>
    <el-card>
      <!-- 添加按钮 -->
      <el-button type="primary" plain icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <!-- 表格组件 -->
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <el-table-column label="品牌名称" prop="tmName" align="center" />
        <el-table-column label="品牌LOGO" align="center">
          <template v-slot="{ row }">
            <img
              :src="row.logoUrl"
              alt="图片资源未正确加载"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              circle
              plain
              @click="updateTrademark(row)"
            />
            <el-button type="danger" size="small" icon="delete" circle plain />
          </template>
        </el-table-column>
        <!-- 空状态组件 - 使用 empty 插槽 -->
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[1, 3, 5, 10, 15, 20]"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="GetHasTrademark"
      />
    </el-card>

    <!-- 对话框组件 -->
    <el-dialog
      v-model="dialogVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      width="500"
    >
      <!-- 表单组件 -->
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="/upload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            name="image"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
              alt="图片资源加载失败"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 -->
      <template #footer>
        <el-button type="primary" @click="OKBtn">确定</el-button>
        <el-button @click="Cancel">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getHasTrademark, AddOrUpdateTrademark } from '@/api/product/trademark'
import {
  TradeMarkResponseData,
  Records,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

// 当前页面
const currentPage = ref<number>(1)
// 每一页展示多少条数据
const pageSize = ref<number>(3)
// 存储已有品牌数据总数
const total = ref<number>(0)
// 存储已有品牌的数据
const trademarkArr = ref<Records>([])
// 对话框显示
const dialogVisible = ref<boolean>(false)

// 获取已有品牌数据函数
const GetHasTrademark = async (pager = 1) => {
  const res: TradeMarkResponseData = await getHasTrademark(
    (currentPage.value = pager),
    pageSize.value,
  )
  if (res.code == 200) {
    trademarkArr.value = res.data.records
    total.value = res.data.total
  }
}

// 编辑更新按钮
const updateTrademark = (row: TradeMark) => {
  dialogVisible.value = true
  // ES6语法合并对象
  Object.assign(trademarkParams, row)
}

// 添加品牌按钮的回调
const addTrademark = () => {
  // 清空表单的数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 打开对话框
  dialogVisible.value = true
}

// 定义手机新增品牌数据
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

// 改变页面显示数据多少的函数
const handleSizeChange = () => {
  GetHasTrademark()
}

// 添加品牌的确定与取消按钮
const Cancel = () => {
  dialogVisible.value = false
}
const OKBtn = async () => {
  const res: any = await AddOrUpdateTrademark(trademarkParams)
  if (res.code == 200) {
    // 再次获取全部品牌数据，修改品牌的话就回到修改的那个品牌的页面
    await GetHasTrademark(trademarkParams.id ? currentPage.value : 1)
    dialogVisible.value = false
    ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
  } else {
    dialogVisible.value = false
    ElMessage.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败')
  }
}

// 上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('上传图片文件格式必须是png、jpg、gif')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片文件大小不能超过4M')
    return false
  }
  return true
}

// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
}

onMounted(() => {
  GetHasTrademark()
})
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
