<template>
  <div class="demo">
    <h1>demo页</h1>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    getData() {
      this.$http.get('/login/getRoleFunction', {}).then(
        res => {
          if (res.success) {
            console.log(res.result)
          } else {
            this.$message.error(res.message)
          }
        },
        error => {
          this.$message.error(error.msg || '服务器异常')
        }
      )
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
</style>


