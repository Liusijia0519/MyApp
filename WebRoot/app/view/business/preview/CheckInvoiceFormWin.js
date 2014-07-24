
Ext.define('MyApp.view.business.preview.CheckInvoiceFormWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_preview_CheckInvoiceFormWin',
	height : 300,
	width : 500,
	layout : {
		type : 'fit'
	},
	title : '发票确认',

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'baseFormPanel',
				border : false,
				autoScroll : true,
				defaults : {
					columnWidth : 1,
					margin : 10
				},
				layout : {
					type : 'column'
				},
				bodyPadding : 10,
				items : [{
						xtype : 'textarea',
						maxLength:100,
						emptyText: '如果认为发票有问题,在此输入问题描述,然后点击驳回发票即可.',
						//fieldLabel : '选择账期',
						name : 'note',
						height : 180
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
					text : '确认入账',
					action : 'passInvoice',
					iconCls : 'action_confirm_24',
					state : '4'
				},{
					text : '驳回发票',
					action : 'rejectInvoice',
					iconCls : 'action_delete_24',
					state : '3.5'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});