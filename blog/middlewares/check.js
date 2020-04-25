module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.cookie) {
            res.status(403).send('未登录')
            return res.redirect('/signin')
        }
        next()
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.cookie.token) {
            res.status(403).send('已登录')
            return res.redirect('back') //返回之前的页面
        }
        next()
    }
}