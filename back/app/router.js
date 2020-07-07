'use strict';

module.exports = app => {
  const { router, controller } = app;
  const payload = app.middlewares.payload();

  router.get('/scaffolds', payload, controller.scaffoldUi.list);
  router.get('/clearCache', payload, controller.scaffoldUi.clearCache);
  router.get('/scaffolds/:scaffoldId', payload, controller.scaffoldUi.detail);
  router.post('/scaffolds/:scaffoldId/generate', controller.scaffoldUi.generate);
  router.post('/scaffolds', payload, controller.scaffoldUi.install);
  router.put('/scaffolds/:scaffoldId', payload, controller.scaffoldUi.update);
  router.delete('/scaffolds/:scaffoldId', payload, controller.scaffoldUi.delete);

  router.post('/login', payload, controller.user.login);
  router.delete('/logout', payload, controller.user.logout);
};
