Ext.define('MyApp.view.UpdatePasswordWindow', {
    extend: 'Ext.window.Window',
    xtype: 'updatePasswordWindow',
    
    height: 230,
    width: 385,
    layout: {
        type: 'fit'
    },
    resizable: false,
    iconCls: 'action_key_16',
    closeAction: 'hide',
    title: '修改密码',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'baseFormPanel',
                    baseCls: 'x-plan',
                    border: false,
                    defaults: {
                        margin: 10,
                        allowBlank: false,
                        labelWidth: 90
                    },
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'username',
                            fieldLabel: '登录用户名'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'password',
                            inputType: 'password',
                            fieldLabel: '原始密码'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'newPassword',
                            inputType: 'password',
                            minLength: 6,
                            itemId: 'pass',
                            fieldLabel: '新密码'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            vtype: 'password',
                            minLength: 6,
                            inputType: 'password',
                            initialPassField: 'pass',
                            fieldLabel: '新密码确认'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui:'footer',
                            defaults: {
                                scale: 'medium'
                            },
                            items: [
                                {
                                	xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    text: '保存',
                                    action: 'save',
                                    iconCls: 'action_save_24'
                                },
                                {
                                    xtype: 'button',
                                    text: '取消',
                                    action: 'cancel',
                                    iconCls: 'action_delete_24'
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