
Ext.define('MyApp.view.business.partner.GridWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_partner_GridWin',
	height : 500,
	width : 400,
	layout : {
		type : 'fit'
	},
	title : '渠道信息',

	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [ {
				xtype : 'baseGridPanel',
				border : false,
				store : Ext.create('MyApp.store.business.RatiochannelStore', {
					autoLoad : false
				}),
				plugins: [
							Ext.create('Ext.grid.plugin.CellEditing', {
							})
				],
				columns : [ {
					text : 'id',
					dataIndex : 'id',
					hidden:true
				}, {
					text : 'channelid',
					dataIndex : 'channelid',
					hidden:true
				}, {
					text : '开发者名称',
					dataIndex : 'developerid',
					flex : 1,
					editor: {
		                xtype: 'textfield'
		            }
				}, {
					text : '结算比例',
					dataIndex : 'ratio',
					flex : 1,
					editor: {
						xtype : 'numberfield',
						maxValue : 1,
						minValue : 0,
						step : 0.1
		            }
				} ],
				tbar: [{
		            text: '新增行',
		            action:'addCell'
		        },{
		            text: '删除',
		            action:'deleteChannel'
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
					action : 'saveChannel',
					iconCls : 'action_save_24'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});