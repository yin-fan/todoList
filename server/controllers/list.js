const ListModel = require('../models/list')

class ListController {
  /**
   * 获取todoList
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getTodoList (ctx) {
    const data = ctx.request.query
    if (data) {
      const todoList = await ListModel.getTodoList(ctx.user.id, data.status)
      ctx.body = {
        code: 1,
        bean: {
          list: todoList
        },
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '参数错误'
      }
    }
  }

  /**
   * 创建todoList
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async createTodoList (ctx) {
    let todoList = ctx.request.body
    if (todoList) {
      todoList.user_id = ctx.user.id
      await ListModel.createTodoList(todoList)
      ctx.body = {
        code: 1,
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '创建失败'
      }
    }
  }

  /**
   * 删除 todoList
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async destroyTodoList (ctx) {
    const {id} = ctx.request.body
    if (id && !isNaN(id)) {
      await ListModel.destroyTodoList(id, ctx.user.id)
      ctx.body = {
        code: 1,
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '失败'
      }
    }
  }

  /**
   * 更新事项的状态
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async updateTodoList (ctx) {
    const data = ctx.request.body

    if (data) {
      await ListModel.updateTodoList(data.id, data.status, ctx.user.id)
      ctx.body = {
        code: 1,
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '失败'
      }
    }
  }
}

module.exports = ListController
