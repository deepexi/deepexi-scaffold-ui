'use strict';

const Controller = require('egg/index').Controller;


/**
 * @Controller User
 */
class UserController extends Controller {

  /**
   * @Summary 用户登录
   * @Request body login 登录信息
   * @Router POST /scaffolds/user/login
   * @Response 200
   */
  async login() {
    const {ctx, service} = this;
    ctx.body = await service.user.login(ctx.request.body.username, ctx.request.body.password);
  }

  /**
   * @Summary 用户登出
   * @Router Delete /scaffolds/user/logout
   * @Response 200
   */
  async logout() {
    const { ctx, service } = this;
    await service.user.logout();
    ctx.body = '用户登出成功';
  }

}

module.exports = UserController;
