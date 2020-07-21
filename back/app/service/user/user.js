'use strict';

const {
  UserError,
} = require('../../error/common_error');
var crypto = require('crypto');
const adminName = 'admin';
const adminPassWord = 'admin';

class User {

  constructor(ctx, id) {
    this.ctx = ctx;
    this.id = id;
  }

  async login(username, password) {
    if (username === adminName && password === adminPassWord) {
      const userId = this.ctx.session.userId = this._crypt(adminName + adminPassWord);;
      this.ctx.cookies.set('userId', userId, {
        maxAge: 1000 * 60 * 60 * 24
      });
      this.ctx.logger.debug('[User] %s --- 登录', userId);
      return username;
    }
    throw new UserError('用户名或密码错误!');
  }

  async logout() {
    const userId = this.ctx.session.userId;
    const userUserId = this.ctx.cookies.get('userId');
    if (userId === userUserId) {
      this.ctx.logger.debug('[User] %s --- 登出', userUserId);
      return true;
    }
    throw new UserError('用户未登录!');
  }

  _crypt(waitCrypto) {
    var md5 = crypto.createHash('md5');
    return md5.update(waitCrypto).digest('hex');
  }

}

module.exports = User;
