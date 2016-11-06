var http = require("http");

var handler = require("./src/handler.js");

var message = "Hello";



var server = http.createServer(handler);

server.listen(5263, function() {
  console.log("server is listening on port 5263. Ready to accept requests!");
})
