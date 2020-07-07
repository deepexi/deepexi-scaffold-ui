'use strict';

const UserManager = require('./user/user_manager');


module.exports = app => {


  class UserService extends app.Service {

    constructor(app) {
      super(app);
      this.UserManager = new UserManager(this.ctx);
    }

    async login(username, password) {
      const user = this.UserManager.buildUser();
      await user.login(username, password);
    }

    async logout() {
      const user = this.UserManager.current();
      await user.logout();
    }

  }


  return UserService;

};
