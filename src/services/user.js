
import {Get,Post} from "@/utils/request"
//获取用户信息
export const getUserInfo = (data = {} )=>{
  return Get('/mock/getUserInfo',data,{
    headers:{
      "customHeader":"test"
    }
  })
}
