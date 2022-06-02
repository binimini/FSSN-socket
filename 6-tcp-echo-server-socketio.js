const HOST = '127.0.0.1';
const PORT = 65456;

const http = require('http');
const socket = require('socket.io');
const app = http.createServer();
const io = socket(app);
app.listen(PORT);

console.log('> echo-server is activated');
io.on('connection', (socket) => {
  const address = socket.request.connection._peername;
  console.log(
    `> client connected by IP address ${address.address} with Port number ${address.port}`
  );

  socket.on('data', (data) => {
    console.log(`> echoed: ${data}`);
    socket.emit('data', data);

    if (data == 'quit') {
      console.log('> echo-server is de-activated');
      io.close();
    }
  });
});
