// 该文件的作用：统一管理API
import requests from './ajax';
import mockRequests from './mockAjax';

// !获取三级导航数据 Get请求
export const reqCategoryList = () => {
    // axios发请求，返回Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
};
// !获取banner图数据 Get请求
export const reqBannerList = () => {
    // axios发请求，返回Promise对象
    return mockRequests({ url: '/banner', method: 'get' });
};
// !获取底部banner图数据 Get请求
export const reqFloorList = () => {
    // axios发请求，返回Promise对象
    return mockRequests({ url: '/floor', method: 'get' });
};
// !获取搜索模块数据 Post请求（无法使用）
// 当前这个接口需要给服务器传递一个参数（至少是个空对象）
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });
// !获取详情页数据
export const reqGetDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

// !!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!
// !购物车等未做（接口问题）
// !!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!

// !获取验证码
export const reqGetRegisterCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

// !注册
export const reqGetUserRegister = (infor) => requests({ url: '/user/passport/register', method: 'post', data: infor });
