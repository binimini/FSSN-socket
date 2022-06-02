const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const HOST = '127.0.0.1';
const PORT = 65456;

const http = require('http');
const socket = require('socket.io');
const app = http.createServer();
const io = socket(app);
app.listen(PORT);

const group_queue = [];
console.log('> echo-server is activated');

io.on('connection', (socket) => {
  const address = socket.request.connection._peername;
  group_queue.push(`${address.address}:${address.port}`);
  console.log(
    `> client connected by IP address ${address.address} with Port number ${address.port}`
  );

  socket.on('data', (data) => {
    if (data == 'quit') {
      group_queue.splice(
        group_queue.indexOf(`${address.address}:${address.port}`),
        1
      );
      socket.emit('data', data);
    } else {
      console.log(
        `> received (${data}) and echoed to ${group_queue.length} clients`
      );
      io.emit('data', data);
    }
  });
});

rl.on('line', (line) => {
  if (line == 'quit') {
    if (group_queue.length == 0) {
      console.log('> stop procedure started');
      console.log('> echo-server is de-activated');
      io.close();
      rl.close();
    } else {
      console.log(
        `> active clients are remained : ${group_queue.length} clients`
      );
    }
  }
});
