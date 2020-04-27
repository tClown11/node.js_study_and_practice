const client = require('../lib/redis_client')
module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        //引入redis进行判断是否存在token
        if (req.cookies['user']==undefined&& req.cookies['token']==undefined) {
            return next()
        }
        client.get(req.cookies['user'], (err, result)=>{
            if (result==req.cookies['token']) {
                // 跳转到主页
                return res.redirect('/posts')
            }else{
                return next()
            }
        })
    },

    // checkNotLogin: function checkNotLogin(req, res, next) {
    //     if (req.cookie) {
    //         res.status(403).send('已登录')
    //         return res.redirect('back') //返回之前的页面
    //     }
    //     next()
    // }
}