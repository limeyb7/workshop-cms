var fs = require("fs");
var querystring = require("querystring");

function handler(request, response){
  var endpoint = request.url;
  console.log(endpoint);

  var method = request.method;
  if(endpoint === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + "/../public/index.html", function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    })
  } else if(endpoint == "/create-post"){
    var allTheData = "";
    request.on("data", function(chunkOfData) {
      allTheData += chunkOfData;

    });
    request.on("end", function() {
      response.writeHead(308, {"Location": "/"});
      var parsed = querystring.parse(allTheData)
      console.log(parsed);
      response.end();
    })


  } else {
    var fileName = request.url;
    var fileType = request.url.split(".")[1];
    console.log(fileType);
    response.writeHead(200, {"Content-Type": "text/" + fileType});
    fs.readFile(__dirname + "/../public" + fileName, function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    });
  }
}
module.exports = handler;
