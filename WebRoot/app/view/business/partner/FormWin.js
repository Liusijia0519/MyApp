
Ext.define('MyApp.view.business.partner.FormWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_partner_FormWin',
	height : 540,
	width : 520,
	layout : {
		type : 'fit'
	},
	title : '合作伙伴信息',

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'baseFormPanel',
				border : false,
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				autoScroll : true,
				bodyPadding : 10,
				title : '',
				items : [{
					xtype : 'fieldset',
					defaults : {
						columnWidth : 1,
						margin : 5,
						xtype : 'textfield',
						allowBlank : false,
						afterLabelTextTpl : requiredTpl
					},
					layout : {
						type : 'column'
					},
					bodyPadding : 5,
					title : '登陆信息(默认密码:123456)',
					items : [{
								fieldLabel : '登录名',
								maxLength : 50,
								vtype : 'alphanum',//只能输入字母数字
								name : 'username',
								allowBlank : false,
								afterLabelTextTpl : requiredTpl
							}, {
								name : 'departmentID',
								allowBlank : false,
								rootVisible : true,
								afterLabelTextTpl : requiredTpl,
								xtype : 'treepicker',
								displayField : 'text',
								store : Ext
										.create('MyApp.store.system.DepartmentReadStore'),
								fieldLabel : '部门'
							}, {
								xtype : 'itemselector',
								name : 'roles',
								anchor : '100% 100%',
								store : {
									fields : ['id', 'roleName'],
									proxy : {
										type : 'ajax',
										url : 'SystemUserController.do?method=selectSystemRole',
										reader : {
											type : 'json',
											root : 'data'
										}
									},
									autoLoad : true
								},
								displayField : 'roleName',
								valueField : 'id',
								allowBlank : false,
								msgTarget : 'side',
								fromTitle : '系统全部角色',
								toTitle : '当前用户角色'
							}]
				}, {
					xtype : 'fieldset',
					defaults : {
						columnWidth : 1,
						margin : 5,
						xtype : 'textfield',
						allowBlank : false,
						afterLabelTextTpl : requiredTpl
					},
					layout : {
						type : 'column'
					},
					bodyPadding : 5,
					title : '合作伙伴基本信息',
					items : [{
								xtype : 'hidden',
								name : 'id'
							}, {
								xtype : 'hidden',
								name : 'userid'
							}, {
								fieldLabel : '供应商编号',
								maxLength : 50,
								vtype : 'alphanum',//只能字母数字
								name : 'pcode'
							}, {
								fieldLabel : '供应商名称',
								maxLength : 100,
    							vtype : 'chinese',
								name : 'name'
							}, {
								fieldLabel : '开发者或渠道ID',
								maxLength : 50,
								vtype : 'alphanum',//只能字母数字
								name : 'channelid'
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '是否渠道',
								defaultType : 'radiofield',
								defaults : {
									flex : 1
								},
								layout : 'hbox',
								items : [{
											boxLabel : '是',
											checked : true,
											name : 'ischannel',
											inputValue : 1
										}, {
											boxLabel : '否',
											name : 'ischannel',
											inputValue : 0
										}]
							}, {
								xtype : 'numberfield',
								name : 'payratio',
								fieldLabel : '结算比例',
								maxValue : 1,
								minValue : 0,
								step : 0.1,
								value : 0.7
							}]
				}]
			}],
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
									text : '保存数据',
									action : 'save',
									iconCls : 'action_save_24'
								}, {
									xtype : 'tbfill'
								}]
					}]
		});

		me.callParent(arguments);
	}

});