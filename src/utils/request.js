import axios from "axios"
import { uPop, util } from "@plugin/tool-common"
import Qs from "qs"
/**
 * @method 公共头部
 */
const commonHeader = () => {
  return {
    //h5唯一设备码
    ClientUuid: util.local('CLIENTUUID') || util.ReadCookie('CLIENTUUID') || '',
  }
}

const nAxios = axios.create({
  //请求baseurl
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  }
});
//请求拦截器
nAxios.interceptors.request.use((config) => {
  Object.assign(config.headers, commonHeader());
  uPop.loading();
  return config
})

//响应拦截器
nAxios.interceptors.response.use((Response) => {
  uPop.close();
  return Response.data
}, (error) => {
  uPop.close();
  uPop.msg('网络错误，请稍后重试');
  return Promise.reject(error);
})
/**
 * @method Get请求
 * @param url 接口地址
 * @param data 参数
 * @param config 配置
 */
const Get = (url = "", data = {}, config = {}) => {
  let params = Qs.stringify(data);
  if (params) {
    let mark = url.indexOf('?') > -1 ? "&" : "?";
    url += `${mark}${params}`
  }
  return nAxios.get(url, config)
}

/**
 * @method Post请求
 * @param url  接口地址
 * @param data 参数
 * @param config 配置
 */
const Post = (url, data = {}, config = {}) => {
  //当post请求头为x-www-form-urlencoded 需要序列化为表单参数
  let transData = Qs.stringify(data);
  return nAxios.post(url, transData, config);
}


export {
  nAxios,
  Get,
  Post
}
