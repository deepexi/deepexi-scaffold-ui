#!/usr/bin/env node
'use strict';

const spawn = require('child_process').spawn;
const path = require('path');
const command = require('commander');

command
    .option('-p, --port [port]', '端口号', '7001')
    .option('-w, --workers [workers]', '工作线程', '4')
    .option('-s, --swagger', '是否开启swagger')
    .parse(process.argv);

process.env.PORT = command.port;
process.env.WORKERS = command.workers;
process.env.swagger = !!command.swagger;

const initCmd = spawn('npm', ['run', 'start'],{
    cwd: path.resolve(__dirname, '../')
});
initCmd.stdout.on('data', data => console.log(data.toString()));
initCmd.stderr.on('data', data => console.log(data.toString()));
