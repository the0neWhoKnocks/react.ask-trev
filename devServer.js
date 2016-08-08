var path = require('path');
var opn = require('opn');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);
var DOMAIN = 'localhost';
var PORT = 8181;
var PUBLIC = '/public';
var OS = function(){
  var platform = process.platform;
  
  if( /^win/.test(platform) ) return 'WINDOWS';
  else if( /^darwin/.test(platform) ) return 'OSX';
  else if( /^linux/.test(platform) ) return 'LINUX';
  else return platform;
}();
var CHROME = function(){
  switch(OS){
    case 'WINDOWS': return 'chrome';
    case 'OSX': return 'google chrome';
    case 'LINUX': return 'google-chrome';
  }
}();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(__dirname + PUBLIC, {}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + PUBLIC, 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  
  var url = `http://${DOMAIN}:${PORT}`;
  
  console.log(`App running at ${url}`);
  opn(url, {
    app: CHROME
  });
});
