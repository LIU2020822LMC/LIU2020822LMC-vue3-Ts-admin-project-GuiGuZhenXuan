<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          plain
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border :style="{ margin: '10px 0px' }" :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="attrValueList">
            <template #default="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
                type="primary"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="edit"
                circle
                plain
                @click="updateAttr(row.id)"
              />
              <el-button
                type="danger"
                size="small"
                icon="delete"
                circle
                plain
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form :inline="true" style="margin: 10px 0px">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请你输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="small"
          plain
          icon="Plus"
          :disabled="!attrParams.attrName"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button size="small" plain @click="Cancel">取消</el-button>
        <el-table
          border
          :style="{ margin: '10px 0px' }"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input
                placeholder="请你输入属性值名称"
                v-model="row.valueName"
                v-if="row.flag"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="edit"
                circle
                plain
                @click="updateAttr(row.id)"
              />
              <el-button
                type="danger"
                size="small"
                icon="delete"
                circle
                plain
              />
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="small"
          plain
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button size="small" plain @click="Cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 组合式API函数watch
import { watch, ref, reactive } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { getAttr, addOrUpdateAttr } from '@/api/product/attr'
import { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()
// 存储已有的属性与属性值
const attrArr = ref<Attr[]>([])

// 定义card组件内容切换变量
const scene = ref<number>(0) // 0：显示table，1：展示添加与修改属性结构

// 监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查询的属性与属性值
    attrArr.value = []
    // 保证三级分类得才能发请求
    if (!categoryStore.c3Id) return
    GetAttr()
  },
)

// 获取已有的属性与属性值方法
const GetAttr = async () => {
  // 获取分类的ID
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await getAttr(c1Id, c2Id, c3Id)
  if (res.code == 200) {
    attrArr.value = res.data
  }
}

// 添加属性按钮的回调
const addAttr = () => {
  // 每一次点击的时候，先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: '', // 新增的属性的名字
    attrValueList: [], // 新增的属性值数组
    categoryId: categoryStore.c3Id, // 三级分类的ID
    categoryLevel: 3,
  })
  scene.value = 1
}

// table表格修改已有属性按钮的回调
const updateAttr = (id: number) => {
  console.log(id)
  scene.value = 1
}

// 取消添加属性按钮的回调
const Cancel = () => {
  scene.value = 0
}

// 收集新增的属性的数据
const attrParams = reactive<Attr>({
  attrName: '', // 新增的属性的名字
  attrValueList: [], // 新增的属性值数组
  categoryId: '', // 三级分类的ID
  categoryLevel: 3,
})

// 添加属性值按钮的回调
const addAttrValue = () => {
  // 点击添加属性值按钮的时候，向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
}

// 属性值保存按钮回调函数
const save = async () => {
  const res = await addOrUpdateAttr(attrParams)
  if (res.code == 200) {
    // 切换场景
    scene.value = 0
    // 获取全部已有的属性与属性值
    GetAttr()
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}

// 属性值表单元素失去焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况判断1
  if (row.valueName.trim() == '') {
    // 删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能为空')
    return
  }
  // 非法情况判断2(判断重复的元素)
  const repeat = attrParams.attrValueList.find((item) => {
    // 排除当前元素自己，并判断是否有相同的属性值
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能重复')
    return
  }

  row.flag = false
}

// 属性值div点击事件
const toEdit = (row: AttrValue) => {
  row.flag = true
}
</script>

<style scoped></style>
