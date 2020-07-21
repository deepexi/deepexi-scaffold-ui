'use strict';

// 登录
const login = {
    username: { type: 'string', description: '账号', example: 'admin', require: true },
    password: { type: 'string', description: '密码', example: 'admin', require: true },
};

module.exports = { login };
