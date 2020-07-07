'use strict';
const { app, assert } = require('egg-mock/bootstrap');
const fs = require('fs');
const Scaffold = require('../../../../app/service/scaffold/scaffold');

describe('test/app/service/scaffold/scaffold.integration.test.js', () => {

  let scaffold;
  let ctx;

  before(() => {
    ctx = app.mockContext();
    app.scaffoldCacheMap = new Map();
    scaffold = new Scaffold(ctx, 'generator-deepexi-dubbo');
  });

  it('install', async () => {
    const isInstall = await scaffold.isInstall();
    if (isInstall) {
      await scaffold.delete();
    }
    await scaffold.install();
    assert(await scaffold.isInstall());
  });

  it('detail', async () => {
    const detail = await scaffold.detail();
    assert(detail);
  });

  /* it('generate', async () => {
    const gzipPath = await scaffold.generate({
      answers: {
        groupId: 'com.deepexi',
        artifactId: 'test',
      },
    });
    assert(fs.existsSync(gzipPath));
  });*/

  // it('getForm', async () => {
  //   assert(await scaffold.getForm());
  // });
  //
  // it('getDescription', async () => {
  //   assert(await scaffold.getDescription());
  // });

  it('getPackageInfo', async () => {
    assert(await scaffold.getPackageInfo());
  });

  it('delete', async () => {
    await scaffold.delete();
    assert(!await scaffold.isInstall());
  });
});
