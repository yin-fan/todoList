const db = require('../config/db')
const todoList = db.todoList
const List = todoList.import('../schema/list')

class ListModel {
  /**
   * 获取todoList
   * @param userId  用户ID
   * @returns {Promise.<*>}
   */
  static async getTodoList (user_id, status) {
    const todoList = await List.findAll({
      where: {
        user_id,
        status
      },
      attributes: ['id', 'content', 'status']
    })
    return todoList
  }

  /**
   * 创建一条todoList的数据
   * @param data
   * @returns {Promise.<boolean>}
   */
  static async createTodoList (data) {
    await List.create({
      'user_id': data.user_id,
      'content': data.content,
      'status': data.status
    })
    return true
  }

  /**
   * 删除todoList
   * @param id listID
   * @returns {Promise.<boolean>}
   */
  static async destroyTodoList (id, user_id) {
    await List.destroy({
      where: {
        id,
        user_id
      }
    })
    return true
  }

  /**
   * 更新数据的状态
   * @param id  用户ID
   * @param status  事项的状态
   * @returns {Promise.<boolean>}
   */
  static async updateTodoList (id, status, user_id) {
    await List.update({
      status
    }, {
      where: {
        id,
        user_id
      },
      fields: ['status']
    })
    return true
  }
}

module.exports = ListModel
