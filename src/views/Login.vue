<template>
  <el-row>
    <el-row>
      <el-col>
        <h3>登录</h3>
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
        <el-button type="primary" class="wd-full" @click="login">登录</el-button>
        <p>
          没有账号，
          <router-link to="register">立即注册</router-link>
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
      login () {
        if (!this.user || !this.password) {
          this.$message({
            message: '用户名和密码不能为空',
            type: 'warning'
          })
          return
        }
        const user = {
          name: this.user,
          password: this.password
        }
        /**
         * 登录
         * 将token加入headers
         */
        this.$http.post('/api/login', user)
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
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.$message({
              message: err,
              type: 'error'
            })
          })
      }
    }
  }
</script>

<style scoped>
</style>
