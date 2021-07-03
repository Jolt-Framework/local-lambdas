#!/usr/bin/env node
const server = require("../lib/localLambda")

const functionsFolder = process.argv[2];
const port = process.argv[3];

const run = () => {
  if (!functionsFolder) {
    console.log("Please specify an entry point where your Lambda files are",
      "located. ie: lambdas functions");
  } else {
    server(port, functionsFolder);
  }
}

run();
