'use strict';

const {
  UserError,
} = require('../../error/common_error');

const uuidv1 = require('uuid/v1');

const adminName = 'admin';
const adminPassWord = 'admin';

class User {

  constructor(ctx, id) {
    this.ctx = ctx;
    this.id = id;
  }

  async login(username, password) {
    if (username === adminName && password === adminPassWord) {
      const userId = this.ctx.session.userId = uuidv1();
      this.ctx.cookies.set('userId', userId);
      this.ctx.logger.debug('[User] %s --- 登录', userId);
      return username;
    }
    throw new UserError('用户名或密码错误!');
  }

  async logout() {
    const userId = this.ctx.session.userId;
    const userUserId = this.ctx.cookies.get('userId');
    if (userId  === userUserId) {
      this.ctx.logger.debug('[User] %s --- 登出', userUserId);
      return true;
    }
    throw new UserError('用户未登录!');
  }


}

module.exports = User;
