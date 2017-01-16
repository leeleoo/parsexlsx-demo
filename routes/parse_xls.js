var express  = require('express');
var router   = express.Router();
var XLSX     = require('xlsx');
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
/* GET users listing. */
router.get('/', function (req, res, next) {
	
	var file_path = req.query.file_path
	if (!file_path) return;
	var workbook         = XLSX.readFile(file_path)
	var first_sheet_name = workbook.SheetNames[0];
	var worksheet        = workbook.Sheets[first_sheet_name];
	var totalCol         = getCol(worksheet, 1)
	console.log(totalCol)
	//var totalRow         = getCol(worksheet, 'A').length
	totalCol = totalCol.length
	console.log(totalCol)
	var result = []
	
	for(var i = 0; i < totalCol ;i++){
		result.push(getLine(worksheet,alphabet[i]))
	}
	res.json({
		msg : 'ok',
		data: result
	})
});

module.exports = router;

function getLine(worksheet, lineNum) {
	var result = []
	var reg    = /\D+/g;
	Object.keys(worksheet).map((item) => {
		item.match(reg) == lineNum && result.push(worksheet[item].v);
	})
	return result
}
function getCol(worksheet, colNum) {
	var result = []
	var reg    = /\d+/g
	Object.keys(worksheet).map((item) => {
		
		if (item.match(reg) == colNum) {
			//并且不是第一个
			//if (item.match(/\d+/g) == '1') return
			
			result.push(worksheet[item].v);
			
		}
		
	})
	return result
}