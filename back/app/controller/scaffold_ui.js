'use strict';

const Controller = require('egg/index').Controller;
const fs = require('fs');

/**
 * @Controller ScaffoldUI
 */
class ScaffoldUiController extends Controller {

  /**
   * @Summary 获取脚手架列表
   * @Router GET /scaffolds
   * @Response 200 list 脚手架基本信息列表
   */
  async list() {
    const { ctx, service } = this;
    ctx.body = await service.scaffoldUi.list();
  }

  /**
   * @Summary 获取脚手架详情
   * @Router GET /scaffolds/{scaffoldId}
   * @Request path string scaffoldId 脚手架Id
   * @Response 200 detail 脚手架详情
   */
  async detail() {
    const { ctx, service } = this;
    ctx.body = await service.scaffoldUi.detail(ctx.params.scaffoldId);
  }

  /**
   * @Summary 脚手架生成代码
   * @Router POST /scaffolds/{scaffoldId}/generate
   * @Request path string scaffoldId 脚手架Id
   * @Request body answers 表单答案
   * @Response 200
   */
  async generate() {
    const { ctx, service } = this;
    const tarPath = await service.scaffoldUi.generate(ctx.params.scaffoldId, ctx.request.body);
    ctx.attachment('project.zip');
    ctx.body = fs.createReadStream(tarPath);
  }

  /**
   * @Summary 更新脚手架
   * @Router PUT /scaffolds/{scaffoldId}
   * @Request path string scaffoldId 脚手架Id
   * @Response 200
   */
  async update() {
    const { ctx, service } = this;
    await service.scaffoldUi.update(ctx.params.scaffoldId);
    ctx.body = '脚手架更新成功';
  }

  /**
   * @Summary 安装脚手架
   * @Router POST /scaffolds
   * @Request body install 脚手架信息
   * @Response 200
   */
  async install() {
    const { ctx, service } = this;
    await service.scaffoldUi.install(ctx.request.body.id);
    ctx.body = '脚手架安装成功';
  }

  /**
   * @Summary 删除脚手架
   * @Router DELETE /scaffolds/{scaffoldId}
   * @Request path string scaffoldId 脚手架Id
   * @Response 200
   */
  async delete() {
    const { ctx, service } = this;
    await service.scaffoldUi.delete(ctx.params.scaffoldId);
    ctx.body = '脚手架删除成功';
  }

  /**
   * @Summary 清理脚手架缓存信息
   * @Router GET /clearCache
   * @Response 200
   */
  async clearCache() {
    this.ctx.app.scaffoldCacheMap.clear();
    this.ctx.body = '脚手架缓存信息清理成功';
  }

}

module.exports = ScaffoldUiController;

