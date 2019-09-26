'use strict';
/* eslint-disable no-unused-vars */

const body = require('deepexi-body');

module.exports = (opt, app) => {
  return async function payload(ctx, next) {
    await next();
    if (ctx.status >= 200 && ctx.status < 300) {
      ctx.body = body.success(ctx.body || '', '操作成功');
    }
  };
};
