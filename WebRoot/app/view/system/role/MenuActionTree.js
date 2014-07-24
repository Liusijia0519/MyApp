Ext.define('MyApp.view.system.role.MenuActionTree', {
	extend : 'Ext.tree.Panel',
	xtype : 'system_role_menuActionTree',
	
	frame : true,
	columnLines : true,
	title: '权限设置',

	initComponent : function() {
		var me = this;

		me.plugins = [ me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing') ];

		Ext.applyIf(me, {
			store : 'system.RoleMenuActionStore',
			columns : [ {
				xtype : 'treecolumn',
				sortable: false,
				text : '菜单->操作名称',
				dataIndex : 'text',
				flex : 1
			}, {
				sortable: false,
				text : 'Method(方法名称)',
				dataIndex : 'methodName',
				flex : 1
			}, {
				sortable: false,
				text : 'SpringController(控制器)',
				dataIndex : 'springController',
				flex : 1
			} ]
		});

		me.callParent(arguments);
	},

	getSelecedRecordId : function() {
		var record = this.getSelectionModel().getSelection()[0];
		return record ? record.getId() : '';
	},
	
    refreshView: function() {
    	this.getStore().reload();
    }
});