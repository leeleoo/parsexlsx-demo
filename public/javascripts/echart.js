var main1Charts = echarts.init(document.getElementById('main1'));
var main2Charts = echarts.init(document.getElementById('main2'));

// 指定图表的配置项和数据
option = {
	tooltip: {
		trigger: 'axis'
	},
	legend : {
		data: []
	},
	grid   : {
		left        : '3%',
		right       : '4%',
		bottom      : '3%',
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis  : {
		type       : 'category',
		boundaryGap: false,
		data       : []
	},
	yAxis  : {
		type: 'value'
	},
	series : [
	]
};


