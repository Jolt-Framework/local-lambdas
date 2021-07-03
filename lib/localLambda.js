const express = require('express');
const createCallback = require("./createCallback");
const createEvent = require("./createEvent");
const logRequest = require("./middleware/logger");
const setupSecrets = require("./setupSecrets");
const { existsSync, createFunctionPath } = require("./fileOperations");

const localLambdaServer = (functionServerPort = 3001, functionsFolder) => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(logRequest);

  if(!existsSync(`${process.env.PWD}/${functionsFolder}`)) {
    return console.log("Functions folder folder not found at the specified path");
  }

  console.log(`Local Lambdas running on port ${functionServerPort}...`);

  app.all("/*", async (req, res) => {
    let functionName = req.url;

    const functionPath = createFunctionPath(functionsFolder, functionName);

    if (!functionPath) {
      res.status(404).send({
        error: `Function: '${functionName}' wasn't found`
      });
    } else {
      const functionEvent = createEvent(req);
      const clearSecrets = setupSecrets(functionPath, functionName);
      const requestedFunction = require(functionPath).handler;

      const callbackStatus = { sent: false };
      const cleanup = () => {
        delete require.cache[require.resolve(functionPath)];
        clearSecrets();
      }

      const callback = createCallback(callbackStatus, cleanup, res);

      try {
          let output = await requestedFunction(
            functionEvent,
            {},
            callback
          );
        if (requestedFunction.constructor.name === "AsyncFunction" && 
            !callbackStatus.sent) {
          callback(null, output);
        }
      } catch(err) {
        cleanup();
        console.log(err);
      }
    }
  })

  app.listen(functionServerPort);
}

module.exports = localLambdaServer;
