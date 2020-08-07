'use strict';

const _ = require('lodash');

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      ctx.logger.info(`[${ctx.request.method}][query=${JSON.stringify(ctx.query || {})}][body=${JSON.stringify(ctx.request.body || {})}]`);
      await next();

    } catch (err) {
      // 注意：自定义的错误统一处理函数捕捉到错误后也要`app.emit('error', err, this)`框架会统一监听，并打印对应的错误日志
      // ctx.app.emit('error', err, this);

      // 自定义错误时异常返回的格式
      ctx.status = err.status || 500; // 默认是404

      // http://blog.csdn.net/rainbow702/article/details/50518171 this.body后会JSON.stringify()
      const _extra_info = _.mapValues(err.extra_info, value => {
        if (typeof value === 'undefined') {
          value = 'undefined'; // undefined -> 'undefined'
        }
        return value;
      });

      if (err.status === 430) {
        ctx.logger.debug(`业务异常：${err.stack || err.message}`);
        ctx.body = {
          code: 0,
          msg: err.message,
          extra_info: _extra_info || '',
          payload: null,
          success: false
        };
      } else {
        // 非业务异常，通知框架
        ctx.app.emit('error', err, this); // 注意：自定义的错误统一处理函数捕捉到错误后也要`app.emit('error', err, this)`框架会统一监听，并打印对应的错误日志
        ctx.body = {
          code: 1,
          msg: ctx.app.config.debug ? (err.stack || err.message) : 'Internal Server Error', // 开启了debug时返回堆栈信息，方便调试
          extra_info: _extra_info || '',
          payload: null,
        };
      }
    }
  };
};
