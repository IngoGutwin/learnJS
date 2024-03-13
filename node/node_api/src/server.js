const http = require('node:http');

const PORT = process.env.PORT || 8080;

function app(req, res) {
  console.log('############ -- headers-start: -- ############');
  console.log(req.headers);
  console.log('############ -- headers-end -- ###############');

  return res.end();
}

const server = http.Server(app);

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}...`));
