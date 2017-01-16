var fs = require('fs')
var path = require('path')
fs.readdir(path.resolve(__dirname, '../node_modules'),function(err,files){
	console.log('files:',files);
})