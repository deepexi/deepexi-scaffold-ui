'use strict';

const { exec } = require('child_process');

class CommandUtils {

  static async execCommand(command, options) {
    return await new Promise(resolve => {
      let stdout = '';
      let stderr = '';
      const ls = exec(command, options);
      ls.stdout.on('data', data => {
        stdout += data;
      });
      ls.stderr.on('data', data => {
        stderr += data;
      });
      ls.on('close', code => {
        return resolve({ code, stdout, stderr });
      });
    });
  }

}

module.exports = CommandUtils;
