# Local Lambda Server

### `local-lambdas` is a tool for running Node.js Lambdas locally.

This is a fork of the Lambda testing server provided with the [Jolt Framework](https://github.com/Jolt-Framework/jolt) adapted to serve as a standalone CLI tool.

**Features:**
- Hot reloading of functions so you don't need to restart the server.
- Environment variables are made available during function invocation.
- Supports both synchronous and asynchronous Lambdas
- Functions can be nested to support multi-segment paths (ie: `GET http://localhost:3001/one/two/myLambda`)

### Installation:

```
npm i -g local-lambdas`
```

### Usage:

```
runlambdas functionFolderName [portNumber]
```

- A `functionFolderName` is provided as a relative path. This tells `local-lambdas` where to look for Lambda handlers
- Lambda handlers will be loaded based on the request path with the `functionFolderName` as the root
  - ie: A request to `http://localhost:3001/one/two/myLambda` will try to invoke the function at the relative path `./functionFolderName/one/two/myLambda.js`
- Environment variables (if any are present) are loaded from the `.env` file located in the same directory as the Lambda at runtime.
- By default, the server will run on port 3001, but an optional `portNumber` parameter lets you specify a different port.
