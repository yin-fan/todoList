const Sequelize = require('sequelize')
const config = {
  database: 'todoList',
  username: 'root',
  password: 'yinfan999',
  host: '127.0.0.1',
  port: 3306
}
const todoList = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql', // 数据库方言
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: false
  }
})

module.exports = {
  todoList
}
