const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body>");
    res.write("<h1>Home Page</h1>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username" placeholder="Enter New User"><button type="submit">Create User</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write("<body>");
    res.write("<ul><li>User 1</li><li>User 2</li></ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      res.write("<html>");
      res.write("<head><title>Create New User</title></head>");
      res.write("<body>");
      res.write(`<h1>Create User</h1>`);
      res.write(`<p>New user <strong>${user}</strong> created.</p>`);
      res.write("</body>");
      res.write("</html>");
    });
  }
  res.write("<html>");
  res.write("<head><title>404</title></head>");
  res.write("<body>");
  res.write("<h1>Four, Oh, Four!</h1>");
  res.write("<h3>Page You are Looking for is NOT here!</h3>");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
