module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/auth': {
        target: 'http://127.0.0.1:5001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      }
    }
  }
};
