# 本文件是一个node.js的API尝试

此项目只完成了数据的曾与查，为的是让自己了解一下node.js与express的编写方式

## 启动本后端

pm2 start ecosystem.config.js

会后台启动此项目

pm2 log 可查看该项目的日志

### 数据库的模型创建与映射

首先了解，一下sequelize这个数据库ORM，并在项目结构下安装sequelize : 

此前先确认安装了sequelize-cli 否则请执行 npm i sequelize-cli -S

+ 执行 npx sequelize init 

在项目目录下会生成几个文件：config(配置链接数据库的账号和密码，数据库名称等信息)、migrations(是通过sequelize编译后能被驱动执行并用于创建或更新数据表结构的node.js代码)

+ 生成数据库model与migrations 执行  npx sequelize model:generate --name port --attributes name:string,deadline:date,content:string 

将migrations的文件映射到数据库中形成数据表:

+ npx sequelize db:migrate

## 参考

+ [慕课网的视频](https://www.imooc.com/learn/1199)
+ [sequelize官网](https://sequelize.org/)
+ [express官网](https://expressjs.com)