# deepexi-scaffold-ui

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![Build Status](https://travis-ci.org/deepexi/deepexi-scaffold-ui.svg?branch=master)](https://travis-ci.org/deepexi/deepexi-scaffold-ui)
[![codecov](https://codecov.io/gh/deepexi/deepexi-scaffold-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/deepexi/deepexi-scaffold-ui)

[npm-image]: https://img.shields.io/npm/v/deepexi-scaffold-ui.svg
[npm-url]: https://www.npmjs.com/package/deepexi-scaffold-ui
[download-image]: https://img.shields.io/npm/dm/deepexi-scaffold-ui.svg
[download-url]: https://www.npmjs.com/package/deepexi-scaffold-ui

[CHANGELOG](./CHANGELOG.md)

> 注意：此版本暂不稳定，且仅支持在 Mac、Linux 系统运行

DeepEXI 脚手架 UI 可视化操作界面

![DeepEXI 脚手架 UI](https://user-gold-cdn.xitu.io/2019/9/25/16d6755a233262a7?w=968&h=703&f=png&s=57778)

## 如何使用

安装 Yeoman
```bash
npm install -g yo
```

请检查 yo 命令是否能正常执行，如若不行请看 [**启动错误处理**]
```bash
yo -v
```

安装脚手架UI 
```bash
npm install deepexi-scaffold-ui -g
```
启动脚手架UI，可选项：
- -p ：服务端口号（默认7001）
- -s ：开启Swagger访问（默认关闭）
- -d ：是否开启调试模式（默认关闭）
```bash
scaffold-ui start -p 7001 -s 
```

停止脚手架UI
```bash
scaffold-ui stop
```

访问脚手架UI：http://localhost:7001/index.html

清理脚手架缓存信息：http://localhost:7001/clearCache

## 启动错误处理

### node 与 npm 版本过低问题

如若遇到以下错误信息
```bash
npm ERR! Linux 3.10.0-693.el7.x86_64
npm ERR! argv "/usr/bin/node" "/usr/bin/npm" "run" "start"
npm ERR! node v6.17.1
npm ERR! npm  v3.10.10
npm ERR! code ELIFECYCLE
....
npm ERR! Exit status 1
```

请更新 node 与 npm 版本 
```bash
# 清理npm的cache
npm cache clean -f
# 安装版本管理工具 n
npm install -g n
# 更新 node 到最新版
n latest
# 更新 npm 版本
npm install -g npm@latest
```

### Yeoman 权限不足问题

如果脚手架安装后无法正常显示描述与表单信息，如下图：

![](https://user-gold-cdn.xitu.io/2019/9/29/16d7c54366a68cc8?w=1247&h=368&f=png&s=42682)

![](https://user-gold-cdn.xitu.io/2019/9/29/16d7c5482519cf5e?w=1253&h=290&f=png&s=17406)

或遇到以下错误信息
```bash
Error: EACCES: permission denied, open '/root/.config/insight-nodejs/insight-yo.json.1765396883'
    at Object.openSync (fs.js:451:3)
    at Function.writeFileSync [as sync] (/root/.npm-global/lib/node_modules/yo/node_modules/write-file-atomic/index.js:212:13)
    at Conf.set store [as store] (/root/.npm-global/lib/node_modules/yo/node_modules/conf/index.js:142:19)
    at Conf.set (/root/.npm-global/lib/node_modules/yo/node_modules/conf/index.js:64:14)
```

请修改目录权限
```bash
chmod 777 /root/
```
