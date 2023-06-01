const fs = require('fs');
const https = require('https');
const http = require('http');
const WebSocket = require('ws');
const path = require("path")

// const keyPem = path.join(__dirname, "../SignallingWebServer/certificates/privatekey.pem")
// const certPem = path.join(__dirname, "../SignallingWebServer/certificates/cert.pem")
const keyPem = path.join(__dirname, "../certificates/key.pem")
const certPem = path.join(__dirname, "../certificates/cert.pem")

// 读取 SSL 证书文件
const server = https.createServer({
  cert: fs.readFileSync(certPem),
  key: fs.readFileSync(keyPem)
});

// 创建一个 WebSocket 服务器
const wss = new WebSocket.Server({ server });

// 当有客户端连接时触发
wss.on('connection', function connection(ws) {
  console.log('客户端已连接');

  // 当从客户端接收到消息时触发
  ws.on('message', function incoming(message) {
    console.log('收到消息: %s', message);

    // 将消息回送给客户端
    ws.send('服务端收到了你的消息: ' + message);
  });

  // 向客户端发送欢迎消息
  ws.send('欢迎连接到 WebSocket 服务器');
});

// 开始监听 8080 端口
server.listen(8999);
console.log("hello");
