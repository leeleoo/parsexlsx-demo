var express = require('express');
var router  = express.Router();
var path    = require('path')
var fs      = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
	console.log('next', next);
	res.sendFile('index.html', {
		root: __dirname + '..' + '/public/',
	}, function (err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
		else {
			console.log('Sent:', 'index.html');
		}
		
	});
});
router.get('/filelist', function (req, res, next) {
	fs.readdir('xslxs', function (err, files) {
		if (!err) {
			res.json({
				msg     : '',
				filelist: files
			})
		}
	})
})


module.exports = router;
