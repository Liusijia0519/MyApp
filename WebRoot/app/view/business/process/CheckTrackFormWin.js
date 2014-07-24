
Ext.define('MyApp.view.business.process.CheckTrackFormWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_process_CheckTrackFormWin',
	height : 300,
	width : 500,
	layout : {
		type : 'fit'
	},
	title : '结算表确认',

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
						emptyText: '如果认为结算表有问题,在此输入问题描述,然后点击问题反馈即可.',
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
					text : '确认无误',
					action : 'passTrack',
					iconCls : 'action_confirm_24',
					state : '2'
				},{
					text : '问题反馈',
					action : 'submitQuestion',
					iconCls : 'action_delete_24',
					state : '1.5'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});