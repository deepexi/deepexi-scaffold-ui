'use strict';

const _ = require('lodash');
const { ScaffoldError, NpmError } = require('./error');
const CommandUtils = require('./utils/command_utils');
const StringUtils = require('./utils/string_utils');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');
const uuidv1 = require('uuid/v1');

const NPM_PACKAGE_FILE = 'package.json';

const ID2NAME = {
  'generator-deepexi-dubbo': 'Dubbo',
  'generator-deepexi-eggjs': 'EggJS',
  'generator-deepexi-spring-cloud': 'SpringCloud',
};

class Scaffold {

  constructor(id) {
    this.id = id;
  }

  async detail() {
    const name = ID2NAME[this.id];
    if (name) {
      const currentVersion = await this.getCurrentVersion();
      const latestVersion = await this.getLatestVersion();
      return {
        id: this.id,
        name,
        isInstall: (await this.isInstall()) ? 1 : 0,
        isUpdatable: (currentVersion === latestVersion) ? 0 : 1,
        description: await this.getDescription(),
        currentVersion,
        latestVersion,
      };
    }
    return null;
  }

  async generate(options = {}) {
    await this._checkIsInstall();
    options.tmpDir = options.tmpDir || os.tmpdir();
    options.name = options.name || uuidv1();
    const generateCommand = this._getGenerateCommand(options);
    const result = await CommandUtils.execCommand(generateCommand);
    if (result.code) {
      throw new ScaffoldError('脚手架生成代码失败');
    }
    return this._getTarPath(options);
  }

  async install() {
    if (await this.isInstall()) {
      throw new ScaffoldError('脚手架已安装');
    }
    const result = await CommandUtils.execCommand(`npm install -g ${this.id}`);
    if (result.code) {
      throw new NpmError('脚手架安装失败');
    }
  }

  async update() {
    const currentVersion = await this.getCurrentVersion();
    const latestVersion = await this.getLatestVersion();
    if (currentVersion === latestVersion) {
      throw new ScaffoldError('脚手架已是最新版');
    }
    const result = await CommandUtils.execCommand(`npm update ${this.id} -g`);
    if (result.code) {
      throw new NpmError('更新脚手架失败');
    }
  }

  async delete() {
    await this._checkIsInstall();
    const result = await CommandUtils.execCommand(`npm uninstall ${this.id} -g`);
    if (result.code) {
      throw new NpmError('移除脚手架失败');
    }
  }

  async getInstallPath() {
    const result = await CommandUtils.execCommand('npm root -g');
    if (result.code || _.isEmpty(result.stdout)) {
      throw new ScaffoldError.NpmError('获取 npm 全局安装路径失败');
    }
    const rootPath = StringUtils.eliminateLineBreak(result.stdout);
    return path.join(rootPath, this.id);
  }

  async getForm() {
    if (await this.isInstall()) {
      const result = await CommandUtils.execCommand(`yo ${this._getScaffoldName()} --help`);
      if (!result.code && result.stdout.includes('--form')) {
        const result = await CommandUtils.execCommand(`yo ${this._getScaffoldName()} --form`);
        if (!result.code && !_.isEmpty(result.stdout)) {
          return JSON.parse(result.stdout);
        }
      }
    }
    return null;
  }

  async getDescription() {
    if (await this.isInstall()) {
      let result = await CommandUtils.execCommand(`yo ${this._getScaffoldName()} --help`);
      if (!result.code && result.stdout.includes('--description')) {
        result = await CommandUtils.execCommand(`yo ${this._getScaffoldName()} --desc`);
        if (!result.code && !_.isEmpty(result.stdout)) {
          return result.stdout;
        }
      }
    }
    return null;
  }

  async getPackageInfo() {
    try {
      const installPath = await this.getInstallPath();
      const packageFilePath = path.join(installPath, NPM_PACKAGE_FILE);
      const content = await fs.readFile(packageFilePath, { encoding: 'utf8' });
      return JSON.parse(content);
    } catch (e) {
      return null;
    }
  }

  async isInstall() {
    // const result = await CommandUtils.execCommand(`npm ls ${this.id} -g`);
    // return !result.code;
    // TODO:: 因 npm ls 命令太慢，建议采用文件方式判断是否安装
    try {
      await fs.access(await this.getInstallPath());
      return true;
    } catch (e) {
      return false;
    }
  }

  async getLatestVersion() {
    const result = await CommandUtils.execCommand(`npm view ${this.id} version`);
    if (result.code || _.isEmpty(result.stdout)) {
      return null;
    }
    return StringUtils.eliminateLineBreak(result.stdout);
  }

  async getCurrentVersion() {
    if (await this.isInstall()) {
      const packageInfo = await this.getPackageInfo();
      if (packageInfo) {
        return packageInfo.version;
      }
    }
    return null;
  }

  async _checkIsInstall() {
    if (!await this.isInstall()) {
      throw new ScaffoldError('脚手架还未安装');
    }
  }

  _getGenerateCommand(options) {
    const generatePath = path.resolve(options.tmpDir, options.name);
    let cmd = `mkdir -p ${generatePath};`;
    cmd += `chmod 777 ${generatePath};`;
    cmd += `cd ${generatePath};`;
    cmd += `yo ${this._getScaffoldName()} -c`;
    for (const key in options.answers) {
      const val = options.answers[key];
      if (typeof val === 'string') {
        cmd += ` --${key}=${val} `;
      }
    }
    cmd += `;tar -cvf ../${options.name}.tar ./`;
    return cmd;
  }

  _getTarPath(options) {
    return path.resolve(options.tmpDir, `${options.name}.tar`);
  }

  _getScaffoldName() {
    return this.id.substring(this.id.indexOf('-') + 1, this.id.length);
  }

}

module.exports = Scaffold;
