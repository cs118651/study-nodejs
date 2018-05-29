const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes/index');
const users = require('./model/users').items;

const findUser = function(name, password) {
  return users.find(function(item) {
    return item.name === name && item.password === password;
  });
}

const identityKey = 'skey';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 配置session
app.use(session({
  name: identityKey,
  secret: '118651cs', // 用来对session id相关的cookie进行签名
  store: new FileStore(), // 本地存储session
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10 * 1000  // 有效期，单位是毫秒
  }
}));

// 登录接口
app.post('/login', function(req, res, next) {
  const sess = req.session;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 挂载路由
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
