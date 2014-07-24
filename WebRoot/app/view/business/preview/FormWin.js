
Ext.define('MyApp.view.business.preview.FormWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_preview_FormWin',
	height : 135,
	width : 400,
	layout : {
		type : 'fit'
	},
	title : '选择获取的账期',

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
			        	        url: 'PreviewController.do?method=selectZhangqiCombo',
			        	        reader: {
			        	            type: 'json'
			        	        }
			        	    }},
					    valueField: 'zhangqi',
                        displayField: 'zhangqi'/*,
					    tpl: Ext.create('Ext.XTemplate',
					            '<tpl for=".">',
					                '<div class="x-boundlist-item">{abbr} - {name}</div>',
					            '</tpl>'
					        ),
				        displayTpl: Ext.create('Ext.XTemplate',
				            '<tpl for=".">',
				                '{abbr} - {name}',
				            '</tpl>'
				        )*/
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
					text : '确认获取',
					action : 'saveImport',
					iconCls : 'action_save_24'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});