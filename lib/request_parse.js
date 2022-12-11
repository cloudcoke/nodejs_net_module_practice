const testMessage = `GET /user?name=cloudcoke&age=26 HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Cache-Control: max-age=0
sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

{
name:'cloudcoke',
age:'26'
}`;

const divideHeader = (header) => {
  const headers = header.split("\r\n");
  return ([startLine, divHeaders] = [headers.shift(), headers]);
};

const divideStartLine = (starLine) => {
  return ([method, url, httpVer] = starLine.split(" "));
};

const getQueryString = (url) => {
  return ([path, queryString] = url.split("?"));
};

const getQuery = (queryString) => {
  if (queryString === undefined) return null;
  return queryString
    .split("&")
    .map((v) => v.split("="))
    .reduce((acc, cur) => {
      const [key, value] = cur;
      acc[key] = value;
      return acc;
    }, {});
};

const divideHeaders = (headers) => {
  // TODO: headers 객체 만들기
  return headers
    .map((v) => v.split(":"))
    .reduce((acc, cur) => {
      let [key, value, port] = cur;
      if (port !== undefined) value += `:${port}`;
      acc[key] = value;
      return acc;
    }, {});
  // 1. map: [ 'Host', ' localhost', '3000' ], [ 'Connection', ' keep-alive' ],
  // 2. reduce: { Host: ' localhost:3000', Connection: ' keep-alive',}
};

const parser = (msg) => {
  const [header, body] = msg.split("\r\n\r\n");
  const [starLine, divheaders] = divideHeader(header);
  const [method, url, version] = divideStartLine(starLine);
  const [path, queryString] = getQueryString(url);
  const query = getQuery(queryString);
  const headers = divideHeaders(divheaders);
  // TODO: 객체에 담아서 전달
  // body 부분 실제 데이터 확인 필요

  return {
    method,
    path,
    version,
    url: headers.HOST + url,
    query,
    headers,
    body,
  };
};

module.exports = parser;

// NOTE: 파일 직접 실행
if (require.main === module) {
  // NOTE: /g: global match
  const testMsg = testMessage.replace(/\n/g, "\r\n");
  console.log(parser(testMsg));
}
