# study-nodejs

### 1. nodejs服务器部署

> 使用pm2启动node服务

`pm2 start app.js`  启动app.js服务脚本

`pm2 list`  查看服务列表

`pm2 show <id | name>`  查看指定服务的详细信息

- `pm2 logs`  查看pm2日志信息




>  使用Nginx反向代理

`sudo apt-get insatll nginx`  安装nginx


> mogodb服务

`sudo mongod service start`  开启MongoDB服务器

`sudo mongod service stop`  关闭MongoDB服务器

`sudo mongod service restart`  重启MongoDB服务器



> 修改mongodb默认端口（27017）

`sudo vi /etc/mongod.conf` 找到 `port` 配置项并修改为其他值即可

### 2. 在express中使用handlebars模板引擎

首先是安装：`npm install --save express3-handlebars` 

然后是引入：

```
const handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
```

handlebars默认扩展名为 `	.handlebars` ，可以在引入时 `const handlebars = require('express3-handlebars').create({ extname: '.hbs' })` ，将扩展名设置为 `.hbs` 

### 3. 使用MongoDB存储数据

使用mogod启动mongodb服务，使用自带的mongo客户端连接服务器，默认为`127.0.0.1:27017/test` 。

> 常用命令

- `show dbs`  查看当前数据库列表

- `use dbs_name`  切换到名为`dbs_name` 的数据库

- `db.dropDatabase()`  将当前切换到的数据库删除

### 4. 将本地数据库上传至线上

首先执行备份命令 `mongodump -h 127.0.0.1:27017 -d CS-ONE -o CS-ONE-backup` 将本地`CS-ONE`数据库备份

接着执行打包命令 `tar zcvf CS-ONE.tar.gz CS-ONE-backup` 

接着执行上传命令 `scp ./CS-ONE.tar.gz root@119.23.229.191:/root/dbbackup ` 

执行导入命令 `mongorestore --host 127.0.0.1:27017 -d CS-ONE ./dbbackup/CS-ONE-backup` 