Ext.define('MyApp.view.business.home.NotificationDetail', {
    extend: 'Ext.window.Window',
 	xtype: 'business_home_notificationDetail',
    height: 575,
    width: 900,
    layout: {
        type: 'fit'
    },
    title: '通知公告',
    
    initComponent: function() {
        var me = this;
 
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'baseFormPanel',
                    border: false,
                    autoScroll: true,
                    defaults: {
                        columnWidth: .5,
                        allowBlank: false,
                        margin: 10
                    },
                    layout: {
                        type: 'column'
                    },
                    bodyPadding: 10,
                    title: '',
                    items: [
	                    {
	                    	xtype: 'hidden',
	                    	name: 'id'
	                    },
	                    {
	                    	xtype: 'hidden',
	                    	itemId: 'fabufanweiid',
	                    	name: 'fabufanweiid'
	                    },
                        {
                            xtype: 'yesNoCombo',
                            yesText : '紧急通知',
                            name: 'xinxileixing',
							noText : '系统提示',
                            fieldLabel: '类别'
                        },
                        {
                            xtype: 'textfield',
                            name: 'faburiqi',
                            fieldLabel: '发布日期'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            name: 'shengxiaoriqi',
                            fieldLabel: '生效日期'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            name: 'shixiaoriqi',
                            fieldLabel: '失效日期'
                        },
                        {
                            xtype: 'textfield',
                            name: 'lianxiren',
                            fieldLabel: '联系人'
                        },
                        {
                            xtype: 'textfield',
                            name: 'lianxidianhua',
                            fieldLabel: '联系电话'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 1,
                            name: 'biaoti',
                            fieldLabel: '标题'
                        },
                        {
                            xtype: 'fieldcontainer',
                            columnWidth: 1,
                            layout: {
                                type: 'column'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    height: 150,
                                    columnWidth: 1,
                                    name: 'fabufanwei',
                                    readOnly: true,
                                    itemId: 'fabufanwei',
                                    fieldLabel: '发布范围'
                                }
                            ]
                        },
                        {
                            xtype: 'htmleditor',
                            columnWidth: 1,
                            name: 'fasongneirong',
                            height: 300,
                            allowBlank: false,
                            fieldLabel: '内容'
                        },
                        {
                        	xtype: 'fieldcontainer',
                            columnWidth: 1,
                            fieldLabel: '附件',
                            itemId: 'fieldcontainer',
                            hidden: false,
                            items: {
                            	xtype: 'business_notification_fileDataview',
                            	canDelete: false
                            }
                        }
                    ]
                }
            ],
			dockedItems : [{
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				defaults : {
					scale : 'medium',
					xtype : 'button',
					margin : '0 3 0 3'
				},
				items : [{
						xtype : 'tbfill'
					}, {
						text : '我已阅毕',
						action : 'yuebi',
						iconCls : 'action_confirm_24'
					}, {
						xtype : 'tbfill'
					}]
			}]
        });
 
        me.callParent(arguments);
    }
 
});