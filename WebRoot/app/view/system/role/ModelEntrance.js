Ext.define('MyApp.view.system.role.ModelEntrance', {
    extend: 'Ext.container.Container',
    xtype: 'system_role_modelEntrance',
    
    height: 502,
    width: 717,
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    margins: '0 0 5 0',
                    region: 'north',
                    frame: true,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            ui:'footer',
                            defaults: {
                                scale: 'medium',
                                xtype: 'button',
                                iconAlign: 'top'
                            },
                            items: [
                                {
                                	xtype: 'tbfill'
                                },
                                {
                                    text: '新增角色',
                                    iconCls: 'action_add_24',
                                    action: 'add'
                                },
                                {
                                    text: '编辑角色',
                                    iconCls: 'action_eidtfile_24',
                                    action: 'edit'
                                },
                                {
                                	text: '删除角色',
                                	iconCls: 'action_delete_24',
                                	action: 'delete'
                                },
                                {
                                	text: '保存角色',
                                	iconCls: 'action_save_24',
                                    action: 'save'
                                },
                                {
                                    text: '保存权限',
                                    iconCls: 'action_save_24',
                                    action: 'saveRights'
                                },
                                {
                                	xtype: 'tbfill'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'system_role_roleGrid',
                    margins: '0 5 0 0',
                    region: 'west',
                    width: 600
                },
                {
                    xtype: 'system_role_menuActionTree',
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }

});