// SPU管理模块的接口
import request from '@/utils/request'
import {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from './type'

enum API {
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据接口
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性[颜色、版本、尺码]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
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

// 获取全部品牌的数据接口方法
export const getAllTradeMark = () => {
  return request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
}

// 获取某一个已有的SPU下全部商品的图片地址
export const getSpuImageList = (spuId: number) => {
  return request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
}

// 获取某一个SPU下全部的已有的销售属性接口方法
export const getSpuSaleAttrList = (spuId: number) => {
  return request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
}

// 获取全部的销售属性
export const getAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}
