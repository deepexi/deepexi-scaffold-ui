'use strict';

const assert = require('assert').strict;
const StringUtils = require('../../../../../app/service/scaffold/utils/string_utils');

describe('test/app/service/scaffold/utils/string_utils.test.js', () => {
  it('eliminateLineBreak', () => {
    const str = StringUtils.eliminateLineBreak('hello\n\r\nworld');
    assert.strictEqual(str, 'helloworld');
  });
});
