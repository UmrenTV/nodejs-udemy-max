const http = require("http");

const express = require("express");

const app = express();

// app.use is basically called middleware, that funnels the request through. You can chain as many middlewares as you like, as long as you use "next()" to continue to the next middleware.
// app.use is a middleware that gets executed for every request the server gets, and they get executed one by one as defined, by calling next().

app.use((req, res, next) => {
  console.log("In the first middleware");
  next(); // This allows the request to continue to the next middleware in line
}); // this gets executed every time request is recieved, and it works for every route, since the first argument of .use is omitted, which is path

// This will never get executed unless we do "next" in the previous app.use
app.use("/dsada", (req, res, next) => {
  console.log("In the next middleware");
  res.send("<h1>Hello from Express</h1>"); // send is express function that sets the headers and the .write() and other things automatically
  // next(); typically you never do next() if you gonna send response, because if the next middleware contains res.send or something with res again, it will give you an error. So you either send response and finish the things, or you call the next middleware with next()
});

const path = "/";
const callback = (req, res, next) => {
  console.log(`we are in the callback of ${path}`);
  next();
};

app.use(path, callback); // this is how we generally use app.use. We can do app.use('/', (req, res, next) => { blabla }) as above for short. Important thing is that differs this from the chained if statements that we were using before with vanilla is that even tho app.use('/') and app.use('create-user') don't match the path, if we chain them one after another, and don't call "next()" on the first one, the 'create-user' will never happen, which is different that before, where if we do it with if-statements, if one doesn't match, other does, it gets executed. Here, it will never get executed, even if path matches. so this is how we do it:

app.use("/path", (req, res, next) => {
  console.log("we are in /");
  next(); // if we don't call this, even if route is /create-user, the below request will never get through
});
app.use("/create-user", (req, res, next) => {
  console.log("we are in /create-user");
});

// So basically if I decided to send the response in the first "middleware", then the second one will never get executed. You either call the next middleware with next(), or you can write the response with res.write, res.end as with vanilla, or use the Express way of res.send()

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000); // express way of doing the server
