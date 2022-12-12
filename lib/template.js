const fs = require("fs");
const path = require("path");
const DEFAULT_DIR = "../views";

module.exports = (filename) => {
  const target = path.join(__dirname, DEFAULT_DIR, filename);
  const readLine = fs.readFileSync(target, "utf-8");
  return readLine;
};
