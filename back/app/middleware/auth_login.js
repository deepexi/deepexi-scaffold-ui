'use strict';

module.exports = () => {

  return async function authLogin(ctx, next) {

    let blackUrl = ['/scaffolds', '/scaffolds/generator-deepexi-dubbo', '/scaffolds/generator-deepexi-eggjs',
      '/scaffolds/generator-deepexi-spring-cloud'
    ];
    let method = ['POST', 'PUT', 'DELETE'];

    let isBlackUrl = blackUrl.some((blackUrl) => ctx.url === blackUrl);
    let isMethod = method.some((method) => ctx.accept.negotiator.request.method === method);

    if (isBlackUrl && isMethod) {
      ctx.logger.debug('authLogin');
      if (!ctx.cookies.userId) {
        ctx.body = {
          code: 0,
          msg: '无操作权限',
          extra_info: '',
          payload: null,
          success: false
        };
      } else {
        ctx.logger.debug('auth ok');
        await next();
      }
    } else {
      ctx.logger.debug('white url');
      await next();
    }
  };
};
