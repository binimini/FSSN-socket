const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const net = require('net');

const HOST = '127.0.0.1';
const PORT = 65456;
const group_queue = new Set();

const server = net.createServer((client) => {
  client.on('data', (data) => {
    if (data == 'quit') {
      group_queue.delete(client);
      client.write(data);
    } else {
      console.log(
        `> received (${data}) and echoed to ${group_queue.size} clients`
      );
      for (let cli of group_queue) {
        cli.write(data);
      }
    }
  });
  client.on('error', () => {
    console.log('> client socket error and program terminated');
    server.close();
  });
  client.on('timeout', () => {
    console.log('> socket timeout and program terminated');
    server.close();
  });
});

server.listen(PORT, HOST, () => {
  console.log('> echo-server is activated');
});

server.on('connection', (client) => {
  group_queue.add(client);
  console.log(
    `> client connected by IP address ${client.remoteAddress} with Port number ${client.remotePort}`
  );
});

server.on('close', () => {
  console.log('> echo-server is de-activated');
  rl.close();
});

server.on('error', () => {
  console.log('> server socket error and program terminated');
  server.close();
});

rl.on('line', (line) => {
  if (line == 'quit') {
    if (group_queue.size == 0) {
      console.log('> stop procedure started');
      server.close();
    } else {
      console.log(
        `> active clients are remained : ${group_queue.size} clients`
      );
    }
  }
});
