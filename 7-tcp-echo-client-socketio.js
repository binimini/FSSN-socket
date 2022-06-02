const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const io = require('socket.io-client');

const HOST = '127.0.0.1';
const PORT = 65456;

console.log('> echo-client is activated');
const socket = io.connect(`http://${HOST}:${PORT}`);

socket.on('data', (data) => {
  console.log(`> received: ${data}`);
  if (data == 'quit') {
    console.log('> echo-client is de-activated');
    rl.close();
  }
});

rl.on('line', (line) => {
  socket.emit('data', line);
});

rl.on('close', () => {
  process.exit();
});
