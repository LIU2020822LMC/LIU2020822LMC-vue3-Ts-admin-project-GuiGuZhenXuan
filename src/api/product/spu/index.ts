// SPU管理模块的接口
import request from '@/utils/request'
import { HasSpuResponseData } from './type'

enum API {
  HASSPU_URL = '/admin/product/',
}

// 获取SPU分页列表接口方法
export const getHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}`,
    {
      // Query参数：category3Id放在params里
      params: {
        category3Id,
      },
    },
  )
}
