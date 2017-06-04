<template>
  <el-row>
    <el-row>
      <el-col>
        <h3>注册</h3>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="mb-20">
      <el-col :span="6">
        <el-input placeholder="请输入用户名" v-model="user"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="mb-20">
      <el-col :span="6">
        <el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button @click="register" class="wd-full" type="primary">注册</el-button>
        <p>
          已有账号，
          <router-link to="login">立即登录</router-link>
        </p>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        user: '',
        password: ''
      }
    },
    methods: {
      register () {
        const data = {
          name: this.user,
          password: this.password
        }
        if (!data.name || !data.password) {
          this.$message({
            message: '用户名或密码不能为空',
            type: 'warning'
          })
        } else {
          this.$http.post('/api/createUser', data)
            .then(res => {
              if (res.data.code === 1) {
                const bean = res.data.bean
                localStorage.setItem('token', bean.token)
                // Bearer是JWT的认证头部信息
                this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + bean.token
                this.$router.push('/todoList')
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'warning'
                })
              }
            }).catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
        }
      }
    }
  }
</script>

<style scoped>
</style>
