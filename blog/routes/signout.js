const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

//GET /signout 登出
router.get('/', checkLogin, function(req,res,next){
    req.cookies = null
    res.redirect('posts')
})

module.exports = router