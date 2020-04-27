const express = require('express')
const router = express.Router();
//const fs = require('fs');
//const path = require('path');
const sha1 = require('sha1');

const UserModel = require('../models/users');
const checkLogin = require('../middlewares/check').checkLogin

// GET /signup 注册页
router.get('/',function(req,res){
    res.render('signup')
})

//POST /signup 用户注册
router.post('/', function(req, res, next){
    const name = req.fields.name
    const bio = req.fields.bio
   // const avatar = req.fields.avatar.path.split(path.sep).pop()
    let password = req.fields.password
    const repassword = req.fields.repassword

    //校验参数
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符')
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符')
          }
          // if (!req.files.avatar.name) {
          //   throw new Error('缺少头像')
          // }
          if (password.length < 6) {
            throw new Error('密码至少 6 个字符')
          }
          if (password !== repassword) {
            throw new Error('两次输入密码不一致')
          }
    }catch (e) {
      //注册失败,异步删除上传的头像
      //fs.unlink(req.files.avatar.path)
      res.redirect('/signup')
    }

    // 明文密码加密
  password = sha1(password)

  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    bio: bio,
    //avatar: avatar
  }
  //登录时候用：
  //生成token，并保存到redis中，设置自动失效时间
  //将生成的token放到cookie中，等下次用户登录时判断此token登录
  //用户信息写入数据库
  UserModel.create(user)
  .then(function () {
    res.redirect('/posts')
  })
  .catch(function (e) {
    // 注册失败，异步删除上传的头像
    //fs.unlink(req.files.avatar.path)
    // 用户名被占用则跳回注册页，而不是错误页
    if (e.message.match('duplicate key')) {
      //req.flash('error', '用户名已被占用')
      return res.redirect('/signup')
    }
    next(e)
  })
})

module.exports = router