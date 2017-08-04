var express = require('express');
var app = express();
var path = require('path');
var fetch = require('node-fetch');

app.get('/', function (req, res) {
  var role=req.get('X-Hasura-Role');
  if (role=='anonymous')
    res.sendFile(path.join(__dirname, 'ui', 'auth.html'));
  else
    res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

app.get('/ui/script/:filename',function(req,res){
  var filename=req.params.filename;
  res.sendFile(path.join(__dirname,'ui','script',filename));
});

app.get('/ui/style/:filename',function(req,res){
  var filename=req.params.filename;
  res.sendFile(path.join(__dirname,'ui','style',filename));
});

app.get('/ui/images/:filename',function(req,res){
  var filename=req.params.filename;
  res.sendFile(path.join(__dirname,'ui','images',filename));
});

app.get('/get-id',function (req,res) {
  var role=req.get('X-Hasura-Role');
  if(role=='anonymous')
    res.send("User");
  else
    res.send(req.get('X-Hasura-User-Id'));
});

app.get('/logout',function (req,res) {

});

app.get('/:pagename', function (req, res) {
  var pagename=req.params.pagename;
  var role=req.get('X-Hasura-Role');
  if (role=='anonymous')
    res.sendFile(path.join(__dirname, 'ui', 'auth.html'));
  else
    res.sendFile(path.join(__dirname, 'ui', pagename+'.html'));
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
