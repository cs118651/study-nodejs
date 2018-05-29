const connect = require('connect');

const app = connect().use(connect.favicon());
app.listen(3002);