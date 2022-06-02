const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const client = new net.Socket();

const HOST = "127.0.0.1";
const PORT = 65456;

console.log("> echo-client is activated");

client.connect(PORT, HOST, () => {});

client.on("data", (data) => {
  console.log(`> received: ${data}`);
  if (data == "quit") {
    client.destroy();
  }
});

rl.on("line", (line) => {
  client.write(line);
});

rl.on("close", () => {
  process.exit();
});

client.on("close", () => {
  console.log("> echo-client is de-activated");
  rl.close();
});
