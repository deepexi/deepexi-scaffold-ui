<template>
  <div class="header">
    <h1>脚手架配置生成</h1>
    <el-button
      v-if="$store.state.isLogin"
      class="cu-button"
      type="text"
      @click="logout"
      >欢迎，{{ $store.state.loginData }}</el-button
    >
    <el-button v-else class="cu-button" type="text" @click="openDialog"
      >登录</el-button
    >
    <el-dialog
      title="登录"
      :visible.sync="loginVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      @close="close"
    >
      <div class="center-delete">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
          <el-form-item label="" prop="username">
            <el-input
              placeholder="账号"
              v-model.trim="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              placeholder="密码"
              type="password"
              v-model.trim="loginForm.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item>
          <el-button
            type="primary"
            @click="postLogin"
            :loading="loading"
            size="medium"
            >登录</el-button
          >
        </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="login"
          >登录</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  login, loginOut
} from '@/api'
export default {
  username: 'default-header',
  data() {
    return {
      loginVisible: false,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭登录弹窗
    close() {
      this.loginForm = {
        username: '',
        password: ''
      }
      this.$refs.loginForm.resetFields();
      this.loginVisible = false
    },
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.postLogin();
        }
      });
    },
    logout() {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.out()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    async out() {
      try {
        const res = await loginOut()
        this.$message({
          type: 'success',
          message: '用户登出成功!'
        });
        this.$store.commit('loginUpdateData', '')
        this.$store.commit('loginState', false)
        localStorage.clear()
      } catch (error) {
        console.log(error)
      }
    },
    async postLogin() {
      const params = { ...this.loginForm }
      try {
        const res = await login(params)
        this.$message({
          type: 'success',
          message: '登录成功!'
        });
        this.loading = false;
        this.close()
        this.$store.commit('loginUpdateData', res.payload)
        this.$store.commit('loginState', true)
      } catch (error) {
        console.log(error)
        this.loading = false;
      }
    },
    openDialog() {
      this.loginVisible = true
    }
  }

}
</script>

<style lang="less">
.header {
  position: relative;
  h1 {
    margin-bottom: 16px;
    font-size: 24px;
    text-align: center;
  }
  .cu-button {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>