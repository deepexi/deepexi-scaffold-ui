#!/usr/bin/env node

'use strict';

process.title = 'scaffold-ui';
require('commander')
    .usage('<command> [options]')
    .version(require('../package').version)
    .description('脚手架UI工具')
    .command('init', '初始化脚手架UI')
    .command('start', '启动脚手架UI')
    .command('stop', '停止脚手架UI')
    .parse(process.argv);
