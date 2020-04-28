const express = require('express')
const router = express.Router()
// const checkLogin = require('../middlewares/check').checkLogin

//GET /signout 登出
router.get('/', function(req,res,next){
    res.clearCookie('uid')
    res.clearCookie('token')
    res.clearCookie('user')
    res.redirect('signin')
})

module.exports = router