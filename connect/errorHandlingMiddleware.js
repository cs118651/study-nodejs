// 错误处理中间件
const connect = require('connect');
const api = connect()
              .use(users)
              .use(pets)
              .use(errorHandler);

const app = connect()
              .use(hello)
              .use('/api', api)
              .use(errorPage)
              .listen(3000);

// 中间件hello
function hello(req, res, next) {
  if (req.url.match(/^\/hello/)) {
    res.end('Hello World\n');
  } else {
    next();
  }
}

// 中间件users
const db = {
  users: [
    { name: 'cs' },
    { name: 'wang' },
    { name: 'li' },
  ]
}
function users(req, res, next) {
  const match = req.url.match(/^\/user\/(.+)/);
  console.log(match);
  if (match) {
    const user = db.users[match[1]];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      const err = new Error('User not Found');
      err.notFound = true;
      next(err);
    }
  } else {
    nect();
  }
}

// 中间件pets
function pets(req, res, next) {
  if (req.url.match(/^\/pet\/(.+)/)) {
    foo();
  } else {
    next();
  }
}

// 错误处理中间件errorHandler
function errorHandler(err, req, res, next) {
  console.log(err.stack);
  res.setHeader('Content-Type', 'application/json');
  if (err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: err.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internet Server Error' }));
  }
}

// 错误处理中间件errorPage
function errorPage(err, req, res, next) {
  console.log('不可能出现的错误');
}
