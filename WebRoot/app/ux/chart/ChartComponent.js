/**
 * @class MyApp.ux.chart.ChartComponent
 * @extends Ext.Component
 * @description 结合FusionCharts封装系统图标组件
 * @author 葛新
 */
Ext.define("MyApp.ux.chart.ChartComponent", {
	extend: 'Ext.Component',
	
	//the tpl templete
	renderTpl: '<div></div>',
	
	//Ext.Element
	renderSelectors: {
		divEl: 'div'
	},
	
	//FusionCharts Introduction
	//对应图表文件路径
	swfUrl: '',
	
	//图表id
	chartId: '',
	
	//数据格式
	dataFormat: 'json',

	ChartNoDataText: '没有符合条件的数据.',
	
	PBarLoadingText: '图表加载中,请稍等.',
	
	//图表导出时显示进度条的文字
	exportDialogMessage: '操作处理中',
	
	//数据源
	dataSource: {},
	
	//默认设置
	defaultSet: {},
	
	initComponent: function() {
		var me = this;
		me.callParent();
		//设置默认值
		me.defaultSet = {
			baseFont: '宋体',
			baseFontSize: 15,
			baseFontColor: '666666',
			showAboutMenuItem: 0,
			showborder: 0,
			showPrintMenuItem: 1,
			
			exportDialogMessage: me.exportDialogMessage,
			exportHandler: 'FCExporter',
			exportAction: 'download', //save
			exportEnabled: 0, //是否开启导出功能,
			exportFormats: 'PDF=导出PDF格式文件|PNG=导出PNG格式文件|JPG=导出JPG格式文件'
		};
		Ext.applyIf(me.dataSource.chart, me.defaultSet);
		this.on('afterrender', this.handleAfterrender, this);
		this.on('resize', this.handleResizeEvent, this);
	},
	
	/**
	 * 初始化图表到组件
	 */
	handleAfterrender: function() {
		var me = this;
		var chart = new FusionCharts({
			swfUrl : me.swfUrl,  
		    id : me.chartId = Ext.id(),
		    width : "100%",
		    dataFormat:'json',
		    registerWithJS: '1',
		    height : "100%",
		    dataSource : me.dataSource
		});
		chart.configure({
			ChartNoDataText: me.ChartNoDataText,
			PBarLoadingText: me.PBarLoadingText
		});
		chart.render(me.divEl.dom);
	},
	
	/**
	 * 动态设置图表大小
	 */
	handleResizeEvent: function(cmp, width, height, oldWidth, oldHeight, eOpts ) {
		FusionCharts(this.chartId).resizeTo(width, height);
	},
	
	/**
	 * 组件销毁之前需要先销毁图表组件
	 */
	beforeDestroy: function () {
		FusionCharts(this.chartId).dispose();
        this.callParent();
    },
    
    /**
     * 设置数据源
     * @param {FusionCharts} dataSource
     */
	setDataSource: function(dataSource) {
		Ext.apply(dataSource.chart, this.defaultSet); 
		FusionCharts(this.chartId).setJSONData(dataSource);
	},
	
    /**
     * 获取数据源
     * @Return{FusionCharts dataSource}
     */
	getDataSource: function() {
		return FusionCharts(this.chartId).getJSONData;
	},
	
    /**
     * 获得图表对象
     * @Return{FusionCharts ChartObject}
     */
	getChart: function() {
		return FusionCharts(this.chartId);
	},
	
	/**
	 * 打印图表
	 */
	print: function() {
		FusionCharts(this.chartId).print();
	}
	
});