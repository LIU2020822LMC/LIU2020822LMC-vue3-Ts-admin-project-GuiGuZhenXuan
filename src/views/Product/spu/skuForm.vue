<template>
  <el-card style="margin: 10px 0px">
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input placeholder="价格（元）" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量（g）">
        <el-input placeholder="重量（g）" type="number"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input placeholder="SKU描述" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item label="内存">
            <el-select>
              <el-option label="8GB" value="8GB"></el-option>
              <el-option label="16GB" value="16GB"></el-option>
              <el-option label="32GB" value="32GB"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border>
          <el-table-column
            type="selection"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="图片"></el-table-column>
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
const $emit = defineEmits(['changeScene'])

// 取消按钮回调
const cancel = () => {
  // 点击取消按钮切换场景为
  $emit('changeScene', { flag: 0, params: '' })
}
</script>

<style scoped></style>
