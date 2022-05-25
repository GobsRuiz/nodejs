const app = require('./index');
const http = require("http");
const port = 3120;
const server = http.createServer(app);

server.listen(port);