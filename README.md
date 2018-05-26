# study-nodejs

### 1. nodejs服务器部署

> 使用pm2启动node服务

`pm2 start app.js`  启动app.js服务脚本

`pm2 list`  查看服务列表

`pm2 show <id | name>`  查看指定服务的详细信息

`pm2 logs`  查看pm2日志信息

>  使用Nginx反向代理

`sudo apt-get insatll nginx`  安装nginx