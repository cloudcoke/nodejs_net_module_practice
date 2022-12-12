// TODO: 응답 메시지 보내기
// TODO: Content-type에 맞춰서 데이터 보내주기
const fileRead = require("./template");

const testContent = `<h1>Hello World!</h1>`;

const message = (content, type) => {
  const body = Buffer.from(content);
  if (type === undefined) type = `text/html`;

  return `HTTP/1.1 200 OK
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
      const body = fileRead(filename);
      const response = message(body, type);
      client.write(response);
    },
  };
};

if (require.main === module) {
  const test = message(testContent);
  console.log(test);
}
