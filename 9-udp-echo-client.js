const dgram = require("dgram");

const HOST = "127.0.0.1";
const PORT = 65456;

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = dgram.createSocket("udp4");
console.log("> echo-client is activated");

client.on("message", (data) => {
  console.log(`> received: ${data.toString()}`);
  if (data == "quit") {
    client.close();
  }
});

rl.on("line", (line) => {
  client.send(line, 0, line.length, PORT, HOST, (err) => {
    if (err) console.log("> error ocurred and program terminated");
  });
});

rl.on("close", () => {
  process.exit();
});

client.on("close", () => {
  console.log("> echo-client is de-activated");
  rl.close();
});

client.on("error", () => {
  console.log("> error ocurred and program terminated");
  client.destroy();
});

client.on("timeout", () => {
  console.log("> timeout ocurred and program terminated");
  client.destroy();
});
