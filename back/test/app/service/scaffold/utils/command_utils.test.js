'use strict';

const assert = require('assert').strict;
const CommandUtils = require('../../../../../app/service/scaffold/utils/command_utils');

describe('test/app/service/scaffold/utils/command_utils.test.js', () => {
  it('execCommand', async () => {
    const rs = await CommandUtils.execCommand('cd ./');
    assert.strictEqual(rs.code, 0);
  });
});
