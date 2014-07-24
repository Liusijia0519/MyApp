Ext.define('MyApp.view.system.menu.MenuTreeGrid', {
	extend : 'Ext.tree.Panel',
	xtype : 'system_menu_menuTreeGrid',
	frame : true,

	columnLines : true,

	initComponent : function() {
		var me = this;

		me.plugins = [ me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing') ];

		Ext.applyIf(me, {
			store : 'system.MenuStore',
			viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                },
                listeners: {
                	beforedrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
                		data.records[0].oldPid = data.records[0].get('parentId');
                	},
                	drop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
                		var oldPid = data.records[0].oldPid;
                		var node = this.ownerCt.getStore().getNodeById(oldPid);
                		if(!node.hasChildNodes()) {
                			node.set('leaf', true);
                		}
                		delete data.records[0].oldPid;
                	}
                }
            },
			columns : [ {
				xtype : 'treecolumn',
				sortable: false,
				text : '菜单显示名称',
				dataIndex : 'text',
				flex : 2,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true,
					allowOnlyWhitespace : false
				}
			}, {
				sortable: false,
				text : 'menuClass(模块类全名)',
				dataIndex : 'menuClass',
				flex : 2,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true
				}
			}, {
				sortable: false,
				text : 'extController(控制器)',
				dataIndex : 'extController',
				flex : 2,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true
				}
			}, {
				sortable: false,
				text : 'springController(控制器)',
				dataIndex : 'springController',
				flex : 2,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true
				}
			}, {
				sortable: false,
				text : 'icon16(图标)',
				dataIndex : 'icon16',
				flex : 1,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true
				}
			}, {
				sortable: false,
				text : 'icon24(图标)',
				dataIndex : 'icon24',
				flex : 1,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true
				}
			}, {
				sortable: false,
				text : 'icon32(图标)',
				dataIndex : 'icon32',
				flex : 1,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true
				}
			}, {
				sortable: false,
				text : 'icon48(图标)',
				dataIndex : 'icon48',
				flex : 1,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true
				}
			} ]
		});

		me.callParent(arguments);

		me.on('beforeedit', me.handleBeforeEdit, me);
	},

	getSelecedRecordId : function() {
		var record = this.getSelectionModel().getSelection()[0];
		return record ? record.getId() : '';
	},

	handleBeforeEdit : function(editingPlugin, e) {
		if(e.record.get('id') == 'root') {
			Ext.popup.Msg('提示信息', '系统菜单跟节点不允许编辑');
			return false;
		}
		return true;
	},
	
    refreshView: function() {
    	this.getStore().reload();
    }
});