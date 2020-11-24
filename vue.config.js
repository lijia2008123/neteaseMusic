module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api/*": {
        target: 'http://192.168.3.252:3000/',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}