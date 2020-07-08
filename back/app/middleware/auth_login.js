'use strict';

module.exports = () => {

  return async function testMiddleware(ctx, next) {

    let whiteUrls = ['/scaffolds/user/login', '/scaffolds/user/logout'];
    let blackUrl = ['/scaffolds'];
    let method = ['POST', 'PUT', 'DELETE'];

    let isBlackUrl = blackUrl.some((blackUrl) => ctx.url.startsWith(blackUrl));
    let iswhiteUrl = whiteUrls.some((whiteUrl) => ctx.url == whiteUrl);
    let isMethod = method.some((method) => ctx.accept.negotiator.request.method == method);

    if (isBlackUrl && isMethod && !iswhiteUrl) {
      ctx.logger.debug('authLogin');
      if (ctx.session.userId != ctx.cookies.userId) {
        ctx.redirect('/scaffolds/user/login');
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