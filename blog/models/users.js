const User= require('../lib/mysql_connect')


module.exports = {
  // 注册一个用户
  create: async function create (user) {
    return await User.create(user)
  },

  getUserByName: async function getUserByName(name) {
    return await User.findOne({
      where: {
        name
      }
    })
  }
}