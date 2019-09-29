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

const ID2INFO = {
  'generator-deepexi-dubbo': {
    name: 'Dubbo',
    scaffold: 'deepexi-dubbo',
  },
  'generator-deepexi-eggjs': {
    name: 'EggJS',
    scaffold: 'deepexi-eggjs',
  },
  'generator-deepexi-spring-cloud': {
    name: 'SpringCloud',
    scaffold: 'deepexi-spring-cloud',
  },
};

class Scaffold {

  constructor(ctx, id) {
    this.ctx = ctx;
    this.id = id;
    this.info = ID2INFO[this.id];
    if (!this.info) {
      throw new ScaffoldError(`暂不支持该手架：${id}`);
    }
  }

  async detail() {
    const currentVersion = await this.getCurrentVersion();
    const latestVersion = await this.getLatestVersion();
    return {
      id: this.id,
      name: this.info.name,
      isInstall: (await this.isInstall()) ? 1 : 0,
      isUpdatable: (currentVersion === latestVersion) ? 0 : 1,
      description: await this.getDescription(),
      currentVersion,
      latestVersion,
    };
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
    return this._getProductPath(options);
  }

  async install() {
    if (await this.isInstall()) {
      throw new ScaffoldError('脚手架已安装');
    }
    const result = await CommandUtils.execCommand(`npm install -g ${this.id}`);
    if (result.code) {
      throw new NpmError('脚手架安装失败');
    }
    this.ctx.logger.debug('[Scaffold] %s --- 安装脚手架', this.id);
    this._setCache({ isInstall: 1 });
  }

  async update() {
    const currentVersion = await this.getCurrentVersion();
    const latestVersion = await this.getLatestVersion();
    if (currentVersion === latestVersion) {
      throw new ScaffoldError('脚手架已是最新版');
    }
    const result = await CommandUtils.execCommand(`npm install ${this.id}@latest -g`);
    if (result.code) {
      throw new NpmError('更新脚手架失败');
    }
    this.ctx.logger.debug('[Scaffold] %s --- 脚手架版本更新至 %s', this.id, latestVersion);
    this._clearCache();
  }

  async delete() {
    await this._checkIsInstall();
    const result = await CommandUtils.execCommand(`npm uninstall ${this.id} -g`);
    if (result.code) {
      throw new NpmError('移除脚手架失败');
    }
    this.ctx.logger.debug('[Scaffold] %s --- 移除脚手架', this.id);
    this._clearCache();
  }

  async getForm() {
    let form = this._getCache('form');
    if (!form) {
      if (await this.isInstall() && await this._isSupportUIFunc('form')) {
        const rs = await CommandUtils.execCommand(`yo ${this.info.scaffold} --form`);
        if (!rs.code && !_.isEmpty(rs.stdout)) {
          form = JSON.parse(rs.stdout);
          this._setCache({ form });
        }
      }
    }
    return form;
  }

  async getDescription() {
    let description = this._getCache('description');
    if (!description) {
      if (await this.isInstall() && await this._isSupportUIFunc('description')) {
        const rs = await CommandUtils.execCommand(`yo ${this.info.scaffold} --desc`);
        if (!rs.code && !_.isEmpty(rs.stdout)) {
          description = rs.stdout;
          this._setCache({ description });
        }
      }
    }
    return description;
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
    const isInstall = this._getCache('isInstall');
    if (!isInstall) {
      try {
        await fs.access(await this.getInstallPath());
        this._setCache({ isInstall: 1 });
      } catch (e) {
        return false;
      }
    }
    return true;
  }

  async getInstallPath() {
    const result = await CommandUtils.execCommand('npm root -g');
    if (result.code || _.isEmpty(result.stdout)) {
      throw new ScaffoldError.NpmError('获取 npm 全局安装路径失败');
    }
    const rootPath = StringUtils.eliminateLineBreak(result.stdout);
    return path.join(rootPath, this.id);
  }

  async getLatestVersion() {
    let latestVersion = this._getCache('latestVersion');
    if (!latestVersion) {
      const rs = await CommandUtils.execCommand(`npm view ${this.id} version`);
      if (rs.code || _.isEmpty(rs.stdout)) {
        return null;
      }
      latestVersion = StringUtils.eliminateLineBreak(rs.stdout);
      this._setCache({ latestVersion });
    }
    return latestVersion;
  }

  async getCurrentVersion() {
    let currentVersion = this._getCache('currentVersion');
    if (!currentVersion) {
      const packageInfo = await this.getPackageInfo();
      if (!packageInfo) {
        return null;
      }
      currentVersion = packageInfo.version;
      this._setCache({ currentVersion });
    }
    return currentVersion;
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
    cmd += `yo ${this.info.scaffold} -c`;
    for (const key in options.answers) {
      const val = options.answers[key];
      cmd += ` --${key}=${val} `;
    }
    cmd += `;tar -cvf ../${options.name}.tar ./`;
    this.ctx.logger.info('[Scaffold] %s --- 生成代码命令：%s', this.id, cmd);
    return cmd;
  }

  _getProductPath(options) {
    const productPath = path.resolve(options.tmpDir, `${options.name}.tar`);
    this.ctx.logger.debug('[Scaffold] %s --- 生成制品路径：%s', this.id, productPath);
    return productPath;
  }

  async _isSupportUIFunc(func) {
    const rs = await CommandUtils.execCommand(`yo ${this.info.scaffold} --help`);
    if (!rs.code) {
      switch (func) {
        case 'description':
          return rs.stdout.includes('--description');
        case 'form':
          return rs.stdout.includes('--form');
        default:
          break;
      }
    }
    return false;
  }

  _getCache(property) {
    const cache = this.ctx.app.scaffoldCacheMap.get(this.id);
    if (cache) {
      this.ctx.logger.debug('[Scaffold] %s --- 缓存信息：%o', this.id, cache);
      return (property) ? cache[property] : cache;
    }
    return null;
  }

  _setCache(info) {
    let cache = this._getCache();
    cache = _.assign(cache, info);
    this.ctx.logger.info('[Scaffold] %s --- 设置缓存：%o', this.id, cache);
    this.ctx.app.scaffoldCacheMap.set(this.id, cache);
  }

  _clearCache() {
    this.ctx.logger.info('[Scaffold] %s --- 清理缓存', this.id);
    this.ctx.app.scaffoldCacheMap.set(this.id, null);
  }
}

module.exports = Scaffold;
