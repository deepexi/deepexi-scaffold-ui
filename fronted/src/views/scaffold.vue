<template>
  <div class="scaffold-wrapper" v-loading="loading">
    <h1>{{ info.name }}</h1>
    <d-form
      v-if="info.form"
      class="form"
      ref="form"
      :formProps="formProps"
      :cliParams="info.form"
    />
    <div class="buttons">
      <el-button size="small" type="warning" @click="$router.push('/')"
        >返回</el-button
      >
      <el-button
        size="small"
        type="primary"
        :loading="generateLoading"
        @click="generate"
        >生成</el-button
      >
    </div>
  </div>
</template>

<script>
import DForm from "d-tree-form"
import { getScaffolds, generateScaffolds } from "@/api"
export default {
  components: {
    DForm
  },
  data() {
    return {
      loading: false,
      generateLoading: false,
      info: {
        form: {}
      },
      formProps: {
        labelWidth: '150px'
      }
    }
  },
  mounted() {
    this.getScaffolds()
  },
  methods: {
    serializeOptions(payload) {
      Object.values(payload).forEach(data => {
        if (data.type === 'list') {
          data.choices = data.choices.map(item => item.key || item)
        }
        if (data.child) {
          this.serializeOptions(data.child)
        }
      })
    },
    getScaffolds() {
      this.loading = true;
      getScaffolds(this.$route.params.scaffoldId)
        .then(res => {
          const data = res.payload

          this.serializeOptions(data.form)
          this.info = data
        })
        .finally(() => {
          this.loading = false
        })
    },
    generate() {
      this.generateLoading = true
      const data = this.$refs.form.getFlatFormData()
      generateScaffolds({
        id: this.$route.params.scaffoldId,
        data
      })
        .then(res => {
          // console.log(res)
        })
        .finally(() => {
          this.generateLoading = false
        })
    }
  }
}
</script>
<style lang="less">
.d-tree-form .el-tree-node__content {
  height: 62px !important;
}
.scaffold-wrapper {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 16px;
  .buttons {
    text-align: center;
  }
  .form {
    margin-bottom: 16px;
  }
}
</style>
