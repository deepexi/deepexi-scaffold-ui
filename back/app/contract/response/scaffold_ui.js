'use strict';

const baseInfo = {
  name: { type: 'string', description: '脚手架名称', example: 'Dubbo' },
  isInstall: { type: 'number', description: '是否已安装（1 已安装/0 未安装）', example: 1 },
  description: { type: 'string', description: '脚手架描述' },
  currentVersion: { type: 'string', description: '脚手架当前版本', example: '0.3.0' },
  latestVersion: { type: 'string', description: '脚手架最新版本', example: '0.3.0' },
};

// 脚手架详情
const form = {

};

const detail = {
  ...baseInfo,
  form: { type: 'form' },
};

// 脚手架基本信息列表
const list = {
  list: { type: 'array', itemType: 'baseInfo', description: '脚手架详情列表' },
};

module.exports = { list, detail, baseInfo, form };

