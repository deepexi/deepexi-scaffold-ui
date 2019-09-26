'use strict';

// 表单答案
const answers = {
  groupId: { type: 'string', description: '组织Id', example: 'com.deepexi', require: true },
  artifactId: { type: 'string', description: '项目Id', example: 'test', require: true },
};

// 安装脚手架
const install = {
  id: { type: 'string', description: '脚手架Id', example: 'generator-deepexi-dubbo', require: true },
};

module.exports = { answers, install };
