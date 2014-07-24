var expires = new Date(new Date().getTime()+(1000*60*60*24*30)); //30 days

Ext.define('MyApp.view.Login', {
	extend : 'Ext.window.Window',
	height : 350,
	width : 490,
	closable: false,
	resizable: false,
	draggable: false,
	
	title : '系统登录',
	
	layout : {
		align : 'stretch',
		type : 'vbox'
	},

	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
		items : [{
			xtype : 'container',
			cls : 'login-logo',
			height : 130
		}, {
			xtype : 'form',
			flex : 1,
			border : false,
			bodyPadding : 15,
			waitMsgTarget: true,
			layout : {
				type : 'vbox',
				align : 'center'
			},
			defaults : {
				labelWidth : 70,
				labelAlign : 'right',
				width : 260,
				margin : '5'
			},
			items : [{
				xtype : 'textfield',
				anchor : '100%',
				name: 'username',
				allowBlank: false,
		    	msgTarget: 'side',
				fieldLabel : '账号'
			}, {
				xtype : 'textfield',
				anchor : '100%',
				name: 'password',
				allowBlank: false,
				inputType: 'password',
		    	msgTarget: 'side',
				fieldLabel : '密码'
			}, {
				xtype : 'checkboxgroup',
				items : [{
					xtype : 'checkboxfield',
					itemId: 'rememberUserName',
					margin : '0 0 0 50',
					boxLabel : '记住账号',
					handler: me.rememberUserName,
					scope: me
				}, {
					xtype : 'checkboxfield',
					itemId: 'rememberPassword',
					margin : '0 0 0 20',
					boxLabel : '记住密码',
					handler: me.rememberPassword,
					scope: me
				}]
			}],
			buttons : [{
					xtype : 'tbfill'
				}, {
					text : '登&nbsp;&nbsp;&nbsp;&nbsp;录',
					width : 200,
					handler : me.doLogin,
					scope: me,
					scale : 'medium'
				}, {
					xtype : 'tbfill'
				}]
			}]
		});
		me.callParent(arguments);
		me.on("afterrender", me.afterrenderHandler, me);
	},
	
	//组件渲染完毕后事件
	afterrenderHandler: function() {
		
		var me = this;
		//设置账号
		if(Ext.util.Cookies.get("rememberUserName")) {
			me.down("#rememberUserName").setValue(true);
			me.down("textfield[name=username]").setValue(Ext.util.Cookies.get("username"));
		}
		//设置密码
		if(Ext.util.Cookies.get("rememberPassword")) {
			me.down("#rememberPassword").setValue(true);
			me.down("textfield[name=password]").setValue(Ext.util.Cookies.get("password"));
		}
		//键盘事件
		me.initKeyboardEvents();
	},
	
	//定义键盘事件
	initKeyboardEvents: function() {
		var me = this;
		var map = new Ext.util.KeyMap({
		    target: me.el,
		    key: Ext.EventObject.ENTER,
		    fn: function() {
		    	this.doLogin();
		    },
		    scope: me
		});
	},
	
	//记住账号
	rememberUserName: function(ck, newValue, oldValue, eOpts) {
		if(newValue) {
			Ext.util.Cookies.set("rememberUserName", newValue, expires);
		} else {
			Ext.util.Cookies.clear("rememberUserName");
			Ext.util.Cookies.clear("username");
		}
	},
	
	//记住密码
	rememberPassword: function(ck, newValue, oldValue, eOpts) {
		if(newValue) {
			Ext.util.Cookies.set("rememberPassword", newValue, expires);
		} else {
			Ext.util.Cookies.clear("rememberPassword");
			Ext.util.Cookies.clear("password");
		}
	},
	
	//设置Cookie 保存账号密码
	setInCookie: function(data) {
		if(Ext.util.Cookies.get("rememberUserName")) {
			Ext.util.Cookies.set("username", data.username, expires);
		}
		if(Ext.util.Cookies.get("rememberPassword")) {
			Ext.util.Cookies.set("password", data.password, expires);
		}
	},
	
	//登录
	doLogin: function() {
		var me = this;
		var bf = me.down("form").getForm();
		if(bf.isValid()) {
			bf.submit({
				url: 'SystemLoginController.do?method=doLogin',
				waitMsg: '身份验证中...',
				success: function(form, action) {
					me.setInCookie(bf.getValues());
					location.href = 'app.jsp';
				},
				failure: function(form, action) {
				    switch (action.failureType) {
					case Ext.form.action.Action.CONNECT_FAILURE:
					    Ext.Msg.alert('登录失败', '连接超时 请检查网络是否连通');
					    break;
					case Ext.form.action.Action.SERVER_INVALID:
					   	Ext.Msg.alert('登录失败', action.result.message);
				   	}
				}			
			});
		}
	}
});