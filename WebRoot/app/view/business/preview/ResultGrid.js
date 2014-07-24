
Ext.define('MyApp.view.business.preview.ResultGrid', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_preview_ResultGrid',
	frame : true,
	title : '请在左侧选择账期...',
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {

			store : Ext.create('MyApp.store.business.PreviewResultStore', {
				autoLoad : false
			}),
			plugins: [
						Ext.create('Ext.grid.plugin.CellEditing', {
						})
			],
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
				flex : 1,
				editor: {
					xtype : 'numberfield',
					hideTrigger: true,//隐藏上下箭头
					minValue: 0,
					allowNegative:false //不允许负数
					//step : 0.01
	            }
			}, {
				text : '违规扣费',
				dataIndex : 'amountdeduct',
				flex : 1,
				editor: {
					xtype : 'numberfield',
					hideTrigger: true,//隐藏上下箭头
					minValue: 0,
					allowNegative:false//不允许负数
					//step : 0.01
	            }
			}, {
				text : '补充结算款',
				dataIndex : 'amountaddition',
				flex : 1,
				editor: {
					xtype : 'numberfield',
					hideTrigger: true,//隐藏上下箭头
					minValue: 0,
					allowNegative:false //不允许负数
					//step : 0.01
	            }
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
			},{
				text : '实际结算率（外部）',
				dataIndex : 'ratiooutter',
				flex : 1,
				renderer: function(value){
			            return (Math.round(value * 10000)/100).toFixed(2) + '%';
			    }
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				ui : 'footer',
				dock : 'top',
				defaults : {
					scale : 'medium',
					xtype : 'button'
				},
				items : [ {
					text : '发布结算单',
					iconCls : 'action_detail_24',
					action : 'publishResult'
				},{
					text : '运营商确认',
					iconCls : 'action_eidtfile_24',
					action : 'operatorsChecked'
				} ,'-',{
					text : '导出结算单',
					iconCls : 'action_excel_24',
					action : 'exportPartnerResult'
				},{
					text : '导出所有APP',
					iconCls : 'action_excel2_24',
					action : 'exportAllApp'
				},'->', {
					text : '查看发票',
					iconCls : 'action_updateRecord_24',
					action : 'viewInvoice'
				}, {
					text : '保存修改',
					iconCls : 'action_save_24',
					action : 'saveResult'
				}

				]
			} ]
		});
		me.callParent(arguments);
		var param = {};
    	param.pid = '123';//随便写个数   否则刚进来之后点击分页条上的刷新 就把所有数据都刷出来了
		me.getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
	}
});