const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("This always gets executed");
  next(); // This will call the next middleware, if path matches
});

app.use("/users", (req, res, next) => {
  console.log("This gets executed only if route matches /users");
  res.send(`<h1>Hello Users</h1>`);
});
app.use("/", (req, res, next) => {
  if (req.url === "/") {
    console.log("This gets executed only for / path");
    res.send(`<h1>Hello from Home</h1>`);
  } else {
    console.log(
      "This gets executed for every route, even if route is not exactly '/', so we can use it as 'catch-all'?"
    );
    res.send(
      `<h1>Wrong Page!</h1><form method="POST" action="/"><button type="submit">Go Home?</button></form>`
    );
  }
});

app.listen(3000);
