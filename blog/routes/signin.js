const express = require('express')
const router = express.Router()
const sha1 = require('sha1');
const UserModel = require('../models/users')
const jwt = require('jsonwebtoken');
const client = require('../lib/redis_client')
const checkLogin = require('../middlewares/check').checkLogin

const screctkey = 'KJG*^&_DVF'

//GET /signin 登录页
router.get('/', checkLogin, function(req,res,next){
    res.render('signin')
})

// POST /signin 用户登录
router.post('/', function(req,res,next){
    const name = req.fields.name
    const password = req.fields.password

    // 校验参数
  try {
    if (!name.length) {
      throw new Error('请填写用户名')
    }
    if (!password.length) {
      throw new Error('请填写密码')
    }
  } catch (e) {
    return res.redirect('back')
  }
  UserModel.getUserByName(name)
  .then(function (user) {
      if (!user) {
          return res.redirect('back')
      }
      //检查密码是否匹配
      if (sha1(password) !== user.password) {
          return res.redirect('back')
      }
      // 用户信息写入 cookie
      res.cookie('user', user.name, {maxAge: 60*60*24})
      res.cookie('token', jwt_token(password), {maxAge: 60*60*24})

      //登录信息写入redis
      client.setex(user.name, 60*60*24, jwt_token(password))
      // 跳转到主页
      res.redirect('/posts')
  })
  .catch(next)
})

function jwt_token (password) {
  password = sha1(password)
  return jwt.sign({
    exp: 60*60*24,
    data: password
  }, screctkey)
}

module.exports = router