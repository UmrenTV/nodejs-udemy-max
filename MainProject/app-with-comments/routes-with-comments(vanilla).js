const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    ); // action="/message" - this is the url that the form will send the data to, method="POST" - this is the method that the form will use to send the data to the url
    // the cool thing is that if we add the input a name like name="message", then the data that we enter in the input will be sent to the url with the name of the input, so in this case, the data will be sent to the url with the name of message, and we can access it in the server side witohut the need of manually sending the message to the url
    res.write("</html>");
    return res.end(); // we don't have to add a return in this case, because we don't have any code after this, but it's a good practice to add a return, because if you add code after this, then you will have to add a return, and if you forget to add a return, then you will have a bug, so it's better to add a return in this case
    // also when the url matches === we want to exit the function and not continue to the next code, because we have finished the response with end(). So if we don't add a return, then the code will continue to the next code, and we will get an error, because we can't write to the response after we have ended it.
    // if the url doesn't match ===, then we will continue to the next code and this return will be ignored.
  }

  if (url === "/message" && method === "POST") {
    // fs.writeFileSync("message.txt", "DUMMY"); // - this will create a file called message.txt and write DUMMY in it - bellow we'll see how it goes with using the actual message
    // res.writeHead(302, { })
    const body = []; // - this is an array that will contain the chunks of data that we get from the request
    req.on("data", (chunk) => {
      // - this is an event listener that will listen to the data event, and when we get a chunk of data, we will push it to the body array
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      // we had to add return here, because we had to return from the function, because we have to end the response, and if we don't return, then the code will continue to the next code, and we will get an error, because we can't write to the response after we have ended it.

      // - this is an event listener that will listen to the end event, and when we get the end event, we will parse the body array, and then we will write the message to the file
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("message.txt", message); // - this will create a file called message.txt and write the message in it, but it's synchronous, and we don't want to use synchronous code, because it will block the event loop, and we want to use asynchronous code, because it will not block the event loop
      fs.writeFile("message.txt", message, (err) => {
        // - this will create a file called message.txt and write the message in it, and it's asynchronous, and it will not block the event loop
        // this is the callback function, and it will be executed when the file is written, and it will be executed in the next tick, and it will not block the event loop, the error will be passed to the callback function, and if there is no error, then the error will be null

        res.statusCode = 302;
        res.setHeader("Location", "/"); // - this is the url that we want to redirect to
        return res.end(); // same as above we have to return here.
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
  // res.write(); // - this will not work, because you can only write once, and then you have to end the response, and once you end the response, you can't write anything else
};

// This is one way of exporting
// module.exports = { handler: requestHandler, someText: "Some hard coded text" };

// This is another way of exporting, which still exports once, because module.exports are bundled together anyways.

// another way
// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text";

// another way
exports.handler = requestHandler;
exports.someText = "Some hard coded text";
