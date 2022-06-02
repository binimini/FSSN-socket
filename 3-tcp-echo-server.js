const net = require("net");

const HOST = "127.0.0.1";
const PORT = 65456;

const server = net.createServer((client) => {
  client.on("data", (data) => {
    console.log(`> echoed: ${data}`);
    client.write(data);

    if (data == "quit") {
      server.close();
    }
  });
  client.on("error", () => {
    console.log("> client socket error and program terminated");
    server.close();
  });
  client.on("timeout", () => {
    console.log("> socket timeout and program terminated");
    server.close();
  });
});

server.listen(PORT, HOST, () => {
  console.log("> echo-server is activated");
});

server.on("connection", (client) => {
  console.log(
    `> client connected by IP address ${
      client.address().address
    } with Port number ${client.address().port}`
  );
});

server.on("close", () => {
  console.log("> echo-server is de-activated");
});

server.on("error", () => {
  console.log("> server socket error and program terminated");
  server.close();
});
