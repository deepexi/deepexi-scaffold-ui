#!/usr/bin/env node
'use strict';

const spawn = require('child_process').spawn;
const path = require('path');
const command = require('commander');

command
    .option('-p, --port [port]', '端口号', '7001')
    // .option('-w, --workers [workers]', '工作线程（非Debug模式下有效）', '2')
    .option('-s, --swagger', '是否开启swagger')
    .option('-d, --debug', '是否开启调试模式')
    .parse(process.argv);

process.env.PORT = command.port;
// process.env.WORKERS = command.workers;
process.env.swagger = !!command.swagger;
process.env.debug = !!command.debug;

let startCmd;
if(!!command.debug){
    startCmd = spawn('npm', ['run', 'dev'],{
        cwd: path.resolve(__dirname, '../')
    });
}else {
    startCmd = spawn('npm', ['run', 'start'],{
        cwd: path.resolve(__dirname, '../')
    });
}
startCmd.stdout.on('data', data => console.log(data.toString()));
startCmd.stderr.on('data', data => console.log(data.toString()));
