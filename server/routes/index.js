const Router = require('koa-router')
const UserController = require('../controllers/user')
const ListController = require('../controllers/list')
const router = new Router({
  prefix: '/api'
})

router
  .post('/login', UserController.postLogin)  // 登录
  .post('/createUser', UserController.createUser) // 注册
  .get('/userInfo', UserController.getUserName) // 获取用户信息
  .get('/user/getTodoList', ListController.getTodoList) // 获取list
  .post('/user/todoList', ListController.createTodoList)  // 创建list
  .post('/user/DestroyTodoList', ListController.destroyTodoList)  // 删除list
  .post('/user/updateTodoList', ListController.updateTodoList)  // 更新list

module.exports = router
