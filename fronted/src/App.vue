<template>
  <div id="app">
    <!-- <h1 class="h1">脚手架配置生成</h1> -->
    <default-header></default-header>
    <router-view />
  </div>
</template>

<script>
import DefaultHeader from './components/default-header.vue'
export default {
  name: 'app',
  components: {
    DefaultHeader
  }
}
</script>

<style lang="less">
html,
body {
  background: #f0f2f5;
  padding: 0 24px;
}
#app {
  color: #2c3e50;
  margin-top: 30px;
  .h1 {
    margin-bottom: 16px;
    font-size: 24px;
    text-align: center;
  }
}
</style>
