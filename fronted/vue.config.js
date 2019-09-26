module.exports = {
  outputDir: '../back/app/public',
  devServer: {
    host: '0.0.0.0',
    port: '10086',
    proxy: {
      '/scaffolds': {
        target: 'http://192.168.3.188:7001'
      }
    }
  },
  lintOnSave: true
}

