'use strict';

// 鲁棒性
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', err => {
  console.error('Unexpected exception: %s', err);
  console.error('Unexpected exception stack: %s', err.stack);
});

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
  }

};
