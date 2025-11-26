import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData } from './type'

// 商品分类接口
enum API {
  // 获取一级分类接口
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类接口
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类接口
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下已有的属性与属性值
  ATTR_URl = '/admin/product/attrInfoList/',
}

// 获取一级分类接口的方法
export const getC1 = () => {
  return request.get<any, CategoryResponseData>(API.C1_URL)
}

// 获取二级分类接口的方法
export const getC2 = (category1Id: number | string) => {
  return request.get<number | string, CategoryResponseData>(
    API.C2_URL + category1Id,
  )
}

// 获取三级分类接口的方法
export const getC3 = (category2Id: number | string) => {
  return request.get<number | string, CategoryResponseData>(
    API.C3_URL + category2Id,
  )
}

// 获取对应分类下已有的属性与属性值接口
export const getAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) => {
  return request.get<number | string, AttrResponseData>(
    API.ATTR_URl + `${category1Id}/${category2Id}/${category3Id}`,
  )
}
