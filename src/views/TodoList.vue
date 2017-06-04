<template>
  <div>
    <el-row type="flex" justify="center" class="mb-20">
      <el-col :span="6" class="display-block">
        {{user.name}} 客官，您有什么吩咐 <el-button type="info" @click="exit" size="small" class="ml-20">退出</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="mb-20">
      <el-col :span="6">
        <el-input placeholder="请输入待办事项" @keyup.enter.native="addTodo" v-model="todo"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-tabs v-model="activeName" @tab-click="switchClick">
          <el-tab-pane name="todoList" label="待办事项">
            <template v-if="todoList.length !== 0">
              <el-row type="flex" class="mb-10" justify="space-between" align="middle" :key="item.id" v-for="(item, index) in todoList">
                <el-col :span="2">
                  {{index + 1}}
                </el-col>
                <el-col class="text-justify" :span="16">
                   {{item.content}}
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" size="small" class="text-right" @click="updateTodoList(item)">已完成</el-button>
                  <el-button type="danger" size="small" class="text-right" @click="remove(item)">删除</el-button>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <p>暂无待办事项</p>
            </template>
          </el-tab-pane>
          <el-tab-pane name="completeList" label="已完成事项">
            <template v-if="completeList.length !== 0">
              <el-row type="flex" justify="space-between" align="middle" class="mb-10" :key="item.id" v-for="(item, index) in completeList">
                <el-col :span="2">
                  {{index + 1}}
                </el-col>
                <el-col class="text-justify" :span="18">
                  {{item.content}}
                </el-col>
                <el-col :span="4">
                  <el-button type="warning" size="small" class="text-right" @click="updateTodoList(item, 'completeList')">撤销</el-button>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <p>暂无已完成事项</p>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    created () {
      const list = this.listArr.todoList
      this.getTodoList(list)
      this.getUserInfo()
    },
    data () {
      return {
        listArr: {
          'todoList': {
            name: 'todoList',
            status: 0
          },
          'completeList': {
            name: 'completeList',
            status: 1
          }
        },
        todoList: [], // 未完成list
        completeList: [], // 已完成list
        activeName: 'todoList', // active switch tab
        todo: '', // 创建的数据
        user: ''
      }
    },
    methods: {
      /**
       * 获取用户信息
       **/
      getUserInfo () {
        this.$http.get('/api/userInfo')
          .then(res => {
            if (res.data.code) {
              this.user = res.data.user
            } else {
              this.$message({
                type: 'warning',
                message: res.data.message
              })
            }
          })
      },
      /**
       * 创建todoList
       */
      addTodo () {
        let todo = this.todo
        if (todo) {
          const data = {
            'content': todo,
            'status': 0
          }
          this.$http.post('/api/user/todoList', data)
            .then(res => {
              if (res.data.code === 1) {
                const list = this.listArr.todoList
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
                this.getTodoList(list)
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            }).catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
          this.todo = ''
        }
      },
      /**
       * 删除 todoList
       * @param item  删除的数据
       */
      remove (item) {
        const data = {
          id: item.id
        }
        this.$http.post('/api/user/DestroyTodoList', data)
          .then(res => {
            if (res.data.code === 1) {
              const list = this.listArr.todoList
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              this.getTodoList(list)
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
      },
      /**
       * 更新list状态   todoList
       * @param item    事项
       * @param listName  list名称，默认为todoList
       */
      updateTodoList (item, listName = 'todoList') {
        const data = {
          'id': item.id,
          'status': parseInt(item.status, 10) === 0 ? 1 : 0 // 要更新的status
        }
        this.$http.post('/api/user/updateTodoList', data)
          .then(res => {
            if (res.data.code === 1) {
              const list = this.listArr[listName]
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.getTodoList(list)
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
      },
      /**
       * 获取todoList
       * @param list  list名称
       */
      getTodoList (list) {
        this.$http.get('/api/user/getTodoList?status=' + list.status)
          .then((res) => {
            if (res.data.code === 1) {
              this[list.name] = res.data.bean.list
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
      },
      /**
       * tab 切换
       * @param tab
       */
      switchClick (tab) {
        const list = this.listArr[tab.name]
        this.getTodoList(list)
      },
      exit () {
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .mb-10 {
    margin-bottom: 10px;
  }

  .display-block {
    display: block;
  }

  .ml-20 {
    margin-left: 20px;
  }
</style>
