const net = require("net");
const request = require("./lib/request_parse");
const response = require("./lib/response");

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "0.0.0.0";

const type = { html: "text/html", css: "text/css", js: "text/js" };

const server = net.createServer((c) => {
  c.setEncoding("utf-8");

  c.on("data", (chunk) => {
    const res = response(c);
    const req = request(chunk);
    const reqType = req.path.split(".").pop();

    if (req.method === "GET" && req.path === "/") {
      res.sendFile("index.html");
    } else if (req.method === "GET" && req.path === "/index") {
      res.sendFile("index.html");
    } else if (req.method === "GET" && req.path === `/index.${reqType}`) {
      res.sendFile(`index.${reqType}`, type[reqType]);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server Start`);
});

server.on("connection", () => {
  console.log(`Connected to Browser`);
});
