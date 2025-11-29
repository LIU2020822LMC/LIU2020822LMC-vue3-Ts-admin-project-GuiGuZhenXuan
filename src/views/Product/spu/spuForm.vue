<template>
  <el-card style="margin: 10px 0px">
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请你输入SPU名称" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select style="width: 200px">
          <el-option label="华为" value=""></el-option>
          <el-option label="魅族" value=""></el-option>
          <el-option label="小米" value=""></el-option>
          <el-option label="苹果" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请你输入SPU描述"
          style="width: 400px"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select style="width: 200px">
          <el-option label="华为" value=""></el-option>
          <el-option label="魅族" value=""></el-option>
          <el-option label="小米" value=""></el-option>
          <el-option label="苹果" value=""></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="PLus"
          style="margin-left: 10px"
        >
          添加属性值
        </el-button>
      </el-form-item>
    </el-form>
    <!-- table展示销售属性与属性值的地方 -->
    <el-table border :style="{ margin: '10px 0' }">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column label="销售属性名字" width="120px"></el-table-column>
      <el-table-column label="销售属性值"></el-table-column>
      <el-table-column label="操作" width="120px"></el-table-column>
    </el-table>
    <el-button type="primary" size="default">保存</el-button>
    <el-button size="default" @click="Cancel">取消</el-button>
  </el-card>
</template>

<script setup lang="ts">
const $emit = defineEmits(['changeScene'])

const Cancel = () => {
  $emit('changeScene', 0)
}
</script>

<style scoped></style>
