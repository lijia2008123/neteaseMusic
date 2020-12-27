module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api/*": {
        target: 'http://192.168.137.83:3000/',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}