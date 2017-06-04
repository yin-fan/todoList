const db = require('../config/db')
const todoListDb = db.todoList
const User = todoListDb.import('../schema/user.js')

class UserModel {
  /**
   * 查询用户信息
   * @param name  姓名
   * @returns {Promise.<*>}
   */
  static async findUserByName (name) {
    const userInfo = await User.findOne({
      where: {
        name
      }
    })
    return userInfo
  }

  /**
   * 创建用户
   * @param user
   * @returns {Promise.<boolean>}
   */
  static async createUser (user) {
    await User.create({
      'name': user.name,
      'password': user.password
    })
    return true
  }
}

module.exports = UserModel
