module.exports = {
  outputDir: '../back/app/public',
  devServer: {
    host: '0.0.0.0',
    port: '10086',
    proxy: {
      '/scaffolds': {
        target: 'http://127.0.0.1:7001'
      }
    }
  },
  lintOnSave: true
}
