const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
//const session = require('express-session')
// mysql链接
const MysqlStore = require('mysql2')
//const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')

const app = express()

//设置模板
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// cookie
app.use(cookieParser())

// flash 中间件，用来显示通知
//app.use(flash())

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))

// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.cookies.user
  //res.locals.success = req.flash('success').toString()
  //res.locals.error = req.flash('error').toString()
  next()
})

// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
  })