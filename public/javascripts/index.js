var ACTIONLIST = {
	getChartsData: function ($target) {
		$.getJSON('/parse_xls?file_path=xslxs/'+$target.html(), function (res) {
			console.log(res)
			dispatch(res);
		})
	}
}
$('body').on('click', '[data-action]', function (e) {
	var $target = $(e.target)
	var action  = $target.data('action')
	ACTIONLIST[action] && ACTIONLIST[action]($target)
})

$('#upload').on('change', function (e) {
	var $target = $(e.target)
	uploadHander($target[0], '/upload', function (var1, var2) {
		refreshFileList();
		//console.log(var1, var2)
		//status == '200' && console.log('成功')
	}, function (event) {
		console.log(event)
	})
})
function uploadHander(dom, url, cb, progresscb) {
	if (!(dom.files && dom.files[0])) return;
	var formData = new FormData()
	formData.append('file', dom.files[0])
	var xhr = new XMLHttpRequest()
	xhr.open('POST', url)
	
	xhr.onload = cb.bind(this, xhr)
	if (progresscb) {
		/**
		 * progresscb(event)
		 * var complete = (event.loaded / event.total * 100 | 0);
		 */
		xhr.upload.onprogress = progresscb
	}
	xhr.send(formData)
}
function render(res, cb, filterHandler) {
	var _ops = JSON.parse(JSON.stringify(option))
	console.log('_ops:', _ops)
	res.map(function (item, index) {
		
		if (index != 0) {
			
			_ops.legend.data.push(item[0])
			var newArr = item.slice(1)
			if (filterHandler) {
				newArr = newArr.reduce(function(prev,curr){
					prev.push(filterHandler(curr))
					return prev
				},[])
			}
			
			var series = {
				name: item[0],
				type: 'line',
				data: newArr
			}
			
			
			_ops.series.push(series)
		} else {
			//等于0是日期
			_ops.xAxis.data = item.slice(1)
		}
	})
	
	cb(_ops)
}
function dispatch(res) {
	var dataPercent = []
	var numerical   = []
	res.data.map(function (item, index) {
		if (index === 0) {
			dataPercent.push(item)
			numerical.push(item)
		} else {
			
			if (item[0].indexOf('占比') === -1) {
				dataPercent.push(item)
			} else {
				numerical.push(item)
			}
			
		}
	})
	//console.log('dataPercent:',dataPercent)
	//console.log('numerical:',numerical)
	render(dataPercent, function (ops) {
		main2Charts.setOption(ops);
	})
	render(numerical, function (ops) {
		main1Charts.setOption(ops);
	}, function (item) {
		return parseFloat(item)
	})
	
}
function refreshFileList() {
	$.getJSON('/filelist',function(res){
		$('#file-list').html('')
		res.filelist && res.filelist.map(function(item){
			$('#file-list').append('<a href="#" class="list-group-item" data-action="getChartsData">'+item+'</a>')
			
		})
	})
}

$(function(){
	refreshFileList()
})