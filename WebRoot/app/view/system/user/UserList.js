Ext.define('MyApp.view.system.user.UserList', {
    extend: 'MyApp.base.BaseGridPanel',
    xtype: 'system_user_userList',
    
    frame: true,
    
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
        	store: Ext.create('MyApp.store.system.UserStore', {
        		autoLoad: true
        	}),
            columns: [
                {
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    dataIndex: 'realName',
                    flex: 1,
                    text: '真实姓名'
                },
                {
                	dataIndex: 'gender',
                    flex: 1,
                    text: '性别'
                },
                {
                    dataIndex: 'username',
                    flex: 1,
                    text: '登录用户名'
                },
                {
                	dataIndex: 'phone',
                    flex: 1,
                    text: '联系电话'
                },
                {
                	dataIndex: 'email',
                    flex: 1,
                    text: '邮箱'
                },
                {
                	dataIndex: 'departmentName',
                    flex: 1,
                    text: '所属机构'
                },
                {
                    dataIndex: 'state',
                    flex: 1,
                    text: '状态',
                    renderer: function(value) {
                    	if(value == 'lock') {
                    		return '锁定';
                    	} else {
                    		return '正常';
                    	}
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'createDate',
                    flex: 1,
                    text: '创建时间'
                }
            ],
            viewConfig: {
            	getRowClass: function(record, rowIndex, rowParams, store) {
            		if(record.get('state') == 'lock') {
            			return 'system-user-userlist-gridlock';
            		}
                }
            }
        });

        me.callParent(arguments);
    }

});