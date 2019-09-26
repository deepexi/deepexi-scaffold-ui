'use strict';

const assert = require('assert').strict;
const CommandUtils = require('../../../../../app/service/scaffold/utils/command_utils');

describe('test/app/service/scaffold/utils/string_utils.test.js', () => {
  it('execCommand', async () => {
    const rs = await CommandUtils.execCommand('ls');
    assert.strictEqual(rs.code, 0);
  });
});
