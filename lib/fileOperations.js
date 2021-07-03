const path = require("path");
const existsSync = require("fs").existsSync;

const createFunctionPath = (functionsFolder, functionName) => {
  const fullPath = path.join(process.env.PWD, functionsFolder, functionName);
  const jsPath = fullPath + ".js";
  const tsPath = fullPath + ".ts";

  if (existsSync(jsPath)) {
    return jsPath;
  } else if (existsSync(tsPath)) {
    return tsPath;
  }
}

module.exports = { existsSync, createFunctionPath }
