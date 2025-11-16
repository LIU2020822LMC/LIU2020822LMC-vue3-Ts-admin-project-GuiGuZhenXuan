import request from '@/utils/request'
import { TradeMarkResponseData } from '@/api/product/trademark/type'

// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口地址
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

// 获取已有品牌接口
export const getHasTrademark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}
