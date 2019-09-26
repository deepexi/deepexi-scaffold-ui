<template>
    <el-row class="home" :gutter="20" type="flex" v-loading="loading">
      <el-col v-for="scaffold in scaffolds" :span="8" :key="scaffold.id">
        <div class="scaffold" @click="toFormPage(scaffold)">
          <div class="title">{{scaffold.name}}</div>
          <div class="body">
            <p v-show="scaffold.description">description: {{scaffold.description}}</p>
            <p>最新版本: {{scaffold.latestVersion}}</p>
            <p>当前版本：{{scaffold.currentVersion || '-'}}</p>
          </div>
          <div class="footer" @click="stopPropagation($event)">
            <el-button size="small" type="primary" :disabled="scaffold.isInstall===0 || scaffold.isUpdatable===0" @click="update(scaffold)">更新</el-button>
            <el-button size="small" type="success" :disabled="scaffold.isInstall===1" @click="install(scaffold)">安装</el-button>
            <el-button size="small" type="danger" @click="deleteScaffold(scaffold)">删除</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
</template>

<script>
// @ is an alias to /src
import {
  getScaffoldsList,
  updateScaffolds,
  deleteScaffolds,
  installScaffolds
} from '@/api'

export default {
  name: 'home',
  data () {
    return {
      loading: false,
      scaffolds: []
    }
  },
  mounted () {
    this.getScaffoldsList()
  },
  methods: {
    getScaffoldsList () {
      this.loading = true
      getScaffoldsList().then(res => {
        this.scaffolds = res.payload.map(scaffold => {
          scaffold.loading = {
            update: false,
            install: false,
            delete: false
          }
          return scaffold
        })
      }).finally(() => {
        this.loading = false
      })
    },
    update (scaffold) {
      scaffold.loading.update = true
      updateScaffolds(scaffold.id).then(this.getScaffoldsList)
        .finally(() => scaffold.loading.update = false)
    },
    install (scaffold) {
      scaffold.loading.install = true
      installScaffolds(scaffold.id).then(res => {
        this.$message(res.payload)
        this.getScaffoldsList()
      }).finally(() => scaffold.loading.install = false)
    },
    deleteScaffold (scaffold) {
      this.$confirm('删除' + scaffold.name + '?').then(res => {
        scaffold.loading.delete = true
        deleteScaffolds(scaffold.id).then(this.getScaffoldsList)
          .finally(() => scaffold.loading.delete = false)
      })
    },
    stopPropagation (e) {
      e.stopPropagation()
    },
    toFormPage (scaffold) {
      if(scaffold.isInstall===1){
        this.$router.push(`/${scaffold.id}`)
      }else{
        this.$message('还没安装，请先安装')
      }
    }
  }
}
</script>
<style lang="less">
.home{
  min-height: 201px;
}
.scaffold{
  border: 1px solid #ccc;
  background: #fff;
  margin-bottom: 16px;
  height: 100%;
  position: relative;
  cursor: pointer;
  .title{
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .body{
    padding-bottom:49px;
  }
  .footer{
    text-align: center;
    border-top: 1px solid #ccc;
    position: absolute;
    bottom:0;
    left:0;
    right:0;
  }
  div{
    padding: 8px;
  }
}
</style>
