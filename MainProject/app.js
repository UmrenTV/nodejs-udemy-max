const http = require("http");

const express = require("express");

const app = express();

// app.use is basically called middleware, that funnels the request through. You can chain as many middlewares as you like, as long as you use "next()" to continue to the next middleware.
// app.use is a middleware that gets executed for every request the server gets, and they get executed one by one as defined, by calling next().

app.use((req, res, next) => {
  console.log("In the middleware");
  next(); // This allows the request to continue to the next middleware in line
}); // this gets executed every time request is recieved

// This will never get executed unless we do "next" in the previous app.use
app.use((req, res, next) => {
  console.log("In the next middleware");
  res.send("<h1>Hello from Express</h1>"); // send is express function that sets the headers and the .write() and other things automatically
});

// So basically if I decided to send the response in the first "middleware", then the second one will never get executed. You either call the next middleware with next(), or you can write the response with res.write, res.end as with vanilla, or use the Express way of res.send()

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000); // express way of doing the server
