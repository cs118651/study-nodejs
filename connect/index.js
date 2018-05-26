const connect = require('connect');
var app = connect();
app.use(logger);
app.listen(3000);

function logger(req, res, next) {
  // console.log('req.method:', req.method);
  // console.log('req.url:', req.url);
  console.log('req.headers.authorization:', req.headers.authorization);
  next();
}