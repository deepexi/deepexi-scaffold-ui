'use strict';

const Scaffold = require('./scaffold');

module.exports = class ScaffoldManager {

  constructor(ctx) {
    this.ctx = ctx;
  }

  async list() {
    const ids = [ 'generator-deepexi-dubbo', 'generator-deepexi-eggjs', 'generator-deepexi-spring-cloud' ];
    return ids.map(id => this.get(id));
  }

  get(scaffoldId) {
    return new Scaffold(this.ctx, scaffoldId);
  }

};

