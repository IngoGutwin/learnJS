require('dotenv').config();
const http = require('node:http');
const app = require('./app');

const PORT = process.env.APP_PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}...`);
});
