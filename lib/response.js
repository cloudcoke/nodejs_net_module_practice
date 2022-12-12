const fileRead = require("./template");

const testContent = `<h1>Hello World!</h1>`;

const message = (content, status = "200 OK", type = "text/html") => {
  const body = Buffer.from(content);
  if (status === null) {
    status = "404 Not Found";
  }
  return `HTTP/1.1 ${status}
Connection: Close
Content-type: ${type}; charset=UTF-8
Content-Length: ${body.length}

${body.toString()}`;
};

module.exports = (client) => {
  return {
    send: (body) => {
      const response = message(body);
      client.write(response);
    },
    sendFile: (filename, type) => {
      const [body, status] = fileRead(filename);
      const response = message(body, status, type);
      client.write(response);
    },
  };
};

if (require.main === module) {
  const test = message(testContent);
  console.log(test);
}
