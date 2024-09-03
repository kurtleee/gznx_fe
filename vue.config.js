const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      "/api": {  //1：api开头的请求都要求代理服务器进行转发  配置请求代理的规则
        target: 'http://127.0.0.1:8888',   // 2：要求代理服务器
        changeOrigin: true, // 3：是否是跨域请求
        pathRewrite: {
          '^/api': '/' // 4：代理服务器转发时url修改的规则
        }
      }
    }
  }
})