// 使用mockjs提供mock数据接口

import Mock from 'mockjs'
import data from './data'

//返回商铺列表的接口
Mock.mock('/goods',{code:0,data:data.goods})
//返回评价列表的接口
Mock.mock('/ratings',{code:0,data:data.ratings})
//返回商家信息的接口
Mock.mock('/info',{code:0,data:data.info})
