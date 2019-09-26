'use strict';
const assert = require('assert').strict;
const ScaffoldManager = require('../../../../app/service/scaffold/scaffold_manager');

describe('test/app/service/scaffold/scaffold_manager.test.js', () => {
  it('list', async () => {
    const scaffoldManager = new ScaffoldManager();
    const scaffolds = await scaffoldManager.list();
    assert.strictEqual(scaffolds.length, 3);
  });
});
