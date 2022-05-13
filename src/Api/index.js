// 该文件的作用：统一管理API
import requests from './ajax';
import mockRequests from './mockAjax';
// 三级导航的接口
// 路径：/api/product/getBaseCategoryList
// get请求，无参数

export const reqCategoryList = () => {
    // axios发请求，返回Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
};
export const reqBannerList = () => {
    // axios发请求，返回Promise对象
    return mockRequests({ url: '/banner', method: 'get' });
};
export const reqFloorList = () => {
    // axios发请求，返回Promise对象
    return mockRequests({ url: '/floor', method: 'get' });
};