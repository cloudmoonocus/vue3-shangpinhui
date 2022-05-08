// 该文件的作用：统一管理API
import requests from './request';

// 三级导航的接口
// 路径：/api/product/getBaseCategoryList
// get请求，无参数

export const reqCategoryList = () => {
    // axios发请求，返回Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
};
