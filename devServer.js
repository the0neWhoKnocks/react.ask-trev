const path = require('path');
const opn = require('opn');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);
const DOMAIN = 'localhost';
const PORT = 8181;
const PUBLIC = '/public';
const OS = function(){
  const platform = process.platform;
  
  if( /^win/.test(platform) ) return 'WINDOWS';
  else if( /^darwin/.test(platform) ) return 'OSX';
  else if( /^linux/.test(platform) ) return 'LINUX';
  else return platform;
}();
const CHROME = function(){
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
  if (err) return console.log(err);
  
  const url = `http://${DOMAIN}:${PORT}`;
  
  console.log(`[ APP ] running at ${url}`);
  opn(url, {
    app: [CHROME, '--incognito']
  });
});
