const http = require('http');
const url = require('url');
const items = [];

let server = http.createServer((req, res) => {
  switch (req.method) {
    // POST请求体字符串缓存
    case 'POST':
      let item = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        item += chunk;
      });
      req.on('end', () => {
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      const body = items.map((ele, index) => {
        return `${index}) ${ele}\n`;
      }).join('');
      // 为了提高响应速度，应该在响应中带着Content-Length域一起发送
      // 这样响应主体很容易在内存中提前构建好 就能隐含禁用Node的块编码
      // 因为要传输的数据更少 所以能提升性能
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
  }
});

server.listen(3000);
