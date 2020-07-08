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
      const token = this.ctx.session.token = uuidv1();
      this.ctx.cookies.set('token', token);
      this.ctx.logger.debug('[User] %s --- 登录', token);
      return username;
    }
    throw new UserError('用户名或密码错误!');
  }

  async logout() {
    const token = this.ctx.session.token;
    const userToken = this.ctx.cookies.get('token');
    if (token === userToken) {
      this.ctx.logger.debug('[User] %s --- 登出', token);
      return true;
    }
    throw new UserError('用户未登录!');
  }


}

module.exports = User;
