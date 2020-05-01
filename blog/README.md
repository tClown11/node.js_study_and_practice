# 使用express搭建的一个简单的blog

使用express框架+ejs模板

## node.js相关知识点

### require

require用来加载一个文件的代码，详细请看[官方文档](https://nodejs.org/api/modules.html)

简单概括为一下几点：

+ require 可加载 .js、.json 和 .node 后缀的文件

+ require 的过程是同步的，所以这样是错误的:

```js
setTimeout(() => {
    module.exports = {a: 'hello'}
},0)
```

require这个文件得到的是空对象{ }

+ require目录机制是：
  + 如果目录下有 package.json 并指定了 main 字段，则用之
  
  + 如果不存在 package.json，则依次尝试加载目录下的 index.js 和 index.node

+ require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载

+ 判断是否是程序的入口文件有两种方式:
  + require.main === module（推荐）

  + module.parent === null

### 循环引用问题

+ 通过分离共用的代码到另一个文件解决，如上面简单的情况，可拆出共用的代码到 c 中，如下:

```js
c->a
c->b
```

+ 不在最外层 require，在用到的地方 require，通常在函数的内部

### exports与module.exports

require 用来加载代码，而 exports 和 module.exports 则用来导出代码。

exports 和 module.exports 的区别:

1.module.exports初始值为一个空对象{}

2.exports是指向module.exports的引用

3.require()返回的是module.exports而不是exports

## 参考资料

+ [极客文档](https://wiki.jikexueyuan.com/project/express-mongodb-setup-blog/simple-blog.html)

+ [github地址](https://github.com/nswbmw/N-blog)

+ [sequelize的联表查询](https://blog.csdn.net/lvyuan1234/article/details/86727703)