var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var mimeTypes = {
           "html": "text/html",
           "jpeg": "image/jpeg",
           "jpg": "image/jpeg",
           "png": "image/png",
           "js": "text/javascript",
           "css": "text/css",
		   "ico":"image/x-icon"};
var databaseUrl = "test"; 
var collections = ["testData"]
var mongojs = require("mongojs");
var db=mongojs(databaseUrl, collections);
var server = http.createServer(function onRequest(request, response) {
       var urlParts = url.parse(request.url);
       var fullPath = urlParts.pathname;
	   console.log("Request for " + fullPath + " received.")
       var page = 'pages' + urlParts.pathname;
	   console.log('page '+page)
       var jsonUserOject = '';
       if (fullPath == "/post") {
            var userName = '';
               request.on('data', function(chunk) {
               jsonUserObject = JSON.parse(chunk.toString());
               userName = jsonUserObject.name;
               userEmail = jsonUserObject.email;
               db.testData.insert({jsonUserObject: jsonUserObject}, function(err, testData) {
                   if( err || !testData) console.log("Unable to add user");
                   });
               });
       }
  /*   var mimeType = mimeTypes[path.extname(page).split(".")[1]];
	console.log("mimeType" + mimeType + " received.") */
	
    /* fs.exists(page, function fileExists(exists) {
              if (exists) {
                   response.writeHead(200, mimeType);
                   fs.createReadStream(page).pipe(response);
              } else {
                   response.write('Page Not Found');
                   response.end();
              }
    });
	 */
	 
	fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    /* http.createServer(function(request, response) {   */
        /* response.writeHeader(200, {"Content-Type": "text/html"});   */
		 response.writeHeader(200, {"Content-Type": mimeTypes});
        response.write(html);  
        response.end();  
   /*  }) */
});
	
	
	
}).listen(3300);
console.log('server is running on port 3300');