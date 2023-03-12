# logger

Owlebot universal Logger.  

## Setup

Node version: [Node v18+](https://nodejs.org/en/download/)

**Install dependencies:**  
`yarn`  

**Start application:**  
`yarn start`  

## Features

Logging with context about current repo and different logging levels:  

- debug
- info
- warn
- error

Call logger with 3 arguments:

- [required] The module for this log
- [required] The log message
- [optional] The object to inspect (separate line for correct object inspection)

Log express route following this template:

```js
Logger.debug("TYPE", `/router/${route}`, reqBody);
```

## Examples

Basic example:  

```js
import Logger from "@owlebot/logger";

Logger.create("@owlebot/repo");

Logger.debug("Module", "log");

Logger.debug("Module", "log", object);
```

Log routes (at the top of every express route):

```js
Logger.debug("GET", `/community/${req.params.id}`, req.query);
Logger.debug("POST", `/community/${req.params.id}`, req.body);
```

## Contributions

Feel free to contribute to this project by opening PRs or Issues. Contributions are always welcome.  
To know more about contributions, discuss the development or get help, you can join our discord server [here](discord.com).  
