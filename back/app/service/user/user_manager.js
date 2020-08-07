'use strict';

const User = require('./user');
const uuidv1 = require('uuid/v1');

module.exports = class UserManager {

  constructor(ctx) {
    this.ctx = ctx;
  }

  current() {
    const userId = this.ctx.session.userId;
    return new User(this.ctx, userId);
  }

  buildUser() {
    return new User(this.ctx, uuidv1);
  }

};
