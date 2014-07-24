Ext.define('MyApp.view.system.user.Form', {
	extend : 'Ext.window.Window',
	xtype : "system_user_form",

	title : '',

	width : 500,
	height : 600,
	layout : 'fit',
	resizable: false,
	closeAction : 'hide',
	
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : {
				xtype : 'baseFormPanel',
				bodyPadding : 10,
				baseCls: 'x-plan',
				border : false,
				layout: {
			        align: 'stretch',
			        type: 'vbox'
			    },
				items : [ {
					xtype : 'fieldset',
					defaults : {
						margin : 10
					},
					title : '基础信息',
					items : [ {
						xtype : 'hiddenfield',
						name : 'id'
					},{
						xtype : 'textfield',
						name : 'realName',
						maxLength : 100,
						vtype : 'chinese',
						anchor : '100%',
						allowBlank: false,
						afterLabelTextTpl: requiredTpl,
						fieldLabel : '真实姓名'
					}, {
						xtype : 'textfield',
						name : 'username',
						maxLength : 50,
						vtype : 'alphanum',//只能输入字母数字
						anchor : '100%',
						allowBlank: false,
						afterLabelTextTpl: requiredTpl,
						fieldLabel : '登录用户名'
					}, {
						xtype : 'textfield',
						name : 'email',
						vtype : 'email',
						anchor : '100%',
						fieldLabel : '邮箱(Email)'
					}, {
						xtype : 'textfield',
						name : 'phone',
						vtype:'number',
						maxLength : 20,
						anchor : '100%',
						fieldLabel : '联系电话'
					}, {
						anchor : '100%',
						name : 'departmentID',
						allowBlank: false,
						rootVisible: true,
						afterLabelTextTpl: requiredTpl,
						xtype: 'treepicker',
		                displayField: 'text',
		                store: Ext.create('MyApp.store.system.DepartmentReadStore'),
						fieldLabel : '部门'
					}, {
						xtype : 'radiogroup',
						fieldLabel : '性别',
						items : [ {
							xtype : 'radiofield',
							inputValue: '男',
							name: 'gender',
							checked: true,
							boxLabel : '男'
						}, {
							xtype : 'radiofield',
							inputValue: '女',
							name: 'gender',
							boxLabel : '女'
						} ]
					} ]
				}, {
					xtype : 'fieldset',
					title : '绑定角色',
					flex : 1,
					defaults : {
						margin : 10
					},
					layout: 'anchor',
					items: [{
			            xtype: 'itemselector',
			            name: 'roles',
			            anchor: '100% 100%',
			            store: {
			                fields: ['id', 'roleName'],
			                proxy: {
			                    type: 'ajax',
			                    url: 'SystemUserController.do?method=selectSystemRole',
			                    reader: {
			                        type: 'json',
			                        root: 'data'
			                    }
			                },
			                autoLoad: true
			            },
			            displayField: 'roleName',
			            valueField: 'id',
			            allowBlank: false,
			            msgTarget: 'side',
			            fromTitle: '系统全部角色',
			            toTitle: '当前用户角色'				
					}]
				} ],
				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'bottom',
					ui:'footer',
					defaults: {
                        scale: 'medium'
                    },
					items : [ {
						xtype: 'tbfill'
					}, {
						xtype : 'button',
						minWidth: 80,
						iconCls: 'action_save_24',
						text : '保存数据',
						action: 'submit'
					},
					{
						xtype : 'button',
						minWidth: 80,
						iconCls: 'action_delete_24',
						text : '关闭窗口',
						action: 'hide'
					},{
						xtype: 'tbfill'
					} ]
				} ]
			}
		});
		me.callParent(arguments);
	}

});