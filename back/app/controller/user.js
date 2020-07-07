'use strict';

const Controller = require('egg/index').Controller;


/**
 * @Controller User
 */
class UserController extends Controller {

  /**
   * @Summary 用户登录
   * @Router POST /login
   * @Response 200
   */
  async login() {
    const { ctx, service } = this;
    await service.user.login(ctx.request.body.username, ctx.request.body.password);
    ctx.body = '用户登录成功';
  }

  /**
   * @Summary 用户登出
   * @Router Delete /logout
   * @Response 200
   */
  async logout() {
    const { ctx, service } = this;
    await service.user.logout();
    ctx.body = '用户登出成功';
  }

}

module.exports = UserController;
