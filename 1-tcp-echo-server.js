const net = require('net');

const HOST = '127.0.0.1';
const PORT = 65456;

const server = net.createServer((client) => {
  client.on('data', (data) => {
    console.log(`> echoed: ${data}`);
    client.write(data);

    if (data == 'quit') {
      server.close();
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log('> echo-server is activated');
});

server.on('connection', (client) => {
  console.log(
    `> client connected by IP address ${client.remoteAddress} with Port number ${client.remotePort}`
  );
});
server.on('close', () => {
  console.log('> echo-server is de-activated');
});
