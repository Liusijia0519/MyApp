
Ext.define('MyApp.view.business.process.ProcessResultGrid', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_process_ProcessResultGrid',
	//frame : true,
	//border:false,
	title:'请在左侧选择账期结算单...',
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			 store : Ext.create('MyApp.store.business.ProcessResultStore', {
			 autoLoad : false
			 }),
			columns : [ {
				text : 'id',
				hidden : true,
				dataIndex : 'id',
				flex : 1
			}, {
				text : 'pid',
				hidden : true,
				dataIndex : 'pid',
				flex : 1
			}, {
				text : '应用名称',
				dataIndex : 'appname',
				flex : 2
			}, {
				text : '平台结算金额',
				dataIndex : 'amountplm',
				flex : 1
			}, {
				text : 'PRM结算金额',
				dataIndex : 'amountprm',
				flex : 1
			}, {
				text : '应收实结金额',
				dataIndex : 'amountrecived',
				flex : 1
			}, {
				text : '退费赔款',
				dataIndex : 'amountreturn',
				flex : 1
			}, {
				text : '违规扣费',
				dataIndex : 'amountdeduct',
				flex : 1
			}, {
				text : '补充结算款',
				dataIndex : 'amountaddition',
				flex : 1
			}, {
				text : '实结金额',
				dataIndex : 'amounttotal',
				flex : 1
			}, {
				text : '结算率（内部）',
				dataIndex : 'ratioinner',
				flex : 1,
				renderer: function(value){
			             return (Math.round(value * 10000)/100).toFixed(2) + '%';
			    }
			}, {
				text : '实际结算率（外部）',
				dataIndex : 'ratiooutter',
				flex : 1,
				renderer: function(value){
			             return (Math.round(value * 10000)/100).toFixed(2) + '%';
			    }
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				//ui : 'footer',
				dock : 'top',
				defaults : {
					scale : 'medium',
					xtype : 'button'
				},
				items : [  {
					text : '确认结算单',
					iconCls : 'action_eidtfile_24',
					action : 'checkTrack'
				},{
					text : '上传发票',
					iconCls : 'action-clyj-24',
					action : 'uploadInvoice'
				},'->',{
					text : '导出结算单',
					iconCls : 'action_excel_24',
					action : 'importPartnerResult'
				}
				]
			} ]
		});
		me.callParent(arguments);
		var param = {};
    	param.pid = '123';//随便写个数   否则刚进来之后点击分页条上的刷新 就把所有数据都刷出来了
		me.getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
		//me.store.load();
	}
});