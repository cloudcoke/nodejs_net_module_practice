const fs = require("fs");
const path = require("path");
const DEFAULT_DIR = "../views";

const fileRead = (filename) => {
  let readLine = "";
  let status;
  try {
    const target = path.join(__dirname, DEFAULT_DIR, filename);
    readLine = fs.readFileSync(target, "utf-8");
    return [readLine, status];
  } catch (err) {
    const target = path.join(__dirname, DEFAULT_DIR, "404.html");
    readLine = fs.readFileSync(target, "utf-8");
    status = null;
    return [readLine, status];
  }
};
module.exports = fileRead;

if (require.main === module) {
  console.log(fileRead("index.html"));
}
