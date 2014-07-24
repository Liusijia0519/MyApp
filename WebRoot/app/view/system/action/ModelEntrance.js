Ext.define('MyApp.view.system.action.ModelEntrance', {
    extend: 'Ext.container.Container',
    xtype: 'system_action_modelEntrance',

    height: 391,
    width: 578,
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'system_action_actionTreeGrid',
                    region: 'center'
                },
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
                                iconAlign: 'top',
                                xtype: 'button'
                            },
                            items: [
                                {
                                	xtype: 'tbfill'
                                },
                                {
                                    text: '保存操作',
                                    iconCls: 'action_save_24',
                                    action: 'save'
                                },
                                {
                                    text: '刷新数据',
                                    iconCls: 'action_refresh_24',
                                    action: 'refresh'
                                },
                                {
                                	xtype: 'tbfill'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});