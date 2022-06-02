const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const HOST = '127.0.0.1';
const PORT = 65456;

const group_queue = [];
server.on('message', (message, remote) => {
  let address = `${remote.address}:${remote.port}`;

  if (message.toString()[0] == '#' || message.toString() == 'quit') {
    if (message.toString() == '#REG' && !group_queue.includes(address)) {
      console.log(`> client registered ${address}`);
      group_queue.push(address);
    } else if (message.toString() == '#DREG' || message.toString() == 'quit') {
      if (group_queue.includes(address)) {
        console.log(`> client de-registered ${address}`);
        group_queue.splice(group_queue.indexOf(address), 1);
      }
    }
  } else {
    if (group_queue.length == 0) {
      console.log('> no clients to echo');
    } else if (!group_queue.includes(address)) {
      console.log('> ignores a message from un-registered client');
    } else {
      console.log(
        `> received (${message.toString()}) and echoed to ${
          group_queue.length
        } clients`
      );
      for (let i = 0; i < group_queue.length; i++) {
        server.send(
          message,
          0,
          message.length,
          group_queue[i].split(':')[1],
          group_queue[i].split(':')[0],
          (err) => {
            if (err) {
              console.log('> error ocurred and program terminated');
            }
          }
        );
      }
    }
  }
});

server.on('listening', () => {
  console.log(`> echo-server is activated`);
});

server.on('close', () => {
  console.log(`> echo-server is de-activated`);
});

server.bind(PORT, HOST);
