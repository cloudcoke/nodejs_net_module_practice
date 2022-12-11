const net = require("net");

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "0.0.0.0";

const server = net.createServer((c) => {
  c.setEncoding("utf-8");
});

server.listen(PORT, HOST, () => {
  console.log(`Server Start`);
});

server.on("connection", () => {
  console.log(`Connected to Browser`);
});
