Ext.define('MyApp.view.system.role.RoleGrid', {
    extend: 'MyApp.base.BaseGridPanel',
    xtype: 'system_role_roleGrid',
    
    frame: true,
    pagging: false,
    title: '系统角色',
    
    initComponent: function() {
        var me = this;
        me.plugins = [ me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing') ];
        Ext.applyIf(me, {
        	store: Ext.create('MyApp.store.system.RoleStore', {
        		autoLoad: true
        	}),
        	selModel: Ext.create('Ext.selection.CheckboxModel', {
        		mode: 'SINGLE'
        	}),
            columns: [
                {
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    dataIndex: 'roleName',
                    flex: 1,
                    text: '角色名称',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        selectOnFocus : true
                    }
                },
                {
                	dataIndex: 'explain',
                    flex: 2,
                    text: '描述',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                	menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    text: '加载菜单权限',
                    align: 'center',
                    width: 100,
                    items: [{
                        iconCls: 'action-cog-16',
                        tooltip: '点击加载菜单与权限',
                        handler: me.handlerActioncolumnClick,
                        scope: me
                    }]
                }
            ]
        });
        
        me.callParent(arguments);
        me.addEvents('actioncolumnclick');
    },
    
    handlerActioncolumnClick: function(grid, rowIndex, colIndex) {
    	this.fireEvent('actioncolumnclick', grid, rowIndex, colIndex);
    }

});