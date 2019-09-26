'use strict';

const ScaffoldManager = require('./scaffold/scaffold_manager');


module.exports = app => {

  class ScaffoldUiService extends app.Service {

    constructor(app) {
      super(app);
      this.scaffoldManager = new ScaffoldManager(this.ctx);
    }

    async list() {
      const scaffolds = await this.scaffoldManager.list();
      const promise = scaffolds.map(scaffold => scaffold.detail());
      return await Promise.all(promise);
    }

    async detail(scaffoldId) {
      const scaffold = this.scaffoldManager.get(scaffoldId);
      const data = await scaffold.detail();
      if (data) {
        data.form = await scaffold.getForm();
      }
      return data;
    }

    async generate(scaffoldId, answers) {
      const scaffold = this.scaffoldManager.get(scaffoldId);
      const options = { answers };
      return await scaffold.generate(options);
    }

    async update(scaffoldId) {
      const scaffold = this.scaffoldManager.get(scaffoldId);
      await scaffold.update();
    }

    async install(scaffoldId) {
      const scaffold = this.scaffoldManager.get(scaffoldId);
      await scaffold.install();
    }

    async delete(scaffoldId) {
      const scaffold = this.scaffoldManager.get(scaffoldId);
      await scaffold.delete();
    }

  }

  return ScaffoldUiService;

};

