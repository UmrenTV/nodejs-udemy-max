const http = require("http");
const routes = require("./routes");

// function rqListener(req, res) {}
// http.createServer(rqListener) - Way 1
// http.createServer(function(req, res) {}) - Way 2

// - Way 3
// const server = http.createServer((req, res) => {
//   // console.log(req); - this is for checking the whole request object, which is a huge object
//   console.log(req.url, req.method, req.headers); // - this is for checking the url, method and headers of the request object, which you typically need
//   // process.exit(); // exit the process, which you never typically do, because you can do that by pressing ctrl + c

//   // const url = req.url;
//   // const method = req.method;
// });

// - Way 4
const server = http.createServer(routes.handler);

server.listen(3000);
