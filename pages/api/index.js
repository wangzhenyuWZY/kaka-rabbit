import { getRequest, postRequest, postParamsRequest, putRequest, deleteRequest,
} from './require.js'
const base = '';
// 接口应用举例
export const requst_post_login = data => postRequest(`/login`, data);  //登录
export const requst_get_info = data => getRequest(`/user/info`, data); //用户信息
export const requst_post_adopt = data => postRequest(`/pet/adopt`, data);   //领取狗子
export const requst_get_dogeinfo = data => getRequest(`/user/pet/infos`, data); //查看狗子信息
export const requst_get_iteminfo = data => getRequest(`/user/item/infos`, data); //道具列表
export const requst_post_checkin = data => postRequest(`/day/checkin`, data);   //用户签到
export const requst_get_message = data => getRequest(`/user/message`, data); //动态
export const requst_post_feeding = data => postRequest(`/pet/feeding`, data);   //喂狗子
