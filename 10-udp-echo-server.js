const dgram = require("dgram");
const server = dgram.createSocket("udp4");

const HOST = "127.0.0.1";
const PORT = 65456;

server.on("message", (message, remote) => {
  console.log(`> echoed: ${message.toString()}`);
  server.send(
    message,
    0,
    message.length,
    remote.port,
    remote.address,
    (err) => {
      if (err) {
        console.log("> error ocurred and program terminated");
      }
    }
  );
  if (message.toString() == "quit") {
    server.close();
  }
});

server.on("listening", () => {
  console.log(`> echo-server is activated`);
});

server.on("close", () => {
  console.log(`> echo-server is de-activated`);
});

server.bind(PORT, HOST);
