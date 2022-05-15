const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭语法检测
    lintOnSave: false,
    // 代理服务器（跨域）
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn/',
            },
        },
    },
});
