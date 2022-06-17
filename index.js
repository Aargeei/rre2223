let http = require("http");
let fs = require("fs");
var formidable = require("formidable");

http
  .createServer(function (req, res) {
    if (req.url === "/upload") {
      var form = new formidable.IncomingForm({
        uploadDir: __dirname
      });
      form.parse(req, function (err, fields, file) {
        var oldpath = file.filetoupload.filepath;
        var newpath = file.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, function (error) {
          if (error) res.end("File upload error occurred!!");
        });
        //var output1 = "{" + newpath + "}";
        var output1 = "<script>alert('File uploaded successfully');</script>";
        res.write(output1);
        fs.createReadStream(__dirname + "/ReadDocx.html").pipe(res);
      });
    } else if (req.url === "/analyze") {
      fs.createReadStream(__dirname + "/analyzeme.html").pipe(res);
      //res.end(req.url);
    } else if (req.url === "/perform") {
      fs.createReadStream(__dirname + "/performme.html").pipe(res);
      //res.end(req.url);
    } else {
      fs.createReadStream(__dirname + "/boom.html").pipe(res);
      //res.end(req.url);
    }
  })
  .listen(1337);
