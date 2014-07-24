
Ext.define('MyApp.view.business.prm.Grid', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_prm_Grid',
	frame : true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			 store : Ext.create('MyApp.store.business.PrmHistoryStore', {
			 autoLoad : true
			 }),
			columns : [ {
				text : 'id',
				hidden : true,
				dataIndex : 'id',
				flex : 1
			}, {
				text : '账期',
				dataIndex : 'pid',
				flex : 1
			}, {
				text : '省份',
				dataIndex : 'province',
				flex : 1
			}, {
				text : '应收金额',
				dataIndex : 'amountreceivable',
				flex : 1
			}, {
				text : '实收金额',
				dataIndex : 'amountreceived',
				flex : 1
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				ui : 'footer',
				dock : 'top',
				defaults : {
					scale : 'medium',
					xtype : 'button'
				},
				items : [ /*{
					xtype : 'textfield',
					fieldLabel : '选择账期'
				}, {
					text : '查询',
					iconCls : 'action_search_24',
					action : 'search'
				},*/ '->', {
					text : 'PRM数据导入',
					iconCls : 'action_excel_24',
					action : 'import'
				}

				]
			} ]
		});
		me.callParent(arguments);
	}
});