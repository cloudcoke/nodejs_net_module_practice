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

const parser = (msg) => {
  const [header, body] = msg.split("\r\n\r\n");
  // TODO: start-line과 header 분리하기
  const [starLine, headers] = divideHeader(header);
  console.log("startLine");
  console.log(starLine);
  console.log("");
  console.log("headers");
  console.log(headers);
};

// NOTE: 파일 직접 실행
if (require.main === module) {
  // NOTE: /g: global match
  const testMsg = testMessage.replace(/\n/g, "\r\n");
  parser(testMsg);
}
