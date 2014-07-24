Ext.define('MyApp.view.system.user.ModelEntrance', {
	extend: 'Ext.container.Container',
	xtype : 'system_user_modelEntrance',

	border : false,

	layout : {
		type : 'border'
	},

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'system_user_departmentTree',
				region : 'west',
				split : true,
				frame : true,
				width : 200,
				collapsible : true,
				title : '组织机构'
			}, {
				xtype : 'container',
				region : 'center',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'baseFormPanel',
					margins : '0 0 5 0',
					frame : true,
					defaults : {
						columnWidth : 0.25,
						margin : 5,
						labelWidth : 70
					},
					layout : {
						type : 'column'
					},
					bodyPadding : 10,
					items : [ {
						xtype : 'textfield',
						anchor : '100%',
						maxLength : 50,
						vtype : 'noPunctuation',
						name: 'realName',
						emptyText: '汉字或拼音首字母 例如:李强 或 lq',
						fieldLabel : '真实姓名'
					}, {
						xtype : 'textfield',
						name: 'username',
						maxLength : 50,
						vtype : 'alphanum',//只能输入字母数字
						anchor : '100%',
						fieldLabel : '登录用户名'
					}, {
						xtype : 'textfield',
						name: 'phone',
						vtype:'number',
						maxLength : 20,
						anchor : '100%',
						fieldLabel : '联系电话'
					}, {
						xtype : 'combobox',
						anchor : '100%',
						name: 'state',
						fieldLabel : '状态',
					    store: {
					    	fields: ['value', 'text'],
					    	data: [
					    		{"value":"normal", "text":"正常"},
					    		{"value":"lock", "text":"锁定"}
					    	]
					    },
					    queryMode: 'local',
					    displayField: 'text',
					    valueField: 'value'
					} ],
					dockedItems : [ {
						xtype : 'toolbar',
						dock : 'top',
						ui:'footer',
                        defaults: {
                            scale: 'medium',
                            iconAlign: 'top'
                        },
						items : [ {
                        	xtype: 'tbfill'
                        }, {
							text : '新增用户',
							iconCls : 'action_addUser_24',
							action : 'newRecord'
						}, {
							text : '编辑信息',
							iconCls : 'action_eidtfile_24',
							action : 'editRecord'
						}, {
							text : '重置密码',
							iconCls : 'action_keyreset_24',
							action : 'resetPassword'
						}, {
							text : '锁定用户',
							iconCls : 'action_violetlock_24',
							action: 'lock'
						}, {
							text : '解除锁定',
							iconCls : 'action_violetunlock_24',
							action: 'unlock'
						}, {
							text : '条件查询',
							iconCls : 'action_search_24',
							action: 'search'
						}, {
                        	xtype: 'tbfill'
                        }]
					} ]
				}, {
					xtype : 'system_user_userList',
					flex : 1
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});