
Ext.define('MyApp.view.business.prm.FormWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_prm_FormWin',
	height : 145,
	width : 500,
	layout : {
		type : 'fit'
	},
	title : 'PRM数据导入',

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'baseFormPanel',
				border : false,
				autoScroll : true,
				defaults : {
					columnWidth : 1,
					margin : 10,
					xtype : 'textfield'
				},
				layout : {
					type : 'column'
				},
				bodyPadding : 10,
				title : '',
				items : [ {
					xtype : 'filefield',
					emptyText : '请选择正确的PRM数据Excel文件...',
					allowBlank : false,
					afterLabelTextTpl : requiredTpl,
					buttonText:'请选择...',
					fieldLabel : '导入文件',
					name : 'excel'
				}]
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				defaults : {
					scale : 'medium',
					xtype : 'button',
					margin : '0 3 0 3'
				},
				items : [ {
					xtype : 'tbfill'
				}, {
					text : '保存数据',
					action : 'save',
					iconCls : 'action_save_24'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});