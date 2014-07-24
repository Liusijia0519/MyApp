
Ext.define('MyApp.view.business.preview.ExportAllAppFormWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_preview_ExportAllAppFormWin',
	height : 135,
	width : 400,
	layout : {
		type : 'fit'
	},
	title : '选择导出的账期',

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
				items : [{
						xtype : 'combo',
						fieldLabel : '选择账期',
						editable:false,
						allowBlank : false,
						afterLabelTextTpl : requiredTpl,
						name : 'zhangqi',
						store: {
							fields: ['zhangqi'],
					        proxy: {
			        	        type: 'ajax',
			        	        url: 'PreviewController.do?method=getZhangqiComboByTrack',
			        	        reader: {
			        	            type: 'json'
			        	        }
			        	    }},
					    valueField: 'zhangqi',
                        displayField: 'zhangqi'
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
					text : '确认导出',
					action : 'saveExportAllApp',
					iconCls : 'action_confirm_24'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});