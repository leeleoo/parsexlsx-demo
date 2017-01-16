var express    = require('express');
var router     = express.Router();
var formidable = require('formidable')
var XLSX       = require('xlsx');
/* GET users listing. */


router.post('/', function (req, res, next) {
	var form            = new formidable.IncomingForm()
	form.uploadDir      = 'xslxs';	 //设置上传目录
	form.keepExtensions = true;	 //保留后缀
	form.on('field', function (name, value) {
		console.log('field:', name, value);
	});
	form.on('fileBegin', function (name, file) {
		//console.log('fileBegin:',name,file)
		file.path = form.uploadDir + '/' + file.name
	});
	form.parse(req, function (err, fields, files) {
		console.log('files', files.file.path)
		if (err) {
			res.locals.error = err
			res.json({
				code: 500,
				msg : '文件解析错误'
			})
		}
		res.json({
			msg: '上传成功',
			path: files.file.path
		})
	})
});

module.exports = router;
function getLine(worksheet, lineNum) {
	var result = []
	var reg    = /\d+/g;
	Object.keys(worksheet).map((item) => {
		item.match(reg) == lineNum && result.push(worksheet[item].v);
	})
	return result
}
function getCol(worksheet, colNum) {
	var result = []
	var reg    = /\D+/g
	Object.keys(worksheet).map((item) => {
		item.match(reg) == colNum && result.push(worksheet[item].v);
	})
	return result
}
