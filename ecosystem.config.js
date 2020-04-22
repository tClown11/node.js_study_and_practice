module.exports = {
  apps : [{
    name: 'node.js_API',
    script: './src/app.js',
    instances: 1, //启动实例的个数
    autorestart: true, //若服务出错自动重启
    watch: false,
    max_memory_restart: '1G'
  }],
};
