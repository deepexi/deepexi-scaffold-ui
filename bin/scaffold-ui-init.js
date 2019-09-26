#!/usr/bin/env node
'use strict';

const spawn = require('child_process').spawn;
const path = require('path');
const command = require('commander');

command.parse(process.argv);

const initCmd = spawn('npm', ['run', 'init'], {
    cwd: path.resolve(__dirname, '../')
});
initCmd.stdout.on('data', data => console.log(data.toString()));
initCmd.stderr.on('data', data => console.log(data.toString()));
