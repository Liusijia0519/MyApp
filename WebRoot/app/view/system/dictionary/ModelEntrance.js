Ext.define('MyApp.view.system.dictionary.ModelEntrance', {
	extend : 'Ext.container.Container',
	xtype : 'system_dictionary_modelEntrance',

	border : false,

	layout : {
		type : 'border'
	},

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'system_dictionary_dictionaryTypeTree',
				region : 'west',
				split : true,
				frame : true,
				width : 200,
				collapsible : true,
				title : '字典类别'
			}, {
				xtype : 'container',
				region : 'center',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'panel',
					margins : '0 0 5 0',
					frame : true,
					dockedItems : [ {
						xtype : 'toolbar',
						dock : 'top',
						ui:'footer',
						defaults : {
							scale : 'medium',
							iconAlign : 'top',
							xtype : 'button'
						},
						items : [ {
							xtype : 'tbfill'
						}, {
							text : '新增字典',
							iconCls : 'action_add_24',
							action : 'add'
						}, {
							text : '编辑字典',
							iconCls : 'action_eidtfile_24',
							action : 'edit'
						}, {
							text : '保存操作',
							iconCls : 'action_save_24',
							action : 'save'
						}, {
							text : '刷新数据',
							iconCls : 'action_refresh_24',
							action : 'refresh'
						}, {
							text : '重置缓存',
							iconCls : 'action_exclamatory_24',
							action : 'reset'
						}, {
							xtype : 'tbfill'
						} ]
					} ]
				}, {
					xtype : 'system_dictionary_dictionaryTreeGrid',
					flex : 1
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});