const User= require('../lib/mysql_connect').User


module.exports = {
  // 注册一个用户
  create: async function create (user) {
    return await User.create(user)
  }
}