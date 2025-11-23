import request from '@/utils/request'
import { TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'

// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口地址
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

// 获取已有品牌接口
export const getHasTrademark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}

// 添加与修改已有品牌接口方法
export const AddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

// 删除品牌接口方法
export const deleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETETRADEMARK_URL + id)
}
