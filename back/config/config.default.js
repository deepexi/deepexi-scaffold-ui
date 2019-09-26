'use strict';

const path = require('path');
const onerror = require('deepexi-onerror');

module.exports = appInfo => {

  const config = exports = {};

  // 应用需要的自定义配置建议统一写在这里
  const userConfig = {
    context: appInfo.name,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1559316688233_5201';

  config.bodyParser = {
    jsonLimit: '10mb',
  };

  config.onerror = onerror();

  config.security = {
    enable: false,
    csrf: {
      ignoreJSON: true,
    },
  };

  config.middleware = [
    'requestLogger',
    'compress',
  ];

  config.requestLogger = {
    enable: true,
  };

  config.compress = {
    threshold: 2048,
    enable: true,
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    outputJSON: true,
  };

  config.swaggerdoc = {
    enable: process.env,
    dirScanner: './app/controller',
    apiInfo: {
      title: appInfo.name + ' Api Docs',
      description: 'Deepexi脚手架UI接口',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    enableValidate: false,
    routerMap: false,
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    maxAge: 0,
    buffer: false,
  };


  return {
    ...config,
    ...userConfig,
  };
};
