'use strict';

class StringUtils {

  static eliminateLineBreak(str) {
    if (typeof str !== 'string') {
      return null;
    }
    return str.replace(/[\n\r]/g, '');
  }

}

module.exports = StringUtils;
